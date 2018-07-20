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
 handleTaskSubmit=(task)=> {
    console.log('task',task);
    let tasks = this.state.data;
    task.id = Date.now();
    let newTasks = tasks.concat([task]);
    console.log('newTasks',newTasks);
    this.setState({ data: newTasks });
    this.props.onCheckBoxSubmit(newTasks);
   }
 render() {
 return (
 <div style={ style.commentBox }>
 <h2>Comments:</h2>
 <CheckBoxList data={ this.state.data }/>
 <CheckBoxForm onTaskSubmit={ this.handleTaskSubmit }/>
 </div>
 )
 }
}
export default AddCheckBox;