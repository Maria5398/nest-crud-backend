import { Controller, Request, Get, Post, Render, Response, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto } from './dtos';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get('full') /* mostrar todos los usuarios registrados la db*/
    @Render('user/listUser')
    async getMany(){
       const data = await this.userService.getMany();
       return {
           data
       }
    }

    @Get(':id') /** mostrar el desseado */
    async getOne(
        @Param('id') id: number,
    ){
        const data = await this.userService.getOne(id);
        return { data }
    }

    @Get('/register') /* formulario de registro */
    @Render('user/register')
    async registerPage() {
        return;
    }

    @Post('/register') /*enviar infor para crear, noo tiene validacciones */
    async createOne(
        @Body() dto: CreateUserDto
    ){
        const data = await this.userService.createOne(dto);
        return { message: 'usuario creado', data }
    }
    
    @Get('/login') /*formulario de login */
    @Render('user/login')
    async loginPage() {
        return;
    }
    @Post('/login') /*enviar infor para comparar con datos de db */
    async login(@Request() req, @Response() res) {
        return res.redirect('/post/full');
    }
   
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditUserDto
    ){

    }

    @Delete(':id')
    deleteOne(){
        
    }

}
