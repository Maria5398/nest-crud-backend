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
    
    @Get(':id') /** mostrar el desseado dependiendo del rol puede ver los datos de cada user o solo el propio */
    async getOne(
        @Param('id') id: number,
    ){
        const data = await this.userService.getOne(id);
        return { data }
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

    @Get(':id') /* mosstrar formulario de editar */
    @Render('user/admin/editUser')
    getVerOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getOne(id);
    }

    @Put(':id') /** dependiendo de la conddicion de role puede modificar los dastos de cualquier user o solo el propio aun no validado*/
    editOne(
        @Param('id') id: number,
        @Body() dto: EditUserDto
    ){
        return this.userService.editOne(id, dto);
    
    }

    @Delete(':id') /** eliminar una cuenta es solo propio del admin aun no validado */
    async deleteOne(
        @Param('id') id: number,
    ){
        const data = await this.userService.deleteOne(id)
        return { message: 'usuario eliminado', data }
    }

}
