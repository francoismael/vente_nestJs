import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateProductUsecase } from './application/usecases/create-product.usecase';
import { ProductController } from './interfaces/product.controller';
import { PRODUCT_REPOSITORY } from './application/ports/product.repository.token';
import { MongoProductRepository } from './infrastructure/repositories/mongo-product.repository';
import { FindProductByCustomerId } from './application/usecases/find-product-by-customer-id.usecase';
import { UpdateProductByCustomerId } from './application/usecases/updateProductByCustomerId.usecase';

import { ProductModel, ProductSchema } from './infrastructure/schemas/product.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    CreateProductUsecase,
    FindProductByCustomerId,
    UpdateProductByCustomerId,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: MongoProductRepository,
    },
  ],
})
export class ProductModule {}
