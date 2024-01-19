import React, { Component } from 'react';
import { QuizList } from './QuizList';
import dataService from '../../providers/quiz-event-service';
import { notify } from 'react-notify-toast';
import { Redirect } from 'react-router-dom';

class ChooseQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      selectedQuiz: null,
      password: '',
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuizChange = this.handleQuizChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    this.refreshQuizEvents();
    this.props.connection.on('UpdateQuizEvent', () => {
      this.refreshQuizEvents();
    });

    this.props.connection.on('TeamsAccepted', () => {
      this.setState({ redirect: true });
    });
  }

  refreshQuizEvents() {
    let response = dataService.getAllQuizEvents();
    response
      .then((response) => response.result.json())
      .then((data) => {
        let theItems = data.map((item, idx) => (
          <option key={idx} value={item._id}>
            {item.name}
          </option>
        ));
        this.setState({ quizzes: theItems });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.selectedQuiz) {
      const quiz = {
        id: this.state.selectedQuiz,
        password: this.state.password,
        team_name: this.props.team,
      };
      let response = dataService.joinQuiz(quiz);
      response
        .then((data) => {
          if (data.error) {
            if (data.error === 'Password incorrect') {
              notify.show('Incorrect password');
            }
            if (data.error === 'Duplicate name') {
              notify.show('This name has already been chosen by somebody else');
            }
          } else {
            this.props.joinQuiz(data.quiz_id, data.team_id);
            this.props.connection.emit('JoinQuiz');
            notify.show('Request sent to quizmaster, waiting for a response');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      notify.show('You didn\'t select a quiz');
    }
  }

  handleQuizChange(event) {
    this.setState({ selectedQuiz: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    if (this.props.team === '') {
      return <Redirect to='/teamquiz/createteam' />;
    }
    if (this.state.redirect) {
      return <Redirect to='/teamquiz/question' />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          <h1>Choose Quiz</h1>
          <div className="row">
            <QuizList handleQuizChange={this.handleQuizChange} items={this.state.quizzes} />
            <div className="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-0 col-md-4">
              <label className="control-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
                type="password"
                placeholder=""
                className="form-control input-md"
                required=""
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4 col-xs-offset-4 col-sm-2 col-sm-offset-5 col-md-2 col-md-offset-5">
              <button id="Check" name="Check" className="btn menu-button" type="submit">
                Check
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ChooseQuiz;
