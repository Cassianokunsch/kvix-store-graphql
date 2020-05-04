import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { AbstractEntity } from '../../../common/abstract.entity';
import { Image } from './image.entity';

@ObjectType()
@Entity()
export class Category extends AbstractEntity {
  @Field()
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Field(() => Image)
  @ManyToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;
}
