import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_0hpWK7LcU",
  ClientId: "7o5e98ca3h2m9akffbm9u1kg42",
};

export default new CognitoUserPool(poolData);
