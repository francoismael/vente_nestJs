/* eslint-disable @typescript-eslint/require-await */
import { NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../application/ports/product.repository.interface';
import { Product } from '../../domain/entities/product';

export class InMemoryProductRepository implements ProductRepository {
  private data: Product[] = [];

  // eslint-disable-next-line @typescript-eslint/require-await
  async create(product: Product): Promise<Product> {
    this.data.push(product);
    return product;
  }

  async findProductByCustomerId(clientId: string): Promise<Product[]> {
    console.log(clientId);
    console.log('datta-----------------', this.data);
    return this.data.filter((c) => c.clientId === clientId);
  }

  async updateProductByCustomerId(
    clientId: string,
    partial: Partial<Product>,
  ): Promise<Product> {
    const resultat = this.data.find((pr) => pr.clientId === clientId);
    if (!resultat) {
      throw new NotFoundException(`aucune donner trouver`);
    }

    Object.assign(resultat, partial);
    return resultat;
  }
}
