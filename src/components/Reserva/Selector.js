import React from 'react'
import API_URL from '../../services/config'

export const CustomDropdown = (props) => (
  <div className="form-group">
    <strong>{props.nom}</strong>
    <select
      className="form-control"
      name="{props.nom}"
      onChange={props.onChange}
    >
      <option defaultValue>Select {props.name}</option>
      {props.options.map((item, index) => (
        <option key={index} value={item.id}>
          {item.nom}
        </option>
      ))}
    </select>
  </div>
)

export default class Selector extends React.Component {
  constructor() {
    super()
    this.state = {
      collection: [],
      value: '',
    }
  }
  componentDidMount() {
    fetch(API_URL + '/uni/')
      .then((response) => response.json())
      .then((res) => this.setState({ collection: res }))
  }
  onChange = (event) => {
    console.log(this.state.collection);
    console.log(this.state.collection[event.target.value-1]);
    console.log(event.target.value);
    console.log('id ===' + this.state.value);
    this.setState({ value: event.target.value })
  }
  render() {
    return (
      <div className="container mt-4">
        <h2>Universitat</h2>
        <CustomDropdown
          name={this.state.nom}
          options={this.state.collection}
          onChange={this.onChange}
        />
      </div>
    )
  }
}