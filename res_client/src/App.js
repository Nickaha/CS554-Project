import "./App.css";
import React from "react";
import Orders from "./components/Orders";
import { Container } from "@material-ui/core";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          This is a restaurant client page for telling the customer if the order
          is ready to serve
        </h1>
      </header>
      <div className="App-body">
        <Container>
          <Orders />
        </Container>
      </div>
    </div>
  );
}

export default App;
