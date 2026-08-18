import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

export function assertMatchesSchema(data, schema) {
  const validate = ajv.compile(schema);
  const isValid = validate(data);

  if (!isValid) {
    throw new Error(
      `Response does not match the expected schema:\n${JSON.stringify(
        validate.errors,
        null,
        2
      )}\n\nReceived:\n${JSON.stringify(data, null, 2)}`
    );
  }
}
