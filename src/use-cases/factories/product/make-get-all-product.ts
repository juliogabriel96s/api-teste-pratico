import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoProductRepository } from "@/repository/dynamodb-repository/product-dynamo-db-repository";
import { GetAllProductUseCase } from '@/use-cases/product/get-all-product';

export function makeGetAllProductUseCase(){
    const productRepository = new DynamoProductRepository(dynamoDbDocumentClient)
    const useCase = new GetAllProductUseCase(productRepository)

    return useCase
}