# Microfrontends with Feature Hub

## Introduction
This is a proof of concept project for microfrontend architecture using Feature Hub.
The architecture chosen is ```React``` integrator with ```DomFeatureApp``` for framework-agnostic approach and ```ReactFeatureApp``` for React microfrontends.

The project consists of two variations to demonstrate different technology choices for Feature Hub: 
- <b>React integrator with Webpack Federation Module Loader</b>
- <b>Next.js integrator with AMD Module Loader</b>

>**NOTE:** Both integrators use the same Feature Apps and Feature Service, however, the Feature Apps are built differently depending on the integrator.

## Getting Started
In order to install the project, clone the git repository on your working machine.
> Please, make sure that you have ```make``` command installed.

## 1. Install
To install project dependencies, run ```make install``` from the root folder of the project. It should install the required packages for <b>integrator</b>, <b>integrator-nextjs</b>, <b>feature-app-react</b> and <b>feature-app-angular</b>.

> When reinstalling or rebuilding the project, make use of ```make clean``` command, which should clean the installed dependencies and build outputs

## 2. Build

### Webpack Federation Module Loader
Run ```make build-federated``` to build React integrator with Webpack Federation module loader and respective Feature Apps in the repository.

### AMD Module Loader
Run ```make build-amd``` to build Next.js integrator with AMD module loader and respective Feature Apps in the repository.

## 3. Start

### Webpack Federation Module Loader
Run ```make start-federated``` to start all the resources required for React integrator with Webpack Federation module loader.

### AMD Module Loader
Run ```make start-amd``` to start all the resources required for Next.js integrator with AMD module loader.

> When the project is started, go to [http://localhost:3000](http://localhost:3000)

> To stop the dev server, use ```Ctrl+C```


## Tech-Stack
- [Webpack](https://webpack.js.org) 
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/) 
- [Angular V19](https://angular.dev) 
- [React V19](https://react.dev/versions#react-19) 
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org) 
- [MaterialUI](https://mui.com/material-ui) 
- [React Router](https://reactrouter.com) 
- [Feature Hub Core](https://www.npmjs.com/package/@feature-hub/core)
- [Feature Hub Dom](https://www.npmjs.com/package/@feature-hub/dom/v/3.0.0?activeTab=code)
- [Feature Hub React](https://www.npmjs.com/package/@feature-hub/react)