import React from 'react';
import teamService from "../../providers/team-service";

export class ScoreEnd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: [],
            lastPlaced: null
        };
    }

    componentDidMount() {
        this.getTeams();
    }


    getTeams() {
        const response = teamService.getTeams(this.props.quizId);
        response.then(response => {
            return response.result.json();
        })
            .then(data => {
                data.sort(function (a, b) {
                    return b.round_points - a.round_points;
                });
                this.setState({
                    team: data
                })
                this.renderLastPlaced();
            });
    }

    renderLastPlaced() {
        const lastPlaced = [];
        for (let i = 3; i < this.state.team.length; i++) {
            lastPlaced.push(<div>
                {this.state.team[i] ?
                    <h5>{i + 1}<b>{this.state.team[i].team_name}</b> Score: <b>{Math.round(this.state.team[i].round_points)}</b>
                    </h5> : null}
            </div>);
        }
        this.setState({
            lastPlaced: lastPlaced
        });
    }


    render() {
        return (
            <div>
                {this.state.team ?
                    <div>
                        {this.state.team[0] ?
                            <h1>Winner: <b>{this.state.team[0].team_name}</b> Score: <b>{Math.round(this.state.team[0].round_points)}</b>
                            </h1> : null}
                        {this.state.team[1] ?
                            <h2>Second: <b>{this.state.team[1].team_name}</b> Score: <b>{Math.round(this.state.team[1].round_points)}</b>
                            </h2> : null}
                        {this.state.team[2] ?
                            <h3>Third: <b>{this.state.team[2].team_name}</b> Score: <b>{Math.round(this.state.team[2].round_points)}</b>
                            </h3> : null}
                        {this.state.team[3] ?
                            <h4>Fourth: <b>{this.state.team[3].team_name}</b> Score: <b>{Math.round(this.state.team[3].round_points)}</b>
                            </h4> : null}</div> : null}
                {this.state.lastPlaced}
            </div>
        );
    }
}