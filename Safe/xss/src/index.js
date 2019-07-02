import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

function getParams() {
  let q = {}
  window.location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v)
  return q
}

function change() {}


ReactDOM.render(<div>
  <input type="text" onChange={change} value={getParams().keyword || ''}/>
  <button>搜索</button>
  <div>
    您搜索的关键词是：<div dangerouslySetInnerHTML={{__html:decodeURIComponent(getParams().keyword)}}></div>
  </div>
</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
