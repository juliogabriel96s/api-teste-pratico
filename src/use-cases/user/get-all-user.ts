import { Either, left, right } from "@/core/either";
import { User } from "@/db/entity/user";
import { UserRepository } from "@/repository/user-repository";

interface GetAllUsersUseCaseRequest{}

type GetAllUsersUseCaseResponse = Either<
{},
{
    users: User[]
}
>

export class GetAllUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({}:GetAllUsersUseCaseRequest):Promise<GetAllUsersUseCaseResponse>{
         const users = await this.userRepository.findAll()

        return right({
            users
        })
    }
}