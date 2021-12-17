import { PostCategory } from '../enums';
import {
  IsString,
  IsBoolean,
  IsArray,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { EnumToString } from 'src/common/helpers/enumToString';

export class CreatePostDto{
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  excerpt: string;

  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(PostCategory, {
    message: `Invalid option. Valids options are ${EnumToString(PostCategory)}`,
  })
  category: string;

  @IsString({ each: true })
  @IsArray()
  tags: string[];

  @IsBoolean()
  status: boolean;
}