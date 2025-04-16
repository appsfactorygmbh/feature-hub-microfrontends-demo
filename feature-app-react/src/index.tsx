import "./index.css";
import App from "./App";
import { FeatureAppDefinition } from "@feature-hub/core";
import { ReactFeatureApp } from "@feature-hub/react";
import { IAuthModule } from "@apps/feature-service/index";

const featureAppDefinition: FeatureAppDefinition<ReactFeatureApp> = {
  dependencies: {
    featureServices: {
      "test:mock-auth-service": "^1.0.0",
    },
    externals: {
      react: "^19.0.0",
      "react-dom": "^19.0.0"
    },
  },
  create: (env: any) => {
    const authModule = env.featureServices[
      "test:mock-auth-service"
    ] as IAuthModule;

    return {
      render: () => {
        return <App authModule={authModule} />;
      },
    };
  },
};

export default featureAppDefinition;
