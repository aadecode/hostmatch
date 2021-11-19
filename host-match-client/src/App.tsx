import React, { Context } from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { HMNavBar, HMNotification, HMRouter } from "./components";
import { PlayerInitilizer } from "./pages/Players/PlayerInitializer";
import { HMSpinner } from "./components/Spinner";

const App = (): JSX.Element => {
  return (
    <main className={"hm-container"}>
      <BrowserRouter>
        <header className="hm-header">
          <HMNavBar />
        </header>
        <main className="hm-content">
          <HMRouter />
        </main>
        <HMNotification />
        <HMSpinner />
        <PlayerInitilizer />
      </BrowserRouter>
    </main>
  );
};

export default App;
