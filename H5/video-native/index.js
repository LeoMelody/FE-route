/*
 * @Author: leo 
 * @Date: 2018-07-23 09:52:46 
 * @Last Modified by: leo
 * @Last Modified time: 2018-07-23 11:48:59
 * @description 原生媒体能力测试 
 */
+(function(global, doc) {
  const video = doc.querySelector('#video')
  const btn = doc.querySelector('#btn')
  const canvas = doc.querySelector('#canvas')
  const ctx = canvas.getContext('2d')
  btn.addEventListener('click', ()=>{
    // setInterval(() => {
    //   ctx.drawImage(video, 0, 0, 375, 320)
    // }, 10)
      ctx.drawImage(video, 0, 0, 375, 320)
  }, false)
  if (global.navigator && (global.navigator.mediaDevices || global.navigator.webkitGetUserMedia)) {
    getUserMedia({video: {width: 375, height: 320}}, success, err);
  } else {
    console.log('err')
  }

  // common fun
  function getUserMedia(constraints, success, err) {
    if(global.navigator && global.navigator.mediaDevices.getUserMedia) {
      global.navigator.mediaDevices.getUserMedia(constraints).then(success).catch(err)
    } else if(global.navigator && global.navigator.webkitGetUserMedia) {
      global.navigator.webkitGetUserMedia.getUserMedia(constraints).then(success).catch(err)
    } else  {
      console.log('参数错误了')
    }
  }

  function success(stream) {
    console.log('stream', stream)
    // let Url = global.URL || global.webkitURL
    video.srcObject = stream
    video.play() // 播放
  }

  function err(err) {
    alert('访问失败')
  }
})(window, document)