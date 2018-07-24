//Comment.js
import React, { Component } from 'react';
import style from '../style';
import marked from 'marked';
class Task extends Component {
 rawMarkup() {
//  let rawMarkup = marked(this.props.children.toString());
//  return { __html: rawMarkup };
 }
 deleteTask=()=>{
    this.props.onTaskChange(this.props.task); 
 }
 render() {
 return (
 <div style={ style.comment }>
 <div>
 <h3>{this.props.name}
 <i style={{float:'right'}} className="fa fa-times" onClick={ this.deleteTask }></i></h3></div>
<span>{this.props.description}</span>
 </div>
 )
 }
}
export default Task;