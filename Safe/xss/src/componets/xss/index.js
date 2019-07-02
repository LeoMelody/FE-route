import React, {Component} from 'react'
import './index.css'

export default class XSS extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  changeSearch(e) {
    console.log(e)
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.value} />
        <button>搜索</button>
        <div>
          您搜索的关键词是：{this.state.value}
        </div>
      </div>
    )
  }
}