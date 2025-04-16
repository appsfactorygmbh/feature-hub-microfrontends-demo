import { MockAuthModule } from "./auth-module";

const authModuleFeatureServiceDefinition = {
  id: "test:mock-auth-service",

  create(env: any) {
    const authModule = new MockAuthModule();

    return { "1.0.0": () => ({ featureService: authModule }) };
  },
};

export type { IAuthModule } from "./auth-module";
export default authModuleFeatureServiceDefinition;
