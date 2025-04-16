import { createFeatureHub } from "@feature-hub/core";
import { loadFederatedModule } from "@feature-hub/module-loader-federation";
import "./App.css";
import {
  FeatureAppLoader,
  FeatureHubContextProvider,
} from "@feature-hub/react";
import authModuleServiceDefinition, {
  IAuthModule,
} from "@apps/feature-service/index";
import React from "react";
import "@angular/compiler";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router";

const { featureAppManager, featureServices } = createFeatureHub(
  "test:react-integrator",
  {
    featureServiceDefinitions: [authModuleServiceDefinition],
    featureServiceDependencies: { [authModuleServiceDefinition.id]: "^1.0.0" },
    moduleLoader: loadFederatedModule,
    providedExternals: { react: "19.0.0", "react-dom": "19.0.0" },
  }
);

function App() {
  const authModule = featureServices[
    authModuleServiceDefinition.id
  ] as IAuthModule;

  return (
    <BrowserRouter>
      <FeatureHubContextProvider value={{ featureAppManager }}>
        <Header authModule={authModule} />
        <Routes>
          <Route
            path="/"
            element={
              <FeatureAppLoader
                key="feature-app-react:main"
                featureAppId="feature-app-react:main"
                baseUrl="http://localhost:8000"
                src="feature-app-react.js"
              />
            }
          />
          <Route
            path="/angular"
            element={
              <FeatureAppLoader
                key="feature-app-angular:main"
                featureAppId="feature-app-angular:main"
                baseUrl="http://localhost:4200"
                src="feature-app-angular.js"
              />
            }
          />
        </Routes>
      </FeatureHubContextProvider>
    </BrowserRouter>
  );
}

export default App;
