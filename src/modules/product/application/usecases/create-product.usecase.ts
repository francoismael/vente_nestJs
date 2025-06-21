import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '../ports/product.repository.token';
import { ProductRepository } from '../ports/product.repository.interface';
import { CreateProduct } from '../../interfaces/dto/create-product.dto';
import { Product } from '../../domain/entities/product';
import { v4 } from 'uuid';

@Injectable()
export class CreateProductUsecase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    public readonly repository: ProductRepository,
  ) {}

  async create(dto: CreateProduct): Promise<Product> {
    const newProduct = new Product(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
      v4(),
      dto.clientId,
      dto.description,
      dto.type,
      dto.prix,
    );
    return this.repository.create(newProduct);
  }
}
