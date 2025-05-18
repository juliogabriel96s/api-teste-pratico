import { CreateTableCommand, DeleteTableCommand } from "@aws-sdk/client-dynamodb";
import dynamoDbClient from "../db";

export async function up() {
  try {
    await dynamoDbClient.send(
      new CreateTableCommand({
        TableName: "Products",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "S" },
          { AttributeName: "establishmentId", AttributeType: "S" },
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "EstablishmentIndex",
            KeySchema: [{ AttributeName: "establishmentId", KeyType: "HASH" }],
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
    console.log("✅ Products table created");
  } catch (error) {
    if ((error as any).name !== "ResourceInUseException") {
      console.error("❌ Error creating Products table:", error);
    }
  }
}

export async function down() {
  try {
    await dynamoDbClient.send(new DeleteTableCommand({ TableName: "Products" }));
    console.log("🗑️ Products table deleted");
  } catch (error) {
    console.error("❌ Error deleting Products table:", error);
  }
}