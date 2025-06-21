import { Module } from '@nestjs/common';

import { CreateProductUsecase } from './application/usecases/create-product.usecase';
import { ProductController } from './interfaces/product.controller';
import { PRODUCT_REPOSITORY } from './application/ports/product.repository.token';
import { InMemoryProductRepository } from './infrastructure/repositories/in-memory-product.repository';
import { FindProductByCustomerId } from './application/usecases/find-product-by-customer-id.usecase';
import { UpdateProductByCustomerId } from './application/usecases/updateProductByCustomerId.usecase';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUsecase,
    FindProductByCustomerId,
    UpdateProductByCustomerId,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: InMemoryProductRepository,
    },
  ],
})
export class ProductModule {}
