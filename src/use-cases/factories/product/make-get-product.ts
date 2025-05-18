import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoProductRepository } from "@/repository/dynamodb-repository/product-dynamo-db-repository";
import { GetProductUseCase } from '@/use-cases/product/get-product';

export function makeGetProductUseCase(){
    const productRepository = new DynamoProductRepository(dynamoDbDocumentClient)
    const useCase = new GetProductUseCase(productRepository)

    return useCase
}