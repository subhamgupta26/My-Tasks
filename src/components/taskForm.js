//CommentForm.js
import React, { Component } from 'react';
import style from '../style';
import AddCheckBox from './addCheckBox';
class TaskForm extends Component {
 constructor(props) {
 super(props);
 this.state = { name: '', description: '', type: 'text' ,checkboxes : []};
 this.handleAuthorChange = this.handleAuthorChange.bind(this);
 this.handleTextChange = this.handleTextChange.bind(this);
 this.handleTypeChange = this.handleTypeChange.bind(this);
 this.handleSubmit = this.handleSubmit.bind(this);
 }
 handleAuthorChange(e) {
 this.setState({ name: e.target.value });
 }
 handleTextChange(e) {
 this.setState({ description: e.target.value });
 }
 handleTypeChange(event) {
    this.setState({type: event.target.value});
  }
 handleSubmit(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let description = this.state.description.trim();
    let type = this.state.type.trim();
    console.log('checkboxes',this.state.checkboxes);
    let checkboxes = this.state.checkboxes;
    // if (!name) {
    // return;
    // }
    this.props.onTaskSubmit({ name: name, description: description , type: type, checkboxes : checkboxes});
    this.setState({ name: '', description: '' ,checkboxes: [], type:'text'});
 }
 checkBoxSubmit = (checkBoxArray) =>{
     console.log('checkBoxArray',checkBoxArray);
    this.setState({checkboxes: checkBoxArray});
 }
 render() {
    let content = this.state.type ==='checkbox' ?
    (
        <div>
            <AddCheckBox data= {this.state.checkboxes}onCheckBoxSubmit={this.checkBoxSubmit} />
        </div>
    ) :
    (
        <input
        type='text'
        placeholder='Say something…'
        style={ style.commentFormText}
        value={ this.state.description }
        onChange={ this.handleTextChange } />
    );
 return (
 <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
 <input
 type='text'
 placeholder='Take a note...'
 style={ style.commentFormAuthor}
 value={ this.state.name }
 onChange={ this.handleAuthorChange } />
 <select value={this.state.type} onChange={this.handleTypeChange}>
  <option selected value="text">Plain text</option>
  <option value="checkbox">Check Box</option>
</select>
{content}
 <input
 type='submit'
 style={ style.commentFormPost }
 value='Post' />
 </form>
 )
 }
}
export default TaskForm;