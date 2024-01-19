import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {CreateQuizForm} from './CreateQuizForm';
import {AddTeams} from './addTeams';
import {Categories} from './ChooseCategories';
import {ChooseQuestion} from './ChooseQuestion';
import {EndRound} from './EndRound';
import quizService from '../../providers/quiz-event-service';
import {Answers} from './Answers';
import io from 'socket.io-client';

export class QuizMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz: null,
            round: null,
            questionProgress: 0
        };
        this.ioConnection = io('http://localhost:8080');

        this.getCurrentQuiz = this.getCurrentQuiz.bind(this);
        this.setQuizRound = this.setQuizRound.bind(this);
        this.upAnswerCount = this.upAnswerCount.bind(this);
        this.resetQuestionProgress = this.resetQuestionProgress.bind(this);
    }

    async getCurrentQuiz() {
        return await quizService.getCurrentQuizEvent().then(response => {
            return response.result.json();
        }).then((data) => {
            if (data.found) {
                this.setState({quiz: data.quiz});
                return data.quiz;
            }
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }

    setQuizRound(roundId) {
        this.setState({round: roundId});
    }

    upAnswerCount() {
        this.setState({questionProgress: ++this.state.questionProgress});
    }

    resetQuestionProgress() {
        this.setState({questionProgress: 0});
    }


    render() {
        return <div>
            <Switch>
                <Route path="/quizmaster/createquiz" render={(props) => {
                    return <CreateQuizForm {...props} connection={this.ioConnection}/>;
                }}/>
                <Route path="/quizmaster/addteams" render={(props) => {
                    return <AddTeams {...props} connection={this.ioConnection} getCurrentQuiz={this.getCurrentQuiz}
                                     quiz={this.state.quiz}/>;
                }}/>
                <Route path="/quizmaster/categories" render={(props) => {
                    return <Categories {...props} setQuizRound={this.setQuizRound} quiz={this.state.quiz}/>;
                }}/>
                <Route path="/quizmaster/questions" render={(props) => {
                    return <ChooseQuestion {...props} connection={this.ioConnection}
                                           getCurrentQuiz={this.getCurrentQuiz}
                                           questionProgress={this.state.questionProgress} round={this.state.round}
                                           quiz={this.state.quiz}/>;
                }}/>
                <Route path="/quizmaster/answers" render={(props) => {
                    return <Answers {...props} getCurrentQuiz={this.getCurrentQuiz} connection={this.ioConnection}
                                    upAnswerCount={this.upAnswerCount} questionProgress={this.state.questionProgress}
                                    round={this.state.round} quiz={this.state.quiz}/>;
                }}/>
                <Route path="/quizmaster/end" render={(props) => {
                    return <EndRound {...props} resetQuestionProgress={this.resetQuestionProgress} connection={this.ioConnection} quiz={this.state.quiz} roundId={this.state.round}/>;
                }}/>
            </Switch>
        </div>;
    }
}