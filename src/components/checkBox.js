//Comment.js
import React, { Component } from 'react';
import style from '../style';
class CheckBox extends Component {
 render() {
 return (
 <div style={ style.comment }>
  <h3>{this.props.name} </h3>
 <input
 type='checkbox'
 checked={this.props.isChecked}
//  onChange={this.toggleCheckboxChange}
  />
<span>{this.props.text}</span>
 </div>
 )
 }
}
export default CheckBox;