import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '../ports/product.repository.token';
import { ProductRepository } from '../ports/product.repository.interface';
import { Product } from '../../domain/entities/product';

@Injectable()
export class UpdateProductByCustomerId {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(clientId: string, partial: Partial<Product>): Promise<Product> {
    return this.productRepository.updateProductByCustomerId(clientId, partial);
  }
}
