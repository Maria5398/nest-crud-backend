import { PostCategory } from '../enums';
import { IsString, IsBoolean, IsArray, IsEnum } from 'class-validator';
import { EnumToString } from 'src/helpers/enumToString';

export class CreatePostDto{

    @IsString()
    title:string;

    @IsString()
    slug:string;

    @IsString()
    excerpt:string;

    @IsString()
    content:string;
 
    @IsEnum(PostCategory, {
        message: `Opcion invalida. Las opciones validas son: ${EnumToString(PostCategory)}`,
      })
      category: PostCategory;

    @IsArray()
    @IsString({ each: true })
    tags:string[];

    @IsBoolean()
    status:boolean = false;
}