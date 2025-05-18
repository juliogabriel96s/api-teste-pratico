import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoProductRepository } from "@/repository/dynamodb-repository/product-dynamo-db-repository";
import { EditProductUseCase } from '@/use-cases/product/edit-product';

export function makeEditProductUseCase(){
    const productRepository = new DynamoProductRepository(dynamoDbDocumentClient)
    const useCase = new EditProductUseCase(productRepository)

    return useCase
}