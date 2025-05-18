import { DynamoUserRepository } from "@/repository/dynamodb-repository/user-dynamo-db-repository";
import {dynamoDbDocumentClient} from '@/db/db'
import { GetAllUserUseCase } from "@/use-cases/user/get-all-user";

export function makeGetAllUserUseCase(){
    const userRepository = new DynamoUserRepository(dynamoDbDocumentClient)
    const useCase = new GetAllUserUseCase(userRepository)

    return useCase
}