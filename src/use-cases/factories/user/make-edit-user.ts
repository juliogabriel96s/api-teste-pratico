import { DynamoUserRepository } from "@/repository/dynamodb-repository/user-dynamo-db-repository";
import {dynamoDbDocumentClient} from '@/db/db'
import { EditUserUseCase } from "@/use-cases/user/edit-user";

export function makeEditUserUseCase(){
    const userRepository = new DynamoUserRepository(dynamoDbDocumentClient)
    const useCase = new EditUserUseCase(userRepository)

    return useCase
}