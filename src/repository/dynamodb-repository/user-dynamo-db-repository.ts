import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { UserRepository } from "../user-repository";
import { User } from "@/db/entity/user";
import { v4 as uuidv4 } from "uuid";

export class DynamoUserRepository implements UserRepository {
    private readonly tableName = "Users";

    constructor(private dynamoDbClient: DynamoDBDocumentClient) {}
   
    async create(user: User): Promise<User> {
        const newUser = {
            ...user,
            id: uuidv4(),
        };

        await this.dynamoDbClient.send(new PutCommand({
            TableName: this.tableName,
            Item: newUser,
        }));

        return newUser;
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.dynamoDbClient.send(new ScanCommand({
            TableName: this.tableName,
            FilterExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email,
            },
        }));

        return result.Items?.[0] as User || null;
    }

    async findAll(): Promise<User[]> {
        const result = await this.dynamoDbClient.send(new ScanCommand({
            TableName: this.tableName,
        }));

        return (result.Items as User[]) || [];
    }

    async findById(id: string): Promise<User | null> {
        const result = await this.dynamoDbClient.send(new GetCommand({
            TableName: this.tableName,
            Key: {
                id,
            },
        }));

        return result.Item as User || null;
    }

     async save(user: User): Promise<User> {
        await this.dynamoDbClient.send(new PutCommand({
            TableName: this.tableName,
            Item: user,
        }));
        return user;
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