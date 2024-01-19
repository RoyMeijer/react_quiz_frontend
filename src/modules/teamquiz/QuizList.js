import React, { Component } from 'react';

class QuizList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz_name: ''
    };
  }

  handleQuizChange = (event) => {
    const quizName = event.target.value;
    this.setState({ quiz_name: quizName });
    this.props.handleQuizChange(quizName);
  };

  render() {
    return (
      <div className="form-group">
        <label className="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-0 col-md-4 control-label" htmlFor="selectmultiple">
          Select Multiple
        </label>
        <div className="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-0 col-md-4">
          <select
            id="selectmultiple"
            value={this.state.quiz_name}
            onChange={this.handleQuizChange}
            name="selectmultiple"
            className="form-control"
          >
            <option> -- select an option -- </option>
            {this.props.items}
          </select>
        </div>
      </div>
    );
  }
}

export default QuizList;
