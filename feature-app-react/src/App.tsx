import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { IAuthModule } from "@apps/feature-service/index";

interface IAppProps {
  authModule: IAuthModule;
}

function App({ authModule }: IAppProps) {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const callback = (username: string) => {
      setUserName(username);
    };
    authModule.subscribe(callback);

    return () => {
      authModule.unsubscribe(callback);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is a react microfrontend app</p>
        {userName && <p>Hello, {userName}</p>}
      </header>
    </div>
  );
}

export default App;
