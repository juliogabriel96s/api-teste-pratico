import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { UserRepository } from "@/repository/user-repository";

interface DeleteUsersUseCaseRequest{
 userId: string
}

type DeleteUsersUseCaseResponse = Either<
ResourceNotFoundError,
{}
>

export class DeleteUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({
       userId,
    }:DeleteUsersUseCaseRequest):Promise<DeleteUsersUseCaseResponse>{
         const user = await this.userRepository.findById(userId)

        if(!user){
            return left(new ResourceNotFoundError())
        }

         await this.userRepository.delete(user.id)

        return right({})
    }
}