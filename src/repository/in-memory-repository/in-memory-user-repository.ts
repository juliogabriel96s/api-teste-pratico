import { User } from '@/db/entity/user';
import {UserRepository} from '../user-repository'
import { randomUUID } from 'crypto';
export class InMemoryUserRepository implements UserRepository{
    
    public Items: User[] = []

    async create(data: User) {
        const user = {
            id: randomUUID() || data.id,
            name: data.name,
            email: data.email,
            type: data.type ? data.type : 'customer'

        }

        this.Items.push(user)

        return user
    }
    async findByEmail(email: string) {
        const user = this.Items.find(item => item.email === email)

        if(!user){
            return null
        }

        return user
    }
    async findById(id: string) {
         const user = this.Items.find(item => item.id === id)

        if(!user){
            return null
        }

        return user
    }

    async save(user: User) {
        const itemIndex = this.Items.findIndex(item => item.id === user.id)

        this.Items[itemIndex] = user

        return user
    }
    async delete(id: string) {
         const itemIndex = this.Items.findIndex(item => item.id === id)

         if(itemIndex > -1){
            this.Items.splice(itemIndex, 1)
         }

    }

    async findAll() {
        return this.Items
    }

}