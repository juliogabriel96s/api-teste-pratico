import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { GetAllUserUseCase } from "./get-all-user"


let inMemoryUserRepository: InMemoryUserRepository
let sut: GetAllUserUseCase

describe('Get all user', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetAllUserUseCase(inMemoryUserRepository)
})

it('Should be able get all the users', async() =>{

   const user =  await inMemoryUserRepository.create({
        id: '1',
        name: 'john doe',
        email: 'johndoe@example.com',
        type: 'customer'
    })

    const result = await sut.execute({
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to get this two users', async() =>{
     const user1 = await inMemoryUserRepository.create({
        id: '1',
        name: 'john doe',
        email: 'johndoe@example.com',
        type: 'customer'
    })

      const user2 = await inMemoryUserRepository.create({
        id: '1',
        name: 'john doe',
        email: 'johndoe@example.com',
        type: 'customer'
    })

    const result = await sut.execute({
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
        expect(result.value.users).toEqual([user1, user2]);
    }
})
})