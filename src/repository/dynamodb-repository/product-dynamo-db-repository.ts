import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { ProductRepository } from "../product-repository";
import { Product } from "@/db/entity/product";

export class DynamoProductRepository implements ProductRepository {
    private readonly tableName = "Products";

    constructor(private dynamoDbClient: DynamoDBDocumentClient) {}
   
    async create(product: Product): Promise<Product> {
        const newProduct = {
            ...product,
            id: uuidv4(),
        };

        await this.dynamoDbClient.send(new PutCommand({
            TableName: this.tableName,
            Item: newProduct,
        }));

        return newProduct;
    }



    async findAll(): Promise<Product[]> {
        const result = await this.dynamoDbClient.send(new ScanCommand({
            TableName: this.tableName,
        }));

        return (result.Items as Product[]) || [];
    }

    async findById(id: string): Promise<Product | null> {
        const result = await this.dynamoDbClient.send(new GetCommand({
            TableName: this.tableName,
            Key: {
                id,
            },
        }));

        return result.Item as Product || null;
    }

     async save(product: Product): Promise<Product> {
        await this.dynamoDbClient.send(new PutCommand({
            TableName: this.tableName,
            Item: product,
        }));
        return product;
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