import { FollowDAO } from "./dao";

const dao = new FollowDAO();

async function test() {
  for (let i = 1; i <= 25; i++) {
    await dao.putItem({
      follower_handle: "@FredFlintstone",
      follower_name: "Fred Flintstone",
      followee_handle: `@User${i}`,
      followee_name: `User ${i}`,
    });
  }

  for (let i = 1; i <= 25; i++) {
    await dao.putItem({
      follower_handle: `@Follower${i}`,
      follower_name: `Follower ${i}`,
      followee_handle: "@ClintEastwood",
      followee_name: "Clint Eastwood",
    });
  }

  /* Tests */
  const item = await dao.getItem("@FredFlintstone", "@User1");
  console.log(item);

  const updated = await dao.updateItem(
    "@FredFlintstone",
    "@User1",
    "Fred UPDATED",
    "User1 UPDATED",
  );
  console.log(updated);

  await dao.deleteItem("@FredFlintstone", "@User1");
}

test();
