import { DynamoUserRepository } from "@/repository/dynamodb-repository/user-dynamo-db-repository";
import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoEstablishmentRepository } from "@/repository/dynamodb-repository/establishment-dynamo-db-repository";
import { CreateEstablishmentUseCase } from "@/use-cases/establishment/create-establishment";

export function makeCreateEstablishmentUseCase(){
    const userRepository = new DynamoUserRepository(dynamoDbDocumentClient)
    const estabilishmentRepository = new DynamoEstablishmentRepository(dynamoDbDocumentClient)
    const useCase = new CreateEstablishmentUseCase(
        userRepository,
        estabilishmentRepository
    )

    return useCase
}