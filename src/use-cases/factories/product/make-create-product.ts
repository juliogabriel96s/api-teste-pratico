import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoEstablishmentRepository } from "@/repository/dynamodb-repository/establishment-dynamo-db-repository";
import { DynamoProductRepository } from "@/repository/dynamodb-repository/product-dynamo-db-repository";
import { CreateProductUseCase } from '@/use-cases/product/create-product';

export function makeCreateProductUseCase(){
    const productRepository = new DynamoProductRepository(dynamoDbDocumentClient)
    const estabilishmentRepository = new DynamoEstablishmentRepository(dynamoDbDocumentClient)
    const useCase = new CreateProductUseCase(
        estabilishmentRepository,
        productRepository
    )

    return useCase
}