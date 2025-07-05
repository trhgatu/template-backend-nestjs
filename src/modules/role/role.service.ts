import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './role.schema';
import { Model } from 'mongoose';
import { CreateRoleDto, UpdateRoleDto } from './dtos';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(dto: CreateRoleDto) {
    return await this.roleModel.create(dto);
  }

  async findAll() {
    return await this.roleModel.find();
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
