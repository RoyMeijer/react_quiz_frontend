import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ScoreChooseQuiz} from "./ScoreChooseQuiz";
import {ScoreQuestion} from "./ScoreQuestion";
import {ScoreEnd} from "./ScoreEnd";
import io from "socket.io-client";

export class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz_id: null,
            teams: []
        };
        this.chooseQuiz = this.chooseQuiz.bind(this);
        this.setEndStats = this.setEndStats.bind(this);
        this.ioConnection = io('http://localhost:8080');
    }

    chooseQuiz(id) {
        this.setState({quiz_id: id});
    }

    setEndStats(teams) {
        this.setState({
            teams: teams
        });
    }


    render() {
        return (
            <Switch>
                <Route path="/scoreboard/choosequiz" render={(props) => {
                    return <ScoreChooseQuiz {...props} selectQuiz={this.chooseQuiz}/>
                }}/>
                <Route path="/scoreboard/question" render={(props) => {
                    return <ScoreQuestion {...props} setEndStats={this.setEndStats} connection={this.ioConnection}
                                          quizId={this.state.quiz_id}/>
                }}/>
                <Route path="/scoreboard/end" render={(props) => {
                    return <ScoreEnd {...props} quizId={this.state.quiz_id}/>
                }}/>
            </Switch>
        );
    }
}