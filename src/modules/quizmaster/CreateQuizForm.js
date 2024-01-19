import React from 'react';
import quizService from '../../providers/quiz-event-service';
import {notify} from 'react-notify-toast';
import {Redirect} from 'react-router-dom';

export class CreateQuizForm extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  quiz_name: '',
	  password: '',
	  redirect: false
	};

	this.handleInputChange = this.handleInputChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
	const target = event.target;
	const name = target.name;

	this.setState({
	  [name]: target.value
	});
  }

  componentDidMount() {
	this.getCurrentQuiz();
  }

  getCurrentQuiz() {
	quizService.getCurrentQuizEvent().then(response => {
	  return response.result.json();
	}).then((data) => {
	  if (data.found) {
		this.setState({redirect: true});
	  }
	}).catch((err) => {
	  console.log(err);
	});
  }

  handleSubmit(event) {
	event.preventDefault();
	const quiz = {
	  name: this.state.quiz_name,
	  password: this.state.password
	};
	const quizCreateResponse = quizService.saveQuizEvent(quiz);
	quizCreateResponse.then((data) => {
	  if (!data.error) {
		notify.show('Created a quiz!');
		this.props.connection.emit('CreateQuizEvent');
		this.setState({
		  redirect: true
		});
	  } else {
		notify.show('Something went wrong');
	  }
	});
  }

  //TODO: function is way to big
  render() {
	const {redirect} = this.state;

	if (redirect) {
	  return <Redirect to='/quizmaster/addTeams'/>;
	}
	return (
		<div className="container">
			<form onSubmit={this.handleSubmit} className="form-horizontal">
				<h1>Make A Quiz</h1>
				<div className="row">
					<label className="col-md-4 control-label" htmlFor="quizName">Name quiz</label>
					<div className="col-sm-8 col-md-4">
						<input id="quizName" onChange={this.handleInputChange} value={this.state.quiz_name} name="quiz_name"
							type="text" placeholder="name quiz" className="form-control input-md" required=""></input>
					</div>
				</div>
				<div className="row">
					<label className="col-md-4 control-label" htmlFor="password">Password</label>
					<div className="col-sm-10 col-md-4">
						<input id="password" onChange={this.handleInputChange} value={this.state.password} name="password"
							type="password" placeholder="password" className="form-control input-md" required=""></input>
						<span className="help-block"> </span>
					</div>
				</div>
				<div className="col-sm-4 col-sm-offset-2 col-md-2 col-md-offset-4">
					<a href="/">
						<button type="button" className="btn menu-button">Back</button>
					</a>
				</div>
				<div className="col-sm-4 col-md-2">
					<button type="submit" id="create" name="create" className="btn menu-button">Create</button>
				</div>
			</form>
		</div>
	);
  }
}