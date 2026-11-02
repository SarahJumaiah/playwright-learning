const username = process.env.LOGIN_USERNAME;
const password = process.env.LOGIN_PASSWORD;

if (!username || !password) {
  throw new Error(
    "Set LOGIN_USERNAME and LOGIN_PASSWORD in the .env file or environment.",
  );
}

export default { username, password };