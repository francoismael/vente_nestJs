import { ProductRepository } from './../ports/product.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '../ports/product.repository.token';
import { Product } from '../../domain/entities/product';

@Injectable()
export class FindProductByCustomerId {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(clientId: string): Promise<Product[]> {
    return this.productRepository.findProductByCustomerId(clientId);
  }
}
