import React from 'react';
import roundService from "../../providers/quiz-round-service";
import teamService from "../../providers/team-service";
import {Redirect} from "react-router-dom";

export class ScoreQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roundNumber: 0,
            questionProgress: 0,
            question: "",
            category: "",
            answer: "",
            teams: [],
            team_answers: [],
            answerData: [],
            redirect: false
        };
    }

    componentDidMount() {
        this.getQuestion();
        this.getTeams();
        this.props.connection.on('RefreshQuestion', () => {
            this.getQuestion();
        });
        // when team gives an answer
        this.props.connection.on('RefreshTeamAnswers', (data) => {
            this.updateTeamAnswer(data);
        });
        this.props.connection.on('QuestionClosed', (data) => {
            this.setState({
                roundNumber: data.round_id,
                questionProgress: data.questionProgress
            });
            this.getTeams();
            this.getAnswers();
        });
        // when quizmaster approves questions
        this.props.connection.on('RefreshAnswers', (data) => {
            this.getTeams();
            this.setState({
                team_answers: []
            });
        });
        this.props.connection.on('EndQuiz', () => {
            this.setState({
                redirect: true
            });
        });
    }

    getTeams() {
        const response = teamService.getTeams(this.props.quizId);
        response.then(response => {
            return response.result.json();
        })
        .then(data => {
            this.setState({
                teams: data
            });
        });
    }

    getQuestion() {
        // get current question: parameters: quizid, round,
        const response = roundService.getRoundQuestion(this.props.quizId);
        response.then(response => {
            return response.result.json();
        })
            .then(data => {
                console.log(data.question);
                if (data){
                    this.setState({
                        question: data.question,
                        category: data.category,
                        answer: data.answer
                    });
                }
            });
    }

    updateTeamAnswer(data) {
        let teams = [];
        this.state.teams.forEach((team) => {
            if (team._id == data.team_id) {
                team.answered = true;
            }
            teams.push(team);
        });
        this.setState({
            teams: teams
        });
    }

    getAnswers() {
        const response = roundService.getAnswers(this.props.quizId);
        response.then(response => {
            return response.result.json();
        })
            .then(data => {
                this.setState({team_answers: data.team_responses});
            });
    }

    setClass(boolean) {
        return boolean ? "correct" : "incorrect";
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/scoreboard/end'/>;
        }
        return (
            <div>
                <p>Round number: {this.state.roundNumber + 1} </p>
                <p>Question number: {this.state.questionProgress + 1}</p>
                <p>Current Question: {this.state.question}</p>
                {this.state.categories ?
                    <div>
                        <b>Categories: </b>
                        {this.state.categories.map((item, idx) => {
                            return (<p>{item}</p>);
                        })}
                    </div> : null}

                <p><b>Teams: </b></p>
                {this.state.teams ?
                    <div>
                        {this.state.teams.map((team, idx) => {
                            return (<div className={this.setClass(team.correct)}>
                                <table id="team-table"><tr>{team.hasOwnProperty('answered') && team.answered ?
                                    <th>{team.team_name} has answered</th> : <th>Team name </th>}<th>Correct answers </th><th>Round Points </th></tr>
                                    <tr><td>{team.team_name}</td><td>{team.correct_answers}</td><td>{team.round_points}</td></tr></table>
                            </div>);
                        })}
                    </div> : null}
                <p><b>Answers:</b></p>
                {
                    this.state.team_answers.map((item, idx) => {
                        return (
                            <div>
                                {item.answer != null && item.answer.trim() !== "" ? <table id="team-table"><tr><th>Team name</th><th>Answer</th></tr><tr><td>{item.team_name}</td><td>{item.answer}</td></tr></table> : null}
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}