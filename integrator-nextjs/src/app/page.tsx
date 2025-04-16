"use client";

import { createFeatureHub } from "@feature-hub/core";
import { loadAmdModule, defineExternals } from "@feature-hub/module-loader-amd";
import {
  FeatureAppLoader,
  FeatureHubContextProvider,
} from "@feature-hub/react";
import authModuleServiceDefinition from "@apps/feature-service/index";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "@angular/compiler";

defineExternals({ react: React, "react-dom": ReactDOM });

const { featureAppManager } = createFeatureHub("test:react-integrator", {
  featureServiceDefinitions: [authModuleServiceDefinition],
  featureServiceDependencies: { [authModuleServiceDefinition.id]: "^1.0.0" },
  moduleLoader: loadAmdModule,
  providedExternals: { react: "19.1.0", "react-dom": "19.1.0" },
});

export default function Home() {
  return (
    <FeatureHubContextProvider value={{ featureAppManager }}>
      <FeatureAppLoader
        key="feature-app-react:main"
        featureAppId="feature-app-react:main"
        baseUrl="http://localhost:8000"
        src="feature-app-react.umd.js"
        moduleType="amd"
      />
      <FeatureAppLoader
        key="feature-app-angular:main"
        featureAppId="feature-app-angular:main"
        baseUrl="http://localhost:4200"
        src="feature-app-angular.umd.js"
        moduleType="amd"
      />
    </FeatureHubContextProvider>
  );
}
