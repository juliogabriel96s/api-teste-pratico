import {User} from '../db/entity/user'
export interface UserRepository{
    create(user: User):Promise<User>
    findByEmail(email: string):Promise<User | null>
    findById(id: string):Promise<User | null>
    save(user: User): Promise<User>
    delete(id: string): Promise<void>
    findAll(): Promise<User[]>
}