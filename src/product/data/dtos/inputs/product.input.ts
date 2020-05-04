import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Product } from '../../entities/product.entity';

@InputType()
export class CreateProduct extends PartialType(OmitType(Product, ['id']), InputType) {}
