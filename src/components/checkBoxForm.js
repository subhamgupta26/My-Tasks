//CommentForm.js
import React, { Component } from 'react';
import style from '../style';
class CheckBoxForm extends Component {
 constructor(props) {
 super(props);
 this.state = { isChecked: false, text: '' };
 this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
 this.handleTextChange = this.handleTextChange.bind(this);
 this.handleSubmit = this.handleSubmit.bind(this);
 }
 toggleCheckboxChange(e) {
 this.setState({ isChecked: !this.state.isChecked });
 }
 handleTextChange(e) {
 this.setState({ text: e.target.value });
 }
 handleSubmit(e) {
 e.preventDefault();
 console.log(`${this.state.isChecked} said “${this.state.text}”`)
 let isChecked = this.state.isChecked;
 let text = this.state.text.trim();
 if (!text) {
 return;
 }
 this.props.onTaskSubmit({ isChecked: isChecked, text: text });
 this.setState({ isChecked: false, text: '' });
 }
 render() {
 return (
 <div style={ style.commentForm } >
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
 <input
 type='button'
 style={ style.commentFormPost }
 value='Post' onClick={this.handleSubmit}/>
 </div>
 )
 }
}
export default CheckBoxForm;