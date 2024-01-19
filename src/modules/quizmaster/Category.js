import React from 'react';

export class Category extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  checked: false
	};
	this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleCategoryChange(event){
	if (this.props.counter < 3 || this.state.checked) {
	  this.props.handleCheckbox(event);
	  this.setState({checked: !this.state.checked});
	}
  }

  render() {
	return (<label><input onChange={this.handleCategoryChange} value={this.props.categoryItem} checked={this.state.checked} type="checkbox"
						  key={this.props.categoryKey}/>{this.props.categoryItem}</label>);
  }
}