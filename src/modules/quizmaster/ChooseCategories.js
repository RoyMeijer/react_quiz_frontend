import React from 'react';
import quizEventService from '../../providers/quiz-event-service';
import Service from '../../providers/quiz-round-service';
import {Category} from './Category';
import {Redirect} from 'react-router-dom';

export class Categories extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  category_name: [],
	  chosen_category: [],
	  counter: 0,
	  redirect: false
	};
	this.handleCategoryChange = this.handleCategoryChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
	this.refreshCategories();
  }

  handleCategoryChange(event) {
	(event.target.checked) ?
	  this.setState({counter: ++this.state.counter}) :
	  this.setState({counter: --this.state.counter});
	// this.props.handleCategoryChange(event);
  }

  refreshCategories() {
	let response = quizEventService.getAllCategoryEvents();
	response.then(response => {
	  return response.result.json();
	})
	  .then(data => {
		// let theItems =
		this.setState({category_name: data});
	  });
	//TODO: zet data in de state, bij de render
  }

  handleSubmit(event) {
	event.preventDefault();
	const categoriesNames = [];
	for (let i = 0; i < this.state.category_name.length; i++) {
	  if (event.target[i].checked) {
		categoriesNames.push(event.target[i].value);
	  }
	}
	Service.saveCategories(this.props.quiz._id, categoriesNames).then((response) => {
	  return response.result.json();
	}).then((data) => {
	  this.props.setQuizRound(data.roundId);
	  this.setState({redirect: true});
	}).catch((err) => {
	  console.log(err);
	});
  }

  render() {
	if (this.state.redirect) {
	  return <Redirect to='/quizmaster/questions'/>;
	}

	return (
		<div className="container">
			<h1>Select Multiple</h1>
			<div className="col-md-8 col-md-offset-2">
				<form onSubmit={this.handleSubmit}>
				{
					this.state.category_name.map((item, idx) => {
					return (<div className="col-md-6 col-md-offset-4 categorie"><Category counter={this.state.counter} handleCheckbox={this.handleCategoryChange}
										categoryItem={item.name}
										categoryKey={item._id} /><br></br></div>);
					})
				}
				<div className="col-md-4 col-md-offset-4">
				<button type="submit" id="next" name="next" className="btn menu-button">select these categories</button>
				</div>
				</form>
			</div>
		</div>
	);
  }
}