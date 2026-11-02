import type { APIRequestContext } from "@playwright/test";

const baseUrl = "https://jsonplaceholder.typicode.com";
const postsEndpoint = "/posts";
const postParams = { id: 2 };
const postBody = {
  title: "foo",
  body: "bar",
  userId: 102,
};
const postHeaders = {
  "Content-Type": "application/json",
};

async function getUsers(request: APIRequestContext) {
  return request.get(baseUrl + postsEndpoint);
}

async function getUsers2(request: APIRequestContext) {
  return request.get(baseUrl + postsEndpoint, { params: postParams });
}

async function createUser(request: APIRequestContext) {
  return request.post(baseUrl + postsEndpoint, {
    headers: postHeaders,
    data: postBody,
  });
}

export default { getUsers, getUsers2, createUser };
