export const users = {
  standard: {
    username: "practice",
    password: "SuperSecretPassword!",
  },
};

export const invalidUsers = [
  {
    name: "invalid username",
    credentials: {
      ...users.standard,
      username: "wrong_user",
    },
    expectedMessage: "Your username is invalid!",
  },
  {
    name: "invalid password",
    credentials: {
      ...users.standard,
      password: "wrong_password",
    },
    expectedMessage: "Your password is invalid!",
  },
];

export function generateNewUser() {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 10000)}`;

  return {
    name: "QA Automation",
    email: `qa.automation.${suffix}@example.com`,
    password: "SuperSecret123!",
  };
}
