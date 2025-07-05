import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  QueryPermissionDto,
} from './dtos';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('/create')
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionService.create(dto);
  }

  @Get('/')
  findAll(@Query() query: QueryPermissionDto) {
    return this.permissionService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.permissionService.findById(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return this.permissionService.update(id, dto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(id);
  }
}
