import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoProductRepository } from "@/repository/dynamodb-repository/product-dynamo-db-repository";
import { DeleteProductUseCase } from '@/use-cases/product/delete-product';

export function makeDeleteProductUseCase(){
    const productRepository = new DynamoProductRepository(dynamoDbDocumentClient)
    const useCase = new DeleteProductUseCase(productRepository)

    return useCase
}