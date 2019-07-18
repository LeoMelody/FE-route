import $$observable from 'symbol-observable'

export default function createStore(reducer, preloadState, enhancer) {
  // 错误处理 这个具体干嘛的我也不清楚。。。
  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
        'createStore(). This is not supported. Instead, compose them ' +
        'together to a single function'
    )
  }

}