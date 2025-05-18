import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Product } from "@/db/entity/product";
import { ProductRepository } from "@/repository/product-repository";

interface EditProductUseCaseRequest{
    productId: string
    name: string
    price: number
}

type EditProductUseCaseResponse = Either<
ResourceNotFoundError,
{
    product: Product
}
>

export class EditProductUseCase{
    constructor(
        private productRepository: ProductRepository  
    ){}

    async execute({
       productId,
       name,
       price
    }:EditProductUseCaseRequest):Promise<EditProductUseCaseResponse>{
         const product = await this.productRepository.findById(productId)

        if(!product){
            return left(new ResourceNotFoundError())
        }

        product.name = name
        product.price = price

        await this.productRepository.save(product)


        return right({
            product
        })
    }
}