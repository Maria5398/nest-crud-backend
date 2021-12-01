import { Controller, Request, Get, Post, Render, Response, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto } from './dtos';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}
    
    @Get('/register') /* formulario de registro */
    @Render('user/register')
    async registerPage() {
        return;
    }

    @Get('/newuser') /* formulario de registro para admin no validado */
    @Render('user/admin/crearUser')
    async newUserPage() {
        return;
    }

    @Get('/login') /*formulario de login */
    @Render('user/login')
    async loginPage() {
        return;
    }
    @Post('/login') /*enviar infor para comparar con datos de db aun no validado */
    async login(@Request() req, @Response() res) {
        return res.redirect('/user/full');
    }

    @Get('full') /*mostrar todos los usuarios registrados la db para admin no validado*/
    @Render('user/admin/listUser')
    async getMany(){
       const data = await this.userService.getMany();
       return {
           data
       }
    }
    
    @Get('ver/:id') /* mosstrar formulario de editar */
    @Render('user/admin/verUser')
    getVerOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getOne(id);
    }

    @Get(':id') /* mosstrar formulario de editar */
    @Render('user/admin/editUser')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getOne(id);
    }

    @Post('/register') /*enviar infor para crear, noo tiene validacciones */
    async createOne(
        @Body() dto: CreateUserDto, @Response() res
    ){
        const data = await this.userService.createOne(dto);
        if(data) return res.redirect('/user/login')
    }
    
    @Post('/newUser') /*enviar infor para crear, noo tiene validacciones para admin*/
    async createnewOne(
        @Body() dto: CreateUserDto, @Response() res
    ){
        const data = await this.userService.createOne(dto);
        if(data) return res.redirect('/user/full')
    }

    @Put(':id') /** dependiendo de la conddicion de role puede modificar los dastos de cualquier user o solo el propio aun no validado*/
    async editOne(
        @Param('id') id: number,
        @Body() dto: EditUserDto
    ){
        const data = this.userService.editOne(id, dto);
        return { data }
    
    }

    @Delete(':id') /** eliminar una cuenta es solo propio del admin aun no validado */
    async deleteOne(
        @Param('id') id: number,
    ){
        const data = await this.userService.deleteOne(id)
        return { message: 'usuario eliminado', data }
    }

}
