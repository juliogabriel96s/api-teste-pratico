import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { EstabilishmentRepository } from "../estabilishment-repository";
import { Establishment } from "@/db/entity/estabilishment";

export class DynamoEstablishmentRepository implements EstabilishmentRepository {
    private readonly tableName = "Establishments";

    constructor(private dynamoDbClient: DynamoDBDocumentClient) {}
    async findByType(type: string): Promise<Establishment | null> {
        const result = await this.dynamoDbClient.send(new ScanCommand({
            TableName: this.tableName,
            FilterExpression: "type = :type",
            ExpressionAttributeValues: {
                ":type": type,
            },
        }))

        return result.Items?.[0] as Establishment || null;

    }
   
    async create(establishment: Establishment): Promise<Establishment> {
        const newEstablishment = {
            ...establishment,
            id: uuidv4(),
        };

        await this.dynamoDbClient.send(new PutCommand({
            TableName: this.tableName,
            Item: newEstablishment,
        }));

        return newEstablishment;
    }

    async findAll(): Promise<Establishment[]> {
        const result = await this.dynamoDbClient.send(new ScanCommand({
            TableName: this.tableName,
        }));

        return (result.Items as Establishment[]) || [];
    }

    async findById(id: string): Promise<Establishment | null> {
        const result = await this.dynamoDbClient.send(new GetCommand({
            TableName: this.tableName,
            Key: {
                id,
            },
        }));

        return result.Item as Establishment || null;
    }

     async save(establishment: Establishment): Promise<Establishment> {
        await this.dynamoDbClient.send(new PutCommand({
            TableName: this.tableName,
            Item: establishment,
        }));
        return establishment;
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