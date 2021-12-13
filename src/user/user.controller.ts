import { Controller, Get, Post, Render, Response, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto } from './dtos';
import { Auth } from 'src/common/decorators';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}
    
    @Get('register') /* formulario de registro */
    @Render('user/register')
    async registerPage() {
        return;
    }

    @Get('newuser') /* formulario de registro para admin no validado */
    @Render('user/admin/crearUser')
    async newUserPage() {
        return;
    }
    @Auth()
    @Get('full') /*mostrar todos los usuarios registrados la db para admin no validado*/
    @Render('user/admin/listUser')
    async getMany(){
       const data = await this.userService.getMany();
       return {
           data
       }
    }
    
    @Get('ver/:id') /* vista para ver todos lo datos*/
    @Render('user/admin/verUser')
    getVerOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getOne(id);
    }
    @Auth()
    @Get(':id') /* mosstrar formulario de editar */
    @Render('user/admin/editUser')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getOne(id);
    }

    @Post('register') /*enviar infor para crear, noo tiene validacciones */
    async createOne(
        @Body() dto: CreateUserDto, @Response() res
    ){
        const data = await this.userService.createOne(dto);
        if(data) return res.redirect('/auth/login')
    }
    
    @Post('newUser') /*enviar infor para crear, noo tiene validacciones para admin*/
    async createnewOne(
        @Body() dto: CreateUserDto, @Response() res
    ){
        const data = await this.userService.createOne(dto);
        if(data) return res.redirect('/user/full')
    }
    @Auth()
    @Post('editar/:id') /** dependiendo de la conddicion de role puede modificar los dastos de cualquier user o solo el propio aun no validado*/
    async editOne(
        @Param('id') id: number,
        @Body() dto: EditUserDto,
        @Response() res
    ){
        const data = await this.userService.editOne(id, dto);
        if(data) return res.redirect('/user/full')
    
    }
    @Auth()
    @Post('delete/:id') /** eliminar una cuenta es solo propio del admin aun no validado */
    async deleteOne(
        @Param('id') id: number,@Response() res
    ){
        const data = await this.userService.deleteOne(id)
        if(data) return res.redirect('/user/full')
    }
}
