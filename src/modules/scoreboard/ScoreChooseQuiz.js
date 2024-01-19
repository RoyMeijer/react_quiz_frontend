import React from 'react';
import quizEventService from "../../providers/quiz-event-service";
import {Redirect} from 'react-router-dom';

export class ScoreChooseQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizId: null,
            roundId: 0,
            quizzes: [],
            redirect: false
        };
        this.chooseQuiz = this.chooseQuiz.bind(this);
        this.handleQuizChange = this.handleQuizChange.bind(this);
    }

    componentDidMount() {
        this.refreshQuizzes();
    }

    chooseQuiz() {
        this.setState({
            redirect: true
        });
        this.props.selectQuiz(this.state.quizId);
    }

    handleQuizChange(event) {
        event.preventDefault();
        this.setState({
            quizId: event.target.value
        });
    }

    refreshQuizzes() {
        let response = quizEventService.getAllQuizEvents();
        response.then(response => {
            return response.result.json();
        })
            .then(data => {
                this.setState({
                    quizzes: data
                });
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/scoreboard/question'/>;
        }
        return (
            <div>
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <div className="col-md-4 col-md-offset-4">
                            <select value={this.state.value} onChange={this.handleQuizChange} id="select" className="form-control">
                                <option> -- selecteer een Quiz --</option>
                                {
                                    this.state.quizzes.map((item, idx) => {
                                        return (<option name="quiz" value={item._id} key={idx}>{item.name}</option>);
                                    })
                                }
                            </select>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col-md-2 col-md-offset-5">
                        <button className="btn menu-button" onClick={this.chooseQuiz}>Choose</button>
                    </div>
                </div>
            </div>
        );
    }
}