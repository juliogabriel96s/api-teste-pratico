import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy",
  },
});

const dynamoDbClient = DynamoDBDocumentClient.from(client);

export default dynamoDbClient;

export const dynamoDbDocumentClient = dynamoDbClient;

