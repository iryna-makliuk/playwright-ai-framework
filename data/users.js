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
