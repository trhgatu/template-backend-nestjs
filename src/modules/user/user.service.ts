import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from './dtos';
import { paginate } from '@shared/utils';
import { CacheService } from '@shared/services/cache.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly cacheService: CacheService,
  ) {}

  async create(dto: CreateUserDto) {
    return await this.userModel.create(dto);
  }

  async findAll(query: QueryUserDto) {
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const skip = (page - 1) * limit;

    const search = query.keyword
      ? { name: { $regex: query.keyword, $options: 'i' } }
      : {};

    const cacheKey = `users:all:${query.keyword || 'all'}:p${page}:l${limit}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const result = await paginate(
      this.userModel
        .find(search)
        .skip(skip)
        .limit(limit)
        .populate('roleId')
        .select('-password -refreshToken'),
      this.userModel.countDocuments(search),
      page,
      limit,
    );

    await this.cacheService.set(cacheKey, result, 60);
    return result;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).populate('roleId');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const updated = await this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('User not found');

    await this.cacheService.deleteByPattern('users:all:*');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.userModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('User not found');

    await this.cacheService.deleteByPattern('users:all:*');
    return deleted;
  }
}
