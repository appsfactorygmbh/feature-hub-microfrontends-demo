import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { IAuthModule } from '@apps/feature-service/index';
import 'zone.js';
import { ApplicationRef } from '@angular/core';

const featureAppDeclaration = {
  dependencies: {
    featureServices: {
      'test:mock-auth-service': '^1.0.0',
    },
    externals: {
      react: '^19.0.0',
    },
  },

  create(env: any) {
    return {
      attachTo(containerDiv: any) {
        containerDiv.innerHTML = '<app-root></app-root>';
        const authModule = env.featureServices[
          'test:mock-auth-service'
        ] as IAuthModule;

        let appRef: ApplicationRef | null = null;

        bootstrapApplication(AppComponent, {
          providers: [{ provide: 'AuthModule', useValue: authModule }],
        })
          .then((applicationRef) => {
            appRef = applicationRef;
          })
          .catch((er) => console.error(er));

        return function () {
          if (appRef) {
            appRef.destroy();
            console.log('Angular application unmounted');
          }
        };
      },
    };
  },
};

export default featureAppDeclaration;
