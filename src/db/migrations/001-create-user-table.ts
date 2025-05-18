import { CreateTableCommand, DeleteTableCommand } from "@aws-sdk/client-dynamodb";
import dynamoDbClient from "../db";

export async function up() {
  try {
    await dynamoDbClient.send(
      new CreateTableCommand({
        TableName: "Users",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "S" },  
          { AttributeName: "email", AttributeType: "S" },  
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "EmailIndex",
            KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5,
            },
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      })
    );
    console.log("✅ Users table created");
  } catch (error) {
    if ((error as any).name !== "ResourceInUseException") {
      console.error("❌ Error creating Users table:", error);
    }
  }
}

export async function down() {
  try {
    await dynamoDbClient.send(new DeleteTableCommand({ TableName: "Users" }));
    console.log("🗑️ Users table deleted");
  } catch (error) {
    console.error("❌ Error deleting Users table:", error);
  }
}
