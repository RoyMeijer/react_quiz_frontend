import React, { Component } from 'react';
import roundService from '../../providers/quiz-round-service';

class AnswerQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      category: '',
      answer: ''
    };
  }

  componentDidMount() {
    this.getQuestion();
    this.props.connection.on('RefreshQuestion', this.getQuestion);
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await roundService.saveRoundAnswer(
        this.props.quizId,
        this.props.teamId,
        this.state.answer
      );

      if (response.result.ok) {
        this.props.connection.emit('SendAnswer', { team_id: this.props.teamId });
      } else {
        console.error('Failed to save answer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleAnswerChange = (event) => {
    this.setState({ answer: event.target.value });
  };

  getQuestion = async () => {
    try {
      const response = await roundService.getRoundQuestion(this.props.quizId);

      if (response.result.ok) {
        const data = await response.result.json();
        this.setState({
          question: data.question,
          category: data.category
        });
      } else {
        console.error('Failed to get question');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    return (
      <div className="container">
        <p>{this.state.question}</p>
        <form onSubmit={this.handleSubmit}>
          <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
            <input
              onChange={this.handleAnswerChange}
              id="textinput"
              name="textinput"
              type="text"
              placeholder="answer"
              className="form-control input-md"
            />
          </div>
          <div className="col-xs-6 col-xs-offset-3 col-sm-2 col-sm-offset-5 col-md-2">
            <button
              id="singlebutton"
              name="singlebutton"
              className="btn menu-button"
            >
              answer
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AnswerQuestion;
