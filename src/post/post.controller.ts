import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  Render,
  Request,
  Response,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { CreatePostDto, EditPostDto } from './dtos';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
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
  getVerOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getOne(id);
  }
  //Admin
  @Auth()
  @Get(':id') /* mostrar formulario de editar */
  @Render('post/admin/editPost')
  getEditOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getOne(id);
  }
  @Auth()
  @Get('newPost') /* mostrar formulario de crear */
  @Render('post/crearPost')
  async postPage() {
    return;
  }
  @Auth()
  @Post() /* enviar datos de post a la db */
  createOne(@Body() dto: CreatePostDto, @Request() req, @Response() res) {
    const post = this.postService.createOne(dto);
    if (post) return res.redirect('/post/full');
  }
  @Auth()
  @Post('editar/:id') /*enviar datos modificados del post deseado */
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditPostDto,
    @Response() res,
  ) {
    const data = await this.postService.editOne(id, dto);
    if (data) return res.redirect('/post/full');
  }

  @Auth()
  @Post('delete/:id') /*eliminar post especificado */
  async deleteOne(@Param('id') id: number, @Response() res) {
    const data = await this.postService.deleteOne(id);
    if (data) return res.redirect('/post/full');
  }
}
