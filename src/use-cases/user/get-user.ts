import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { User } from "@/db/entity/user";
import { UserRepository } from "@/repository/user-repository";

interface GetUsersUseCaseRequest{
 userId: string
}

type GetUsersUseCaseResponse = Either<
ResourceNotFoundError,
{
    user: User
}
>

export class GetUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({
       userId
    }:GetUsersUseCaseRequest):Promise<GetUsersUseCaseResponse>{
         const user = await this.userRepository.findById(userId)

        if(!user){
            return left(new ResourceNotFoundError())
        }

        return right({
            user
        })
    }
}