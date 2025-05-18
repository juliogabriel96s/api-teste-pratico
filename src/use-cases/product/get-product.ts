import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Product } from "@/db/entity/product";
import { ProductRepository } from "@/repository/product-repository";

interface GetProductUseCaseRequest{
    productId: string
}

type GetProductUseCaseResponse = Either<
ResourceNotFoundError,
{
    product: Product
}
>

export class GetProductUseCase{
    constructor(
        private productRepository: ProductRepository  
    ){}

    async execute({
       productId
    }:GetProductUseCaseRequest):Promise<GetProductUseCaseResponse>{
         const product = await this.productRepository.findById(productId)

        if(!product){
            return left(new ResourceNotFoundError())
        }

        return right({
            product
        })
    }
}