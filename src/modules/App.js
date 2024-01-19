import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import logo from '../assets/img/quizzer2.png';
import '../assets/css/App.css';
import Notifications from 'react-notify-toast';
import {QuizMaster} from './quizmaster/QuizMaster'
import {MenuPage} from "./MenuPage";
import {TeamQuiz} from "./teamquiz/TeamQuiz";
import {ScoreBoard} from "./scoreboard/ScoreBoard";

// const express = require('express');
// const app = express();
//
// const server = app.listen(8080, function() {
//     console.log('Ready on port %d', server.address().port);
// });

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Notifications/>
          <span className="side side-left hide-sm"></span>
          <span className="side side-right hide-sm"></span>
          <span className="side side-bottom hide-sm"></span>
          <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          </header>
          <Switch>
            <Route exact path="/" component={MenuPage} />
            <Route path="/quizmaster" component={QuizMaster} />
            <Route path="/teamquiz" component={TeamQuiz} />
            <Route path="/scoreboard" component={ScoreBoard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
