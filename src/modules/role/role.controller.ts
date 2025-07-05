import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { CreateRoleDto, UpdateRoleDto, QueryRoleDto } from './dtos';
import { JwtAuthGuard } from '@modules/auth/guards';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionEnum.CREATE_ROLE)
  @Post('/create')
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get('/')
  findAll(@Query() query: QueryRoleDto) {
    return this.roleService.findAll(query);
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
