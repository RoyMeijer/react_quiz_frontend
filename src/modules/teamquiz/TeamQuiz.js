import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {CreateTeam} from './CreateTeam';
import {ChooseQuiz} from './ChooseQuiz';
import {AnswerQuestion} from './AnswerQuestion';
import io from 'socket.io-client';

export class TeamQuiz extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  teamId: null,
	  quizId: null,
	  roundId: 0
	};
	this.ioConnection = io('http://localhost:8080');
	this.handleSubmit = this.handleSubmit.bind(this);
	this.joinQuiz = this.joinQuiz.bind(this);
  }

  handleSubmit(team) {
	this.setState({
	  teamName: team
	});
  }

  joinQuiz(quizId,teamId) {
    this.setState({
	  teamId: teamId,
	  quizId: quizId
	})
  }

  createTeam() {
    //TODo
  }

//   render={(props) => {
//   return <MyAquarium {...props} openModal={this.openModal} app={this.app}/>
// 	}}/>
  render() {
	return (
	  <Switch>
		<Route path="/teamquiz/choosequiz" render={(props) => {
		  return <ChooseQuiz {...props} connection={this.ioConnection} joinQuiz={this.joinQuiz} team={this.state.teamName} />
		}}/>
		<Route path="/teamquiz/createTeam" render={(props) => {
		  return <CreateTeam {...props} connection={this.ioConnection} handleInputChange={this.handleInputChange} chooseTeam={this.handleSubmit} />
		}}/>
		<Route path="/teamquiz/question" render={(props) => {
		  return <AnswerQuestion {...props} connection={this.ioConnection} teamId={this.state.teamId} quizId={this.state.quizId} roundId={this.state.roundId} />
		}}/>
	  </Switch>
	);
  }
}