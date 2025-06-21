import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProduct } from './dto/create-product.dto';
import { CreateProductUsecase } from '../application/usecases/create-product.usecase';
import { Product } from '../domain/entities/product';
import { v4 as uuidv4 } from 'uuid';
import { FindProductByCustomerId } from '../application/usecases/find-product-by-customer-id.usecase';
import { UpdateProductByCustomerId } from '../application/usecases/updateProductByCustomerId.usecase';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductUsecase: CreateProductUsecase,
    private readonly findProductByCustomerId: FindProductByCustomerId,
    private readonly updateProductByCustomerId: UpdateProductByCustomerId,
  ) {}

  @Post()
  async create(@Body() dto: CreateProduct): Promise<Product> {
    const newProduct = new Product(
      uuidv4(),
      dto.clientId,
      dto.description,
      dto.type,
      dto.prix,
    );
    return await this.createProductUsecase.create(newProduct);
  }

  @Get(':clientId')
  async execute(@Param('clientId') clientId: string): Promise<Product[]> {
    return this.findProductByCustomerId.execute(clientId);
  }

  @Put(':clientId')
  async updateProduct(
    @Param('clientId') clientId: string,
    @Body() partial: Partial<Product>,
  ): Promise<Product> {
    return await this.updateProductByCustomerId.execute(clientId, partial);
  }
}
