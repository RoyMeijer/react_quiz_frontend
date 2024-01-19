import React from 'react';


export class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: ''
        };
        this.handleQuestions = this.handleQuestions.bind(this);
    }

    handleQuestions(event){
        this.setState({question: event.target.value});
        this.props.handleQuestions(event);
    }

    render(){
        return (
            <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="selectmultiple">Select Multiple</label>
                <div className="col-md-4">
                    <select id="selectmultiple" value={this.state.question} onChange={this.handleQuestions} name="selectmultiple" className="form-control">
                        {this.props.items}
                    </select>
                </div>
            </div>
        )
    }
}