import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
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

export interface DataPage<T> {
  values: T[];
  hasMorePages: boolean;
  lastKey?: string;
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

  private async queryPage(
    partitionKeyName: string,
    partitionKeyValue: string,
    sortKeyName: string,
    pageSize: number,
    lastKey: string | undefined,
    indexName?: string,
  ): Promise<DataPage<Follow>> {
    const params: any = {
      TableName: TABLE_NAME,
      KeyConditionExpression: `${partitionKeyName} = :partitionKey`,
      ExpressionAttributeValues: {
        ":partitionKey": partitionKeyValue,
      },
      Limit: pageSize,
    };

    if (indexName) {
      params.IndexName = indexName;
    }

    if (lastKey) {
      params.ExclusiveStartKey = {
        [partitionKeyName]: partitionKeyValue,
        [sortKeyName]: lastKey,
      };
    }

    const result = await docClient.send(new QueryCommand(params));

    return {
      values: result.Items as Follow[],
      hasMorePages: result.LastEvaluatedKey !== undefined,
      lastKey: result.LastEvaluatedKey?.[sortKeyName],
    };
  }

  async getPageOfFollowees(
    followerHandle: string,
    pageSize: number,
    lastFolloweeHandle: string | undefined,
  ): Promise<DataPage<Follow>> {
    return this.queryPage(
      "follower_handle",
      followerHandle,
      "followee_handle",
      pageSize,
      lastFolloweeHandle,
    );
  }

  async getPageOfFollowers(
    followeeHandle: string,
    pageSize: number,
    lastFollowerHandle: string | undefined,
  ): Promise<DataPage<Follow>> {
    return this.queryPage(
      "followee_handle",
      followeeHandle,
      "follower_handle",
      pageSize,
      lastFollowerHandle,
      "follows_index",
    );
  }
}
