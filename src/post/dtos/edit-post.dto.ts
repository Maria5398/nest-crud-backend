import { CreatePostDto } from './create-post.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class EditPostDto extends PartialType(
  OmitType(CreatePostDto, []) /* si se quiere omitir algun dato dado por crear se realiza lo mismo  ['slug'] as const,  ['nombre'] as const  */,
) {}