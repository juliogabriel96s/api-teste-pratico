import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { User } from "@/db/entity/user";
import { UserRepository } from "@/repository/user-repository";

interface EditUsersUseCaseRequest{
 userId: string
 name: string
 email: string
}

type EditUsersUseCaseResponse = Either<
ResourceNotFoundError,
{
    user: User
}
>

export class EditUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({
       userId,
       name,
       email
    }:EditUsersUseCaseRequest):Promise<EditUsersUseCaseResponse>{
         const user = await this.userRepository.findById(userId)

        if(!user){
            return left(new ResourceNotFoundError())
        }

         user.name = name
         user.email = email

         await this.userRepository.save(user)

        return right({
            user
        })
    }
}