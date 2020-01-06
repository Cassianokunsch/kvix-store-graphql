import { Field, ObjectType } from 'type-graphql';
import { CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { Image } from './Image';

@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @ManyToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @Field()
  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @Field()
  @Column({ type: 'boolean', default: () => false })
  deleted: boolean;
}
