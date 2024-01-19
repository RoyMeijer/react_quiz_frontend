import React from 'react';
import {TeamRow} from './TeamRow';
import quizService from '../../providers/quiz-event-service';
import {Redirect} from 'react-router-dom';

export class AddTeams extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  teams: [],
	  acceptedTeams: [],
	  quiz_id: '',
	  redirect: false
	};
	this.addTeams = this.addTeams.bind(this);
  }

  componentDidMount() {
	this.refreshTeams();
	this.props.connection.on('RefreshTeams', () => {
	  this.refreshTeams();
	});
  }

  refreshTeams() {
	this.props.getCurrentQuiz().then((data) => {
	  if (data) {
		this.setState({teams: data.teams, quiz_id: data._id});
	  }
	});
  }

  //should maybe be given as a prop
  addTeams(event) {
	event.preventDefault();
	let response = quizService.saveTeams(this.state.acceptedTeams, this.state.quiz_id);
	response.then(data => {
		if (data.status === 200) console.log('replace this console.log with set state');
	  this.props.connection.emit('ApprovedTeams');
	  this.setState({redirect: true});
	}).catch((err) => {
	  console.log(err);
	});
  }

  changeTeamStatus(event, id) {
	const denied = event.target.value === 'deny';
	const accepted = event.target.value === 'accept';
	const team = {id: id, approved: accepted};
	const teams = this.state.acceptedTeams;
	if (accepted && teams.findIndex(item => item.id === id) === -1) teams.push(team);
	else if (denied && teams.findIndex(item => item.id === id) !== -1) teams.splice(teams.findIndex(item => item.id === id), 1);
	this.setState({acceptedTeams: teams});
	console.log(this.state.acceptedTeams);
	}

  render() {
	const {redirect} = this.state;
	if (redirect) return <Redirect to='/quizmaster/categories'/>;
	let allowButton = false;
	if (this.state.acceptedTeams.length >= 2) {
	 allowButton = true;
	} else {
	 allowButton = false;
	}
	return (
	  <div className="container">
		<div className="col-md-8 col-md-offset-2">
		<h1>Add teams</h1>
		<form onSubmit={this.addTeams}>
		  <table className="table table-bordered">
			<thead>
			<tr>
			  <th>Team</th>
			  <th>Accept/Deny</th>
			</tr>
			</thead>
			<tbody>
			{this.state.teams ? this.state.teams.map((item, index) => {
			  return (
				<TeamRow changeTeamStatus={(event) => this.changeTeamStatus(event, item._id)} key={index}
						 team={item}/>);
			}) : null}
			</tbody>
		  </table>
		  <button type="submit" id="next" name="next" disabled={!allowButton} className="btn menu-button">Next</button>
		</form>
	  </div>
		</div>
	);
  }
}