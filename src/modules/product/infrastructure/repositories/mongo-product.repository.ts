import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "../../application/ports/product.repository.interface";
import { Product } from "../../domain/entities/product";
import { ProductModel, ProductDocument } from "../schemas/product.schemas";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class MongoProductRepository implements ProductRepository {
    constructor(
        @InjectModel(ProductModel.name)
        private readonly productModel: Model<ProductDocument>,
    ){}
    async create(product: Product): Promise<Product> {
        const created = new this.productModel(product);
        await created.save();
        return product;
    }
    findProductByCustomerId(clientId: string): Promise<Product[]> {
        return this.productModel.find({ clientId }).exec();
    }
    async updateProductByCustomerId(clientId: string, partial: Partial<Product>): Promise<Product> {
        const product = await this.productModel.findOneAndReplace(
            { clientId },
            { $set: partial},
            { new: true},
        );
        if(!product){
            throw new NotFoundException(`aucune donner trouver pour: ${clientId}`);
        }
        return product;
    }
    
}