import { DynamoUserRepository } from "@/repository/dynamodb-repository/user-dynamo-db-repository";
import {dynamoDbDocumentClient} from '@/db/db'
import { GetUserUseCase } from "@/use-cases/user/get-user";

export function makeGetUserUseCase(){
    const userRepository = new DynamoUserRepository(dynamoDbDocumentClient)
    const useCase = new GetUserUseCase(userRepository)

    return useCase
}