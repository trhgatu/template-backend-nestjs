import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from './dtos';
import { paginate } from '@shared/utils';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto) {
    return await this.userModel.create(dto);
  }

  async findAll(query: QueryUserDto) {
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const skip = (page - 1) * limit;

    return paginate(
      this.userModel
        .find()
        .skip(skip)
        .limit(limit)
        .populate('roleId')
        .select('-password -refreshToken')
        .exec(),
      this.userModel.countDocuments().exec(),
      page,
      limit,
    );
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
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.userModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('User not found');
    return deleted;
  }
}
