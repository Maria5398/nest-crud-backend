import {Controller, Get, Param, Post, Put, Delete, Body, ParseIntPipe, Render, Request, Response } from '@nestjs/common';
import { CreatePostDto, EditPostDto } from './dtos';
import { PostService } from './post.service';


@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService){}

    @Get('prueba/newPost')
    @Render('post/crearPost')
    async pruebaPage(@Request() req, @Response() res) {
      return;
    }
    @Get('prueba/full')
    @Render('post/listPost')
    async getMany(@Request() req,){
        const data = await this.postService.getMany()
        return{ 
            message: 'Su peticion',
            data
        }
    }

    @Get('prueba/edit/:id')
    @Render('post/editPost')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.postService.getOne(id);
    }

    @Post('prueba')
    createOne(
        @Body() dto: CreatePostDto,  @Response() res
    ){
        const post = this.postService.createOne(dto);
        if(post) return res.redirect('/post/prueba/full')
    }
    @Put('prueba/edit/:id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditPostDto
    ){
        return this.postService.editOne(id, dto);
    }

    @Delete('prueba/delete/:id')
    deleteOne(@Param('id') id: number){
        return this.postService.deleteOne(id);
    }
}
