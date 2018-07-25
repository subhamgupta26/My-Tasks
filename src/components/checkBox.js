//Comment.js
import React, { Component } from 'react';
import style from '../style';
class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = { _id: this.props.id, isChecked: this.props.isChecked, text: this.props.text };
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.deleteCB = this.deleteCB.bind(this);
    this.updateCB = this.updateCB.bind(this);
   }
    toggleCheckboxChange(e) {
      this.setState({ isChecked: !this.state.isChecked });
      }
      handleTextChange(e) {
      this.setState({ text: e.target.value });
      }
      deleteCB(){
        this.props.onDeleteCB(this.state);
      }
      updateCB(){
        this.props.onUpdateCB(this.state);
      }
 render() {
 return (
 <div style={ style.comment }>
 <input
 type='checkbox'
 checked={this.state.isChecked}
 onChange={this.toggleCheckboxChange}
  />
 <input
 type='text'
 placeholder='Say something…'
 style={ style.commentFormText}
 value={ this.state.text }
 onChange={ this.handleTextChange } />
 <h3>
  <i style={{float:'right'}} className="fa fa-times" onClick={ this.deleteCB }></i>
 <i style={{float:'right'}} className="fa fa-pencil-square-o" onClick={ this.updateCB }></i></h3>
 </div>
 )
 }
}
export default CheckBox;