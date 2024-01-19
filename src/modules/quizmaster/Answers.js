import React from 'react';
import roundService from '../../providers/quiz-round-service';
import {notify} from 'react-notify-toast';
import {Redirect} from 'react-router-dom';

export class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answerData: [],
            approvedAnswers: [],
            redirect: false,
            current_question: null

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getAnswers();
        this.getQuestion();
    }

    getAnswers() {
        const response = roundService.getAnswers(this.props.quiz._id);
        let currentData = this.state.answerData;
        response.then(response => {
            return response.result.json();
        })
            .then(data => {
                data.team_responses.forEach((teamData) => {
                    if (teamData.answer != null && teamData.answer.trim() !== "") {
                        currentData.push({
                            team: teamData.team_name,
                            answer: teamData.answer,
                            team_id: teamData.team_id
                        });
                    }
                });
                this.setState({currentData});
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        const response = roundService.checkAnswer(this.props.quiz._id, this.state.approvedAnswers);
        response.then((response, err) => {
            return response.result.json();
        }).then((data) => {
            this.props.upAnswerCount();
            notify.show("NEXT");
            this.props.connection.emit('HandleAnswers', {answers: this.state.approvedAnswers});
            this.setState({redirect: true});
        }).catch((err) => {
            console.log(err);
        });
    }

    getQuestion() {
        const response = roundService.getRoundQuestion(this.props.quiz._id);
        response.then((response, err) => {
            return response.result.json();
        }).then((data) => {
            console.log(data);
            this.setState({current_question: data});
        }).catch((err) => {
            console.log(err);
        });
    }

    handleChange(event) {
        if (event.target.checked) {
            let correctAnswers = this.state.approvedAnswers;
            correctAnswers.push(event.target.value);
            this.setState({approvedAnswers: correctAnswers});
        }
        if (!event.target.checked) {
            let correctAnswers = this.state.approvedAnswers;
            let index = correctAnswers.indexOf(event.target.value);
            if (index > -1) {
                correctAnswers.splice(index, 1);
            }
            this.setState({approvedAnswers: correctAnswers});
        }
    }

    render() {
        if (this.state.redirect) {
            return this.props.questionProgress > 11 ? <Redirect to='/quizmaster/end'/> :
                <Redirect to='/quizmaster/questions'/>;
        }
        return (
            <div>
                {this.state.current_question ? <div><p><b>Category:</b> {this.state.current_question.category}</p>
                    <p><b>Question:</b> {this.state.current_question.question}</p>
                <p><b>Answer:</b> {this.state.current_question.answer}</p></div> : null}
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.answerData.map((item, idx) => {
                            return (
                                <label>Accept/Deny<input onChange={this.handleChange} value={item.team_id}
                                                         key={item.answer} checked={item.checked}
                                                         type="checkbox"/> {item.answer}</label>);
                        })
                    }
                    <button id="singlebutton" name="singlebutton"
                            className="btn menu-button">Next question
                    </button>
                </form>
            </div>
        );
    }
}