import {$} from './libs/document.js';
import {alert} from './libs/alert.js'

let btn = $.getEle('#btn')

btn.addEventListener('click', (e) => {
  new alert('哈哈哈')
})