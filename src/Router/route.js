import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Results from "../component/Result";
import Quiz from "../Quiz";


function Routes(props) {
  return (
    <Router>
      <div>
        <Switch>
			   	<Route exact path="/" component={Quiz} />
          <Route exact path="/result" component={Results} />
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;
