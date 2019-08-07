/*
 * @Author: leo 
 * @Date: 2019-07-31 19:23:15 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-07 15:40:37
 * 生成render func
 */

 // 首先说明，此处的_c等辅助函数暂时不需要考虑

 /**
  * 生成函数的入口函数
  */
function generate(rootAst) {
  const code = rootAst ? genElement(rootAst) : '_c("div")'
  return {
    // 这里可以看到
    render: `with(this) {return ${code}}`
  }
}

/**
 * 生成element
 * @param {*} ast 当前元素的ast树
 */
function genElement(ast) {
  // 先处理if for 这些情况
  if (ast.if && !ast.ifProcessed) {
    // 有if且未被处理
    return genIf(ast)
  }

  if (ast.for && !ast.forProcessed) {
    return genFor(ast)
  }

  // 处理children
  const children = genChildren(ast)
  let code
  // 这段代码摘自 小册
  code = `_c('${ast.tag}',{
    staticClass: ${ast.attrsMap && ast.attrsMap[':class']},
    class: ${ast.attrsMap && ast.attrsMap['class']}
  }${
    children ? `,${children}` : ''
  })`
  return code
}

/**
 * 解析children
 */
function genChildren(ast) {
  const children = ast.children

  if (children && children.length) {
    return `${children.map(genNode).join(',')}`
  }
}

function genText(ast) {
  return `_v(${ast.expression ? ast.expression.expression : ''})`;
}

function genNode(ast) {
  if (ast.type === 1) {
    return genElement(ast)
  } else {
    return genText(ast)
  }
}

function genIf(ast) {
  ast.ifProcessed = true
  // 如果空的的话返回一个_e() 方法
  if (!ast.ifConditions.length) {
    return '_e()'
  }
  // 这里就是一个if判断
  return `(${ast.ifConditions[0].exp})?${genElement(ast.ifConditions[0].block)}: _e()`
}

function genFor(ast) {
  ast.forProcessed = true

  const exp = ast.for
  const alias = ast.alias
  const iterator1 = ast.iterator1 ? `,${ast.iterator1}` : '';
  const iterator2 = ast.iterator2 ? `,${ast.iterator2}` : '';

  return `_l((${exp}),` +
      `function(${alias}${iterator1}${iterator2}){` +
      `return ${genElement(ast)}` +
  '})';
}