import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { ProductRepository } from "@/repository/product-repository";

interface DeleteProductUseCaseRequest{
    productId: string

}

type DeleteProductUseCaseResponse = Either<
ResourceNotFoundError,
{}
>

export class DeleteProductUseCase{
    constructor(
        private productRepository: ProductRepository  
    ){}

    async execute({
       productId,
    }:DeleteProductUseCaseRequest):Promise<DeleteProductUseCaseResponse>{
         const product = await this.productRepository.findById(productId)

        if(!product){
            return left(new ResourceNotFoundError())
        }

        await this.productRepository.delete(product.id)


        return right({})
    }
}