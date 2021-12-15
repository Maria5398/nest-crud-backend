import {
  Controller,
  Get,
  Post,
  Render,
  Response,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto, UserRegistrationDto } from './dtos';
import { Auth, User } from 'src/common/decorators';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { User as UserEntity } from './entities/user.entity';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService, 
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder) {}

  //Admin
  @Auth()
  @Get(':id') /* mostrar formulario de editar */
  @Render('user/admin/editUser')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOne(id);
  }
  @Auth()
  @Get('newuser') /* formulario de registro para admin */
  @Render('user/admin/crearUser')
  async newUserPage() {
    return;
  }
  //crear user //admin
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER
  })
  @Post('newUser') /*enviar infor para crear para admin*/
  async createnewOne(@Body() dto: CreateUserDto, @Response() res) {
    const data = await this.userService.createOne(dto);
    if (data) return res.redirect('/user/full');
  }
  //editar user // admin
  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER
  })
  @Post(
    'editar/:id',
  ) /** dependiendo de la conddicion de role puede modificar los dastos de cualquier user o solo el propio aun no validado*/
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditUserDto,
    @User() user: UserEntity,
    @Response() res,
  ) {
    let data;

    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      // esto es un admin
      data = await this.userService.editOne(id, dto);
    } else {
      // esto es un author
      const { roles, ...rest } = dto;
      data = await this.userService.editOne(id, rest, user);
    }
    if (data) return res.redirect('/user/full');
  }
  //eliminar user //admin
  @Auth({
    possession: 'own',
    action: 'delete',
    resource: AppResource.USER
  })
  @Post(
    'delete/:id'
  ) /** eliminar una cuenta es solo propio del admin aun no validado */
  async deleteOne(
    @User() user: UserEntity,
    @Param('id') id: number,
    @Response() res,
  ) {
    let data;

    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      // esto es un admin
      data = await this.userService.deleteOne(id);
    } else {
      // esto es un author
      data = await this.userService.deleteOne(id, user);
    }
    if (data) return res.redirect('/user/full');
  }
  //users
  @Get('register') /* formulario de registro */
  @Render('user/register')
  async registerPage() {
    return;
  }
  @Get(
    'full'
  ) /* mostrar todos los usuarios registrados la db para admin no validado */
  @Render('user/admin/listUser')
  async getMany() {
    const data = await this.userService.getMany();
    return {
      data,
    };
  } 
  @Get('ver/:id') /* vista para ver todos lo datos*/
  @Render('user/admin/verUser')
  getVerOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOne(id);
  }
  //crear user
  @Post('register') /*enviar infor para crear, no tiene validacciones */
  async createOne(@Body() dto: UserRegistrationDto, @Response() res) {
    const data = await this.userService.createOne({
      ...dto,
      roles: [AppResource.USER],
    });
    if (data) return res.redirect('/auth/login');
  }
}
