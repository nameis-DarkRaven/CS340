import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "follows";

export interface Follow {
  follower_handle: string;
  follower_name: string;
  followee_handle: string;
  followee_name: string;
}

export class FollowDAO {
  async putItem(item: Follow): Promise<void> {
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      }),
    );
  }

  async getItem(
    follower_handle: string,
    followee_handle: string,
  ): Promise<Follow | undefined> {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: {
          follower_handle,
          followee_handle,
        },
      }),
    );

    return result.Item as Follow;
  }

  async updateItem(
    follower_handle: string,
    followee_handle: string,
    follower_name: string,
    followee_name: string,
  ): Promise<Follow | undefined> {
    const result = await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: {
          follower_handle,
          followee_handle,
        },
        UpdateExpression:
          "SET follower_name = :followerName, followee_name = :followeeName",
        ExpressionAttributeValues: {
          ":followerName": follower_name,
          ":followeeName": followee_name,
        },
        ReturnValues: "ALL_NEW",
      }),
    );

    return result.Attributes as Follow;
  }

  async deleteItem(
    follower_handle: string,
    followee_handle: string,
  ): Promise<void> {
    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
          follower_handle,
          followee_handle,
        },
      }),
    );
  }
}
