/* eslint-env es6 */
/* eslint-disable */
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 全屏canvas
canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

function init() {
  ctx.beginPath()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}