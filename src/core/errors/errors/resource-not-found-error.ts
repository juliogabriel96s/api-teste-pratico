import { UseCaseERROR } from "../use-case-error"
export class ResourceNotFoundError extends Error implements UseCaseERROR{
    constructor(){
        super("Resource not found error.")
        this.name = "Resource not found error."

    }
}