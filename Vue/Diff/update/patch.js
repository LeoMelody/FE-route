/*
 * @Author: leo 
 * @Date: 2019-08-07 18:15:39 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-07 18:40:15
 * diff 更新操作
 */
function patch (oldVnode, vnode, parentElm) {
  if (!oldVnode) {
      addVnodes(parentElm, null, vnode, 0, vnode.length - 1);
  } else if (!vnode) {
      removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
  } else {
      if (sameVnode(oldVNode, vnode)) {
          patchVnode(oldVNode, vnode);
      } else {
          removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
          addVnodes(parentElm, null, vnode, 0, vnode.length - 1);
      }
  }
}

/**
 * 相同的vnode
 */
function sameVnode(a, b) {
    return (
        a.key === b.key &&
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        (!!a.data) === (!!b.data) &&
        sameInputType(a, b)
    )
}