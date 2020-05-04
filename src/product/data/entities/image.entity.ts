import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { AbstractEntity } from '../../../common/abstract.entity';

@ObjectType()
@Entity()
export class Image extends AbstractEntity {
  @Field()
  @Column({ type: 'text' })
  filename: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  mimetype: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  encoding: string;

  @Field()
  @Column({ type: 'text' })
  path: string;
}
