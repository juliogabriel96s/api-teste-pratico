import { DynamoUserRepository } from "@/repository/dynamodb-repository/user-dynamo-db-repository";
import {dynamoDbDocumentClient} from '@/db/db'
import { CreateUserUseCase } from "@/use-cases/user/create-user";

export function makeCreateUserUseCase(){
    const userRepository = new DynamoUserRepository(dynamoDbDocumentClient)
    const useCase = new CreateUserUseCase(userRepository)

    return useCase
}