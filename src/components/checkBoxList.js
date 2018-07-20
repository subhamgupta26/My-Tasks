import React, { Component } from 'react';
import CheckBox from './checkBox';
import style from '../style';
class CheckBoxList extends Component {
 render() {
 let commentNodes = this.props.data.map(comment => {
     console.log('inside list',comment);
 return (
 <CheckBox isChecked={ comment.isChecked } text={ comment.text }>
 { comment.text}
 </CheckBox>
 )
 })
 return (
 <div style={ style.commentList }>
 { commentNodes }
 </div>
 )
 }
}
export default CheckBoxList;