import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  Render,
  Response,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { User, Auth } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities/user.entity';
import { CreatePostDto, EditPostDto } from './dtos';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @InjectRolesBuilder()
    private readonly roleBuilder: RolesBuilder,
  ) {}
  //users
  @Get('full') /* mostrar todos los post subidos a  la db*/
  @Render('post/admin/listPost')
  async getMany() {
    const data = await this.postService.getMany();
    return {
      data,
    };
  }
  @Get('ver/:id') /* vista para ver todos lo datos*/
  @Render('post/admin/verPost')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getById(id);
  }
  //Admin
  @Auth()
  @Get(':id') /* mostrar formulario de editar */
  @Render('post/admin/editPost')
  getEditOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getById(id);
  }
  @Auth()
  @Get('newPost') /* mostrar formulario de crear */
  @Render('post/crearPost')
  async postPage() {
    return;
  }
  @Auth({
    resource: AppResource.POST,
    action: 'create',
    possession: 'own',
  })
  @Post() /* enviar datos de post a la db */
  async createOne(
    @Body() dto: CreatePostDto,
    @User() author: UserEntity,
    @Response() res,
  ) {
    const post = await this.postService.createOne(dto, author);
    if (post) return res.redirect('/post/full');
  }
  @Auth({
    resource: AppResource.POST,
    action: 'update',
    possession: 'own',
  })
  @Post('editar/:id') /*enviar datos modificados del post deseado */
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditPostDto,
    @User() author: UserEntity,
    @Response() res,
  ) {
    let data;

    if (
      this.roleBuilder.can(author.roles).updateAny(AppResource.POST).granted
    ) {
      // Puede editar cualquier POST...
      data = await this.postService.editOne(id, dto);
    } else {
      // Puede editar solo los propios...
      data = await this.postService.editOne(id, dto, author);
    }
    if (data) return res.redirect('/post/full');
  }

  @Auth({
    resource: AppResource.POST,
    action: 'delete',
    possession: 'own',
  })
  @Post('delete/:id') /*eliminar post especificado */
  async deleteOne(
    @Param('id') id: number,
    @User() author: UserEntity,
    @Response() res,
  ) {
    let data;

    if (
      this.roleBuilder.can(author.roles).deleteAny(AppResource.POST).granted
    ) {
      data = await this.postService.deleteOne(id);
    } else {
      data = await this.postService.deleteOne(id, author);
    }
    if (data) return res.redirect('/post/full');
  }
}
