import './App.css';
import React from 'react';
import Orders from './components/Orders';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>This is a restaurant client page for telling the customer if the order is ready to serve</h1>
      </header>
      <div className="App-body">
          <Orders />
      </div>
    </div>
  );
}

export default App;
