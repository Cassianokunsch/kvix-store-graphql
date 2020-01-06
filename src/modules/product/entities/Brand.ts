import { Field, ObjectType } from 'type-graphql';
import { CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Brand {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  name: string;

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
