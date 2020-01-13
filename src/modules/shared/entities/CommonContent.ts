import { Field, InterfaceType } from 'type-graphql';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@InterfaceType()
export abstract class CommonContent {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
