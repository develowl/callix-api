import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> extends PartialType(PageMetaDto) {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly docs: T[];

  constructor(docs: T[]) {
    super();
    this.docs = docs;
  }
}
