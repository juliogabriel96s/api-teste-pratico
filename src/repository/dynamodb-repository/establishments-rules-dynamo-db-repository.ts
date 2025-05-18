import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { EstablishmentRulesRepository } from "../establishment-rules-repository";
import { EstablishmentsRules } from "@/db/entity/estabilishment-rules";

export class DynamoEstablishmentsRulesRepository implements EstablishmentRulesRepository {
    private readonly tableName = "EstablishmentsRules";

    constructor(private dynamoDbClient: DynamoDBDocumentClient) {}
   
    async create(establishmentRules: EstablishmentsRules): Promise<EstablishmentsRules> {
        const newEstablishmentsRules = {
            ...establishmentRules,
            id: uuidv4(),
        };

        await this.dynamoDbClient.send(new PutCommand({
            TableName: this.tableName,
            Item: newEstablishmentsRules,
        }));

        return newEstablishmentsRules;
    }


    async findById(id: string): Promise<EstablishmentsRules | null> {
        const result = await this.dynamoDbClient.send(new GetCommand({
            TableName: this.tableName,
            Key: {
                id,
            },
        }));

        return result.Item as EstablishmentsRules || null;
    }

     async save(establishmentRule: EstablishmentsRules): Promise<EstablishmentsRules> {
        await this.dynamoDbClient.send(new PutCommand({
            TableName: this.tableName,
            Item: establishmentRule,
        }));
        return establishmentRule;
    }

    async delete(id: string): Promise<void> {
        await this.dynamoDbClient.send(new DeleteCommand({
            TableName: this.tableName,
            Key: {
                id,
            },
        }));
    }


}