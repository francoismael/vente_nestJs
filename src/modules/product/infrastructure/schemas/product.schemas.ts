import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = ProducModel & Document;
@Schema()
export class ProducModel {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  prix: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProducModel);
