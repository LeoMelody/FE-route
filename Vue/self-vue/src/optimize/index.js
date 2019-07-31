/*
 * @Author: leo 
 * @Date: 2019-07-31 16:49:49 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-31 18:02:29
 * 优化 标记静态
 */

 /**
  * 优化方法
  * @param {*} rootAst 根结点的AST
  */
export function optimize(rootAst) {
  
  /**
   * 标记当前节点是否是静态节点
   * @param {*} node 当前节点
   */
  function isStatic(node) {
    if (node.type === 2) return false
    if (node.type === 3) return true
    return (!node.if && !node.for);
  }

  /**
   * 标记节点
   * @param {*} node 
   */
  function markStatic(node) {
    node.static = isStatic(node);
    if (node.type === 1) {
      for (let i = 0, l = node.children.length; i < l; i++) {
        const child = node.children[i];
        markStatic(child);
        if (!child.static) {
          node.static = false;
        }
      }
    }
  }

  /**
   * 标记静态根
   * @param {*} node 
   * 这个方法就是用来标记当前的节点是否是纯粹的静态节点。且不仅仅只有一个文本节点，这种节点我们称其为静态根
   * 这一块理解起来有点绕，可以
   */
  function markStaticRoot(node, isInFor) {
    if (node.type === 1) {
      if (node.static || node.once) {
        node.staticInFor = isInFor;
      }
      // For a node to qualify as a static root, it should have children that
      // are not just static text. Otherwise the cost of hoisting out will
      // outweigh the benefits and it's better off to just always render it fresh.
      if (node.static && node.children.length && !(
        node.children.length === 1 &&
        node.children[0].type === 3
      )) {
        node.staticRoot = true;
        return
      } else {
        node.staticRoot = false;
      }
      if (node.children) {
        for (var i = 0, l = node.children.length; i < l; i++) {
          markStaticRoots(node.children[i], isInFor || !!node.for);
        }
      }
      if (node.ifConditions) {
        for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
          markStaticRoots(node.ifConditions[i$1].block, isInFor);
        }
      }
    }
  }

  markStatic(rootAst);
  markStaticRoots(rootAst, false);
}
