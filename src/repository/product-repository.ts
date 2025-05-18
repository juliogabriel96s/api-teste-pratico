import { Product } from "@/db/entity/product"

export interface ProductRepository{
    create(product: Product):Promise<Product>
    findById(id: string):Promise<Product | null>
    save(product: Product): Promise<Product>
    delete(id: string): Promise<void>
    findAll(): Promise<Product[]>
}