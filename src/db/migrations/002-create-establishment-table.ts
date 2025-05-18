import { CreateTableCommand, DeleteTableCommand } from "@aws-sdk/client-dynamodb";
import dynamoDbClient from "../db";

export async function up() {
  try {
    await dynamoDbClient.send(
      new CreateTableCommand({
        TableName: "Establishments",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "S" },
          { AttributeName: "ownerId", AttributeType: "S" },
          { AttributeName: "type", AttributeType: "S" },
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "OwnerIndex",
            KeySchema: [{ AttributeName: "ownerId", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5,
            },
          },
          {
            IndexName: "TypeIndex",
            KeySchema: [{ AttributeName: "type", KeyType: "HASH" }],
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
    console.log("✅ Establishments table created");
  } catch (error) {
    if ((error as any).name !== "ResourceInUseException") {
      console.error("❌ Error creating Establishments table:", error);
    }
  }
}

export async function down() {
  try {
    await dynamoDbClient.send(new DeleteTableCommand({ TableName: "Establishments" }));
    console.log("🗑️ Establishments table deleted");
  } catch (error) {
    console.error("❌ Error deleting Establishments table:", error);
  }
}