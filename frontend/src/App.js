import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./Component/Footer";
import AddSupplier from "./Component/AddSupplier";

import Home from "./Component/Home";
import Suppliers from "./Component/Suppliers";
import Notfound from "./Component/Notfound";

function App() {
  return (
    <div className="App d-flex flex-column justify-content-center ">
      <Router>
        <Switch>
          <Route path="/supply/:city" component={Suppliers} />
          <Route path="/supplyform/:city" component={AddSupplier} />
          <Route path="/" component={Home} exact />
          <Route component={Notfound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
