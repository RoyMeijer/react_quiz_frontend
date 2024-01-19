import React from 'react';

export class TeamRow extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	};
	this.handleQuizChange = this.handleQuizChange.bind(this);
  }

  handleQuizChange(event) {
	this.setState({quiz_name: event.target.value});
	this.props.handleQuizChange(event);
  }

  render() {
	return (
	  <tr>
		<td>
		  {this.props.team.team_name}
		</td>
		<td>
		  <div onChange={(event) => this.props.changeTeamStatus(event)}>
			<input type="radio" name={this.props.team._id} value="deny"/> Deny
			<input type="radio" name={this.props.team._id} value="accept"/> Accept
		  </div>
		</td>
	  </tr>
	);
  }
}
