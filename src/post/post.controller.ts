import {Controller, Get, Param, Post, Put, Delete, Body, ParseIntPipe, Render, Request, Response } from '@nestjs/common';
import { CreatePostDto, EditPostDto } from './dtos';
import { PostService } from './post.service';


@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService){}

    @Get('prueba')
    @Render('prueba')
    async pruebaPage(@Request() req, @Response() res) {
      return;
    }

    @Get('prueba/full')
    @Render('list')
    async getMany(@Request() req,){
        const data = await this.postService.getMany()
        return{ 
            message: 'Su peticion',
            data
        }
    }

    @Get('prueba/:id')
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
    @Put('prueba/:id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditPostDto
    ){
        return this.postService.editOne(id, dto);
    }

    @Delete('prueba/:id')
    deleteOne(@Param('id') id: number){
        return this.postService.deleteOne(id);
    }
}
