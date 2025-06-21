import { Product } from '../../domain/entities/product';

export interface ProductRepository {
  create(data: Product): Promise<Product>;
  findProductByCustomerId(clientId: string): Promise<Product[]>;
  updateProductByCustomerId(
    clientId: string,
    partial: Partial<Product>,
  ): Promise<Product>;
}
