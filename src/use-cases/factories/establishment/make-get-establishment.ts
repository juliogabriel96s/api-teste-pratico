import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoEstablishmentRepository } from "@/repository/dynamodb-repository/establishment-dynamo-db-repository";
import { GetEstablishmentUseCase } from '@/use-cases/establishment/get-establishment';

export function makeGetEstablishmentUseCase(){
    const estabilishmentRepository = new DynamoEstablishmentRepository(dynamoDbDocumentClient)
    const useCase = new GetEstablishmentUseCase(estabilishmentRepository)

    return useCase
}