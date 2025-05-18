import { DynamoUserRepository } from "@/repository/dynamodb-repository/user-dynamo-db-repository";
import {dynamoDbDocumentClient} from '@/db/db'
import { DeleteUserUseCase } from "@/use-cases/user/delete-user";

export function makeDeleteUserUseCase(){
    const userRepository = new DynamoUserRepository(dynamoDbDocumentClient)
    const useCase = new DeleteUserUseCase(userRepository)

    return useCase
}