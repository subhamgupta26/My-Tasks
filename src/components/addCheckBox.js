import React, { Component } from 'react';
import CheckBoxList from './checkBoxList';
import CheckBoxForm from './checkBoxForm';
import DATA from '../data';
import style from '../style';
class AddCheckBox extends Component {
 constructor(props) {
 super(props);
 this.state = { data: this.props.data };
 }
 handleCommentSubmit=(comment)=> {
    console.log('comment',comment);
    let comments = this.state.data;
    comment.id = Date.now();
    let newComments = comments.concat([comment]);
    console.log('newComments',newComments);
    this.setState({ data: newComments });
    this.props.onCheckBoxSubmit(newComments);
   }
 render() {
 return (
 <div style={ style.commentBox }>
 <h2>Comments:</h2>
 <CheckBoxList data={ this.state.data }/>
 <CheckBoxForm onCommentSubmit={ this.handleCommentSubmit }/>
 </div>
 )
 }
}
export default AddCheckBox;