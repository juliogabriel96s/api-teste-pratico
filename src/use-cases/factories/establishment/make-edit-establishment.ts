import {dynamoDbDocumentClient} from '@/db/db'
import { DynamoEstablishmentRepository } from "@/repository/dynamodb-repository/establishment-dynamo-db-repository";
import { EditEstablishmentUseCase } from '@/use-cases/establishment/edit-establishment';

export function makeEditEstablishmentUseCase(){
    const estabilishmentRepository = new DynamoEstablishmentRepository(dynamoDbDocumentClient)
    const useCase = new EditEstablishmentUseCase(estabilishmentRepository)

    return useCase
}