import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoEstablishmentRepository } from "@/repository/dynamodb-repository/establishment-dynamo-db-repository";
import { GetAllEstablishmentUseCase } from '@/use-cases/establishment/get-all-establishment';

export function makeGetAllEstablishmentUseCase(){
    const estabilishmentRepository = new DynamoEstablishmentRepository(dynamoDbDocumentClient)
    const useCase = new GetAllEstablishmentUseCase(estabilishmentRepository)

    return useCase
}