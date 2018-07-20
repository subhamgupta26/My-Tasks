import React, { Component } from 'react';
import CheckBox from './checkBox';
import style from '../style';
class CheckBoxList extends Component {
 render() {
 let taskNodes = this.props.data.map(task => {
     console.log('inside list',task);
 return (
 <CheckBox isChecked={ task.isChecked } text={ task.text }>
 { task.text}
 </CheckBox>
 )
 })
 return (
 <div style={ style.commentList }>
 { taskNodes }
 </div>
 )
 }
}
export default CheckBoxList;