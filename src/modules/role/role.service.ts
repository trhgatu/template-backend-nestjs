import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './role.schema';
import { Model } from 'mongoose';
import { paginate } from '@shared/utils';
import { CreateRoleDto, UpdateRoleDto, QueryRoleDto } from './dtos';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(dto: CreateRoleDto) {
    return await this.roleModel.create(dto);
  }

  async findAll(query: QueryRoleDto) {
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const skip = (page - 1) * limit;

    const search = query.keyword
      ? { name: { $regex: query.keyword, $options: 'i' } }
      : {};

    return paginate(
      this.roleModel.find(search).skip(skip).limit(limit),
      this.roleModel.countDocuments(search),
      page,
      limit,
    );
  }

  async findById(id: string) {
    const role = await this.roleModel.findById(id);
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: string, dto: UpdateRoleDto) {
    const updated = await this.roleModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Role not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.roleModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Role not found');
    return deleted;
  }
}
