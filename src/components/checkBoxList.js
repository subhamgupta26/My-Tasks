import React, { Component } from 'react';
import CheckBox from './checkBox';
import style from '../style';
class CheckBoxList extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.task;
        this.deleteCB = this.deleteCB.bind(this);
        this.updateCB = this.updateCB.bind(this);

        }  
deleteCB=(task)=>{
    for( var i = 0; i < this.state.checkboxes.length-1; i++){ 
        if ( this.state.checkboxes[i]._id === task._id) {
          this.state.checkboxes.splice(i, 1); 
        }
     }  
     console.log('state',this.state);
     this.props.onCBChange(this.state);
}
updateCB=(task)=>{
    for( var i = 0; i < this.state.checkboxes.length-1; i++){ 
        if ( this.state.checkboxes[i]._id == task._id) {
          this.state.checkboxes[i]=task;
        }
     }  
     this.props.onCBChange(this.state);
}

deleteTask=()=>{
    console.log('task',this.state);
    this.props.onTaskChange(this.state);
}
 render() {
 let taskNodes = this.props.data.map(task => {
     console.log('inside list',task);
 return (
  
    
 <CheckBox id={task._id} isChecked={ task.isChecked } text={ task.text } onDeleteCB={this.deleteCB} onUpdateCB={this.updateCB}> 

 </CheckBox>

 )
 })
 return (
 <div style={ style.commentList }>
 <span><i style={{float:'right'}} className="fa fa-times" onClick={ this.deleteTask }></i></span>
 { taskNodes }
 </div>
 )
 }
}
export default CheckBoxList;