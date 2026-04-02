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

  const item = await dao.getItem("@FredFlintstone", "@User1");
  console.log(item);

  const updated = await dao.updateItem(
    "@FredFlintstone",
    "@User1",
    "Fred UPDATED",
    "User1 UPDATED",
  );
  console.log(updated);

  console.log("\n--- FOLLOWEES PAGE 1 ---");
  const page1 = await dao.getPageOfFollowees("@FredFlintstone", 10, undefined);
  console.log(page1);

  console.log("\n--- FOLLOWEES PAGE 2 ---");
  const page2 = await dao.getPageOfFollowees(
    "@FredFlintstone",
    10,
    page1.lastKey,
  );
  console.log(page2);

  console.log("\n--- FOLLOWERS PAGE 1 ---");
  const fpage1 = await dao.getPageOfFollowers("@ClintEastwood", 10, undefined);
  console.log(fpage1);

  console.log("\n--- FOLLOWERS PAGE 2 ---");
  const fpage2 = await dao.getPageOfFollowers(
    "@ClintEastwood",
    10,
    fpage1.lastKey,
  );
  console.log(fpage2);

  await dao.deleteItem("@FredFlintstone", "@User1");
}

test();
