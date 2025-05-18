import { randomUUID } from 'crypto';
import { ProductRepository } from '../product-repository';
import { Product } from '@/db/entity/product';
export class InMemoryProductRepository implements ProductRepository{
    
    public Items: Product[] = []

    async create(data: Product) {
        const product = {
            id: randomUUID() || data.id,
            name: data.name,
            price: data.price,
           establishmentId: data.establishmentId 

        }

        this.Items.push(product)

        return product
    }
    
    async findById(id: string) {
         const product = this.Items.find(item => item.id === id)

        if(!product){
            return null
        }

        return product
    }

    async save(product: Product) {
        const itemIndex = this.Items.findIndex(item => item.id === product.id)

        this.Items[itemIndex] = product

        return product
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