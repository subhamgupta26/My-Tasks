//Comment.js
import React, { Component } from 'react';
import style from '../style';
import marked from 'marked';
class Task extends Component {
    constructor(props) {
        super(props);
        this.state = { _id:this.props.id, name: this.props.name, description: this.props.description, type: 'text' ,checkboxes : []};
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        }
        handleAuthorChange(e) {
            this.setState({ name: e.target.value });
            }
            handleTextChange(e) {
            this.setState({ description: e.target.value });
            }
 deleteTask=()=>{
    this.props.onTaskChange(this.props.task); 
 }

 updateTask=()=>{
     console.log(this.state);
    this.props.onTaskUpdate(this.state); 
 }
 render() {
 return (
 <div style={ style.comment }>
 <div>
 <span>Name:</span>
 <input
 type='text'
 placeholder='Take a note...'
 style={ style.commentFormAuthor}
 value={ this.state.name }
 onChange={ this.handleAuthorChange } />
 <h3>
 <i style={{float:'right'}} className="fa fa-times" onClick={ this.deleteTask }></i>
 <i style={{float:'right'}} className="fa fa-pencil-square-o" onClick={ this.updateTask }></i></h3></div>
<span>Description:</span>
<input
        type='text'
        placeholder='Say something…'
        style={ style.commentFormText}
        value={ this.state.description }
        onChange={ this.handleTextChange } />
 </div>
 )
 }
}
export default Task;