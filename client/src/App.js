import React, { useState } from "react";
import HomePage from "./components/HomePage";
import ResultsPage from "./components/ResultsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Used for managing state of Input Bar across components
export const SearchContext = React.createContext(null);

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/search/:id" component={ResultsPage} />
          </Switch>
        </Router>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
