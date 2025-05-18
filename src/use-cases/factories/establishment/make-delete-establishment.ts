import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoEstablishmentRepository } from "@/repository/dynamodb-repository/establishment-dynamo-db-repository";
import { DeleteEstablishmentUseCase } from "@/use-cases/establishment/delete-establishment";

export function makeDeleteEstablishmentUseCase(){
    const estabilishmentRepository = new DynamoEstablishmentRepository(dynamoDbDocumentClient)
    const useCase = new DeleteEstablishmentUseCase(estabilishmentRepository)

    return useCase
}