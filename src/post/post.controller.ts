import {Controller, Get, Param, Post, Put, Delete, Body, ParseIntPipe, Render, Request, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto, EditPostDto } from './dtos';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService){}

    @Get('newPost') /* mosstrar formulario de crear */
    @Render('post/crearPost')
    async postPage(@Request() req, @Response() res) {
      return;
    }
    @Get('full') /* mosstrar todos los post ssubidos a  la db*/
    @Render('post/admin/listPost')
    async getMany(@Request() req,){
        const data = await this.postService.getMany()
        return{ 
            data
        }
    }

    @Get(':id') /* mosstrar formulario de editar */
    @Render('post/admin/editPost')
    getVerOne(@Param('id', ParseIntPipe) id: number) {
        return this.postService.getOne(id);
    }

    @Post() /* enviar datos de post a la db */
    createOne(
        @Body() dto: CreatePostDto,  @Response() res
    ){
        const post = this.postService.createOne(dto);
        if(post) return res.redirect('/post/full')
    }
    @Put(':id') /*enviar datos modificados del post deseado */
    async editOne(
        @Param('id') id: number,
        @Body() dto: EditPostDto,
        @Response() res
    ){
        const data = await this.postService.editOne(id, dto);
        if(data) return res.redirect('/post/full')
    }

    @Delete(':id') /*eliminar post especificado */
    deleteOne(@Param('id') id: number){
        return this.postService.deleteOne(id);
    }
}
