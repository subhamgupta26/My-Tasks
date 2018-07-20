//CommentList.js
import React, { Component } from 'react';
import Task from './task';
import style from '../style';
import CheckBoxList from './checkBoxList';
class TaskList extends Component {
 render() {
 let taskNodes = this.props.data.map(task => {
     console.log('task',task);
     if(task.type==='checkbox'){
        return (
            <div>
            <h3>{task.name}</h3>
        <CheckBoxList data={ task.checkboxes }/>
        </div>
            )

     }
     else{
 return (
 <Task name={ task.name } key={ task['_id'] } description= {task.description}>
 { task.text}
 </Task>
 )
}
 })
 return (
 <div style={ style.commentList }>
 { taskNodes }
 </div>
 )
 }
}
export default TaskList;