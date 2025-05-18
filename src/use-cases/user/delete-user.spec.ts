import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { DeleteUserUseCase } from "./delete-user"


let inMemoryUserRepository: InMemoryUserRepository
let sut: DeleteUserUseCase

describe('Delete user', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(inMemoryUserRepository)
})

it('Should be able delete a user', async() =>{

   const user =  await inMemoryUserRepository.create({
        id: '1',
        name: 'john doe',
        email: 'johndoe@example.com',
        type: 'customer'
    })

    const result = await sut.execute({
       userId: user.id,
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to delete a user with id wrong', async() =>{
     await inMemoryUserRepository.create({
        id: '1',
        name: 'john doe',
        email: 'johndoe@example.com',
        type: 'customer'
    })

    const result = await sut.execute({
        userId: 'id-wrong',
    })

    expect(result.isLeft()).toBe(true)
})
})