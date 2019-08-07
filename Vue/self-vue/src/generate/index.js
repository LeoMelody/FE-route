/*
 * @Author: leo 
 * @Date: 2019-07-31 19:23:15 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-07 10:35:10
 * 生成render func
 */

 // 首先说明，此处的_c等辅助函数暂时不需要考虑

 /**
  * 生成函数的入口函数
  */
export function generate(rootAst) {
  const code = rootAst ? genElement(rootAst) : '_c("div")'
  return {
    // 这里可以看到
    render: `with(this) {return ${code}}`
  }
}

function genElement(rootAst) {

}


