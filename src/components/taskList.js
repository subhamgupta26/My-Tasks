//CommentList.js
import React, { Component } from 'react';
import Task from './task';
import style from '../style';
import CheckBoxList from './checkBoxList';
class TaskList extends Component {

handleTaskChange=(task)=>{
    console.log('task',task);
    this.props.onTaskChange(task); 
}
handleTaskUpdate=(task)=>{
    this.props.onTaskUpdate(task); 
}

 render() {
 let taskNodes = this.props.data.map(task => {
     console.log('task',task);
     if(task.type==='checkbox'){
        return (
            <div>
            <h3>{task.name}</h3>
        <CheckBoxList data={ task.checkboxes } task={task} onCBChange={this.handleTaskUpdate} onTaskChange={this.handleTaskChange}/>
        </div>
            )

     }
     else{
 return (
 <Task name={ task.name } key={ task['_id'] } id={task._id} description= {task.description} task={task} onTaskChange={this.handleTaskChange} onTaskUpdate={this.handleTaskUpdate} >
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