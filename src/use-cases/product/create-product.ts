import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { Product } from "@/db/entity/product";
import { EstabilishmentRepository } from "@/repository/estabilishment-repository";
import { ProductRepository } from "@/repository/product-repository";
import {v4 as uuidv4} from 'uuid'

interface CreateProductUseCaseRequest{
    name: string
    price: number
    establishmentId: string,
}

type CreateProductUseCaseResponse = Either<
NotAllowedError,
{
    product: Product
}
>

export class CreateProductUseCase{
    constructor(
        private establishmentRepository: EstabilishmentRepository,
        private productRepository: ProductRepository  
    ){}

    async execute({
       name,
       price,
       establishmentId
    }:CreateProductUseCaseRequest):Promise<CreateProductUseCaseResponse>{
         const establishment = await this.establishmentRepository.findById(establishmentId)

        if(!establishment){
            return left(new NotAllowedError())
        }

        const product = await this.productRepository.create({
            id:uuidv4(),
            name,
            price,
            establishmentId
        })

        return right({
            product
        })
    }
}