import { expect, test } from "@playwright/test";
import usersRequest from "../endpoints/usersEndpoints";

test.describe("Users API test", () => {
  test("Check get users response success response", async ({ request }) => {
    const response = await usersRequest.getUsers(request);
    const posts = await response.json();

    expect(response.status()).toBe(200);
    expect(posts).toHaveLength(100);
  });

  test("Check get users response for a specific user", async ({ request }) => {
    const response = await usersRequest.getUsers2(request);
    const posts = await response.json();

    console.log(posts);
    expect(posts[0].title).toEqual("qui est esse");
  });

  test("Check get users response header", async ({ request }) => {
    const response = await usersRequest.getUsers(request);
    const headers = await response.headers();

    console.log(headers);
    expect(headers.connection).toEqual("keep-alive");
  });

  test("Check post user response status code and body", async ({ request }) => {
    const response = await usersRequest.createUser(request);
    const post = await response.json();

    console.log(post);
    expect(post.id).toEqual(101);
  });
});
