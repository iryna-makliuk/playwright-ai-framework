// Response contracts for the Notes API, verified against the live API responses
// (not copied blindly from the Swagger doc — it disagrees with reality in places,
// e.g. register's `data.id` is documented as integer but is actually a string).

export const simpleResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["success", "status", "message"],
  properties: {
    success: { type: "boolean" },
    status: { type: "integer" },
    message: { type: "string" },
  },
};

export const registerSuccessSchema = {
  type: "object",
  additionalProperties: false,
  required: ["success", "status", "message", "data"],
  properties: {
    success: { type: "boolean" },
    status: { type: "integer" },
    message: { type: "string" },
    data: {
      type: "object",
      additionalProperties: false,
      required: ["id", "name", "email"],
      properties: {
        id: { type: "string", minLength: 1 },
        name: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};

export const loginSuccessSchema = {
  type: "object",
  additionalProperties: false,
  required: ["success", "status", "message", "data"],
  properties: {
    success: { type: "boolean" },
    status: { type: "integer" },
    message: { type: "string" },
    data: {
      type: "object",
      additionalProperties: false,
      required: ["id", "email", "name", "token"],
      properties: {
        id: { type: "string", minLength: 1 },
        email: { type: "string" },
        name: { type: "string" },
        token: { type: "string", minLength: 1 },
      },
    },
  },
};
