import { UseCaseERROR } from "../use-case-error";

export class NotAllowedError extends Error implements UseCaseERROR{
    constructor(){
        super("Not allowed error.")
        this.name = "Not allowed error."
    }
}