import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoEstablishmentRepository } from "@/repository/dynamodb-repository/establishment-dynamo-db-repository";
import { GetTypeEstablishmentUseCase } from '@/use-cases/establishment/get-type-establishment';

export function makeGetTypeEstablishmentUseCase(){
    const estabilishmentRepository = new DynamoEstablishmentRepository(dynamoDbDocumentClient)
    const useCase = new GetTypeEstablishmentUseCase(estabilishmentRepository)

    return useCase
}