import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Test extends Document {
  // TODO: define schema fields here
}

export const TestSchema = SchemaFactory.createForClass(Test);
