export type EstablishmentType = "shopping" | "local";

export class Establishment {
    constructor(
        public id: string,
        public name: string,
        public ownerId: string,
        public type: EstablishmentType,
    ) {}
}