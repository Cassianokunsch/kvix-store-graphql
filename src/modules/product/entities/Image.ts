import { Field, ObjectType } from 'type-graphql';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Image {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
