import { Either, left, right } from "@/core/either";
import { Product } from "@/db/entity/product";
import { ProductRepository } from "@/repository/product-repository";

interface GetAllProductUseCaseRequest{
}

type GetAllProductUseCaseResponse = Either<
{},
{
    product: Product[]
}
>

export class GetAllProductUseCase{
    constructor(
        private productRepository: ProductRepository  
    ){}

    async execute({
    }:GetAllProductUseCaseRequest):Promise<GetAllProductUseCaseResponse>{
         const product = await this.productRepository.findAll()

        return right({
            product
        })
    }
}