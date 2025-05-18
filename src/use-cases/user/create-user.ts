import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { User, UserType } from "@/db/entity/user";
import { UserRepository } from "@/repository/user-repository";
import {v4 as uuidv4} from 'uuid'

interface CreateUsersUseCaseRequest{
    name: string
    email: string
    type: UserType
}

type CreateUsersUseCaseResponse = Either<
NotAllowedError,
{
    user: User
}
>

export class CreateUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({
       name,
       email,
       type
    }:CreateUsersUseCaseRequest):Promise<CreateUsersUseCaseResponse>{
         const userWIthSameEmail = await this.userRepository.findByEmail(email)

        if(userWIthSameEmail){
            return left(new NotAllowedError())
        }

        const user = await this.userRepository.create({
            id:uuidv4(),
            name,
            email,
            type 
        })

        return right({
            user
        })
    }
}