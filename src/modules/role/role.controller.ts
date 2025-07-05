import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './dtos';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get('/')
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.roleService.findById(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.roleService.update(id, dto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
