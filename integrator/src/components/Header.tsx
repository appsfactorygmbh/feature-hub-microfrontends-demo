import React, { useEffect, useState } from "react";
import "@angular/compiler";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IAuthModule } from "@apps/feature-service";
import { useNavigate } from "react-router";

interface IHeaderProps {
  authModule: IAuthModule;
}

const Header = ({ authModule }: IHeaderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const callback = (userName: string) => {
      setIsAuthenticated(!!userName);
    };
    authModule.subscribe(callback);

    return () => authModule.unsubscribe(callback);
  }, []);

  const handleLogIn = () => {
    authModule.logIn("Some Test Name");
  };

  const handleLogOut = () => {
    authModule.logOut();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Feature Hub microfrontend demo
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            go to react app
          </Button>
          <Button color="inherit" onClick={() => navigate("/angular")}>
            go to angular app
          </Button>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={handleLogIn}>
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogOut}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
