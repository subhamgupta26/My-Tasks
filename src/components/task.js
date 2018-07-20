//Comment.js
import React, { Component } from 'react';
import style from '../style';
import marked from 'marked';
class Task extends Component {
 rawMarkup() {
//  let rawMarkup = marked(this.props.children.toString());
//  return { __html: rawMarkup };
 }
 render() {
 return (
 <div style={ style.comment }>
 <h3>{this.props.name}</h3>
<span>{this.props.description}</span>
 </div>
 )
 }
}
export default Task;