import React from 'react';
import { Redirect } from 'react-router-dom';

export class CreateTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      teamName: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.chooseTeam = this.chooseTeam.bind(this);
  }

  chooseTeam(event) {
    event.preventDefault();
    this.props.chooseTeam(this.state.teamName);
    this.setState({ redirect: true });
  }

  handleInputChange(event) {
    this.setState({
      teamName: event.target.value
    });
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/teamquiz/choosequiz' />;
    }
    return (
      <div className="container">
        <form onSubmit={this.chooseTeam} className="form-horizontal">
          <h1>Create a team</h1>
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-sm-4 col-md-4 col-md-offset-4">
              <input
                id="textinput"
                onChange={this.handleInputChange}
                name="teamName"
                type="text"
                placeholder="Team Name"
                className="form-control input-md"
                required=""
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6 col-xs-offset-3 col-sm-4 col-md-2 col-md-offset-5">
              <button className="btn menu-button" type="submit">Next</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
