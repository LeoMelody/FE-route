/*
 * @Author: leo
 * @Date: 2019-07-30 11:51:28
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-31 16:48:49
 */

// 🌟这里要使用outerHTML来获取当前模板的HTML字符串
// let template = document.querySelector("#app").outerHTML
// template = template.trim() // 先去除收尾空格
/**
 * 解析函数入口
 * @param {*} template 模板
 * @param {*} options 其他配置
 */
export function parse(template, options) {
  // 正则 这一块感兴趣的同学可以好好研究一下，我是看的头疼。。。。

  // unicodeReg 用来匹配tag name
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
  // 下面正则用于匹配属性和tag
  // 匹配属性
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
  // 匹配动态属性
  // 名称，不包含冒号 (:) 的 XML 名称
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + unicodeRegExp.source + "]*" // 方便下面匹配开头和结尾的标签名称做的一个标签名封装
  var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")" // 方便下面匹配开头和结尾的标签名称做的一个标签名封装
  var startTagOpen = new RegExp("^<" + qnameCapture) // 匹配 < 开头的，表示标签开头
  var startTagClose = /^\s*(\/?)>/ // 匹配 /> 和 >
  var endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>") // 匹配 </ 开头 > 结尾 中间无>的，表示标签的结尾
  var doctype = /^<!DOCTYPE [^>]+>/i
  // 匹配注释，如果是注释，那么无需入栈处理
  var comment = /^<!\--/
  var conditionalComment = /^<!\[/

  // text 匹配
  const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
  const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g

  // for 正则
  const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/ // 匹配  char in char这种形式
  // 匹配 item,index这种形式,因为这个是 ?$ 属于匹配结尾
  const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/ // 匹配 匹配 字符A（除了}],）,  字符B(除了}],)
  const stripParensRE = /^\(|\)$/g

  /**
   *
   * @param {*} html
   * @param {*} options 暂时先不用考虑
   */
  function parseHTML(html, options) {
    // 定义tag栈
    var stack = []
    var index = 0
    let root, currentParent
    var lastTag // 记录上一个标签
    // 这里为了方便理解，就不写那么多的情况了

    // 通过用while循环解析template，通过正则匹配 标签开始，标签结束，文本并对其进行不同的处理
    while (html) {
      let textEnd = html.indexOf("<")
      // 处理标签
      if (textEnd === 0) {
        // 如果html有匹配到结束标签
        const endTagMatch = html.match(endTag)
        // 当前是结束标签时
        if (endTagMatch) {
          // 调整指针位置
          advance(endTagMatch[0].length)
          parseEndTag(endTagMatch[1])
          continue
        }

        // 当前是开始标签时
        const startTagMatch = parseStartTag()
        if (startTagMatch) {
          // 处理开始标签
          handleStartTag(startTagMatch)
          continue
        }
      }

      /**
       * 处理文本节点
       */
      let text, rest, next
      if (textEnd >= 0) {
        // 比如html是 <div>123</div> 则此时在完成前面<div>的解析工作后，会匹配到
        // 后面的 </div>的 < ，则通过html.slice方法可以成功截取 123这个文本内容
        rest = html.slice(textEnd)
        // 均不满足结束标签，开始标签，注释标签时，进行纯文本处理。之所以用while语句时为了防止有多个<<<
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          /**
           * 处理 <div><</div> 这种情况 < 也是一个纯文本，应该做展示
           */
          next = rest.indexOf("<", 1)
          // 直到木有< 了，就直接解析到两个标签之间的text节点内容了
          if (next < 0) break
          textEnd += next
          rest = html.slice(textEnd)
        }
        // 如果是上面那种情况，则此处可以截取到text
        text = html.substring(0, textEnd)
      }

      /**
       * 未匹配到 < 则说明后面已经木有html了
       */
      if (textEnd < 0) {
        text = html
      }

      if (text) {
        // 继续移动指针
        advance(text.length)
        // 解析文本
        // 含表达式文本
        let expression
        if ((expression = parseText(text))) {
          currentParent.children.push({
            type: 2,
            text,
            expression
          })
        } else {
          // 纯文本
          currentParent.children.push({
            type: 3,
            text
          })
        }
      }
    }

    /**
     * 解析标签头
     * 生成tagName，通过从标签头开始 < 到其结束 > 或者 /> 过程中匹配属性并将属性放入到attrs中
     * 匹配到 /> 时，无需将当前tag push 到 stack中
     */
    function parseStartTag() {
      // 这里可以参考PPT来理解
      // 匹配标签开头
      const start = html.match(startTagOpen)
      if (start) {
        // 此时可以看作生成了一个AST的节点
        const match = {
          tagName: start[1],
          // 此时还没有收集到属性
          attrs: [],
          // 记录当前指针位置
          start: index
        }
        // 移动指针并截取html字符串
        advance(start[0].length)
        // 开始解析属性
        let end, attr
        // 当前标签不是 />或 > 且有属性（动态，静态）则收集其属性
        while (
          !(end = html.match(startTagClose)) &&
          (attr = html.match(attribute))
        ) {
          // 收集属性的操作
          attr.start = index
          // 移动指针
          advance(attr[0].length)
          attr.end = index
          match.attrs.push(attr)
        }
        // 当前的标签属性收集完毕，返回match即可
        if (end) {
          // 这个是用来判断当前的标签是否是直接关闭的
          match.unarySlash = end[1]
          advance(end[0].length)
          match.end = index
          return match
        }
      }
    }

    /**
     * 处理开始标签
     * 这一步主要是处理match到的属性
     * @param {*} match
     */
    function handleStartTag(match, options = {}) {
      const tagName = match.tagName
      const unarySlash = match.unarySlash

      const unary = !!unarySlash

      const l = match.attrs.length
      const attrs = new Array(l)
      // 转换一个正常的attrs
      for (let i = 0; i < l; i++) {
        const args = match.attrs[i]
        const value = args[3] || args[4] || args[5] || ""
        attrs[i] = {
          name: args[1],
          // 这里就简单处理
          value: value,
          start: args.start,
          end: args.end
        }
      }
      const element = {
        type: 1,
        tag: tagName,
        lowerCasedTag: tagName.toLowerCase(),
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      }
      // 此处处理 v-for 和 v-if ，源码中会有更加严谨的判断
      processFor(element)
      processIf(element)
      // 匹配到的第一个标签作为root
      if (!root) {
        root = element
      }
      if (currentParent) {
        currentParent.children.push(element)
      }
      // 非直接闭合的标签才会在stack中推入
      if (!unary) {
        stack.push(element)
        currentParent = element
        lastTag = tagName
      }
    }

    /**
     * 解析标签尾
     * 这一步主要是弹栈操作以及将当前的parent节点置为空
     */
    function parseEndTag(tagName) {
      // 定位位置
      let pos, lowerCasedTagName
      if (tagName) {
        lowerCasedTagName = tagName.toLowerCase()
        // 这里正常情况下都是栈顶对应的当前的tag，不过有的同学可能会忘记写闭合标签，就做一个错误的处理
        for (pos = stack.length - 1; pos >= 0; pos--) {
          if (stack[pos].lowerCasedTag === lowerCasedTagName) {
            // 找出相同项则跳出循环
            break
          }
        }
      }

      // 找出对应的tag
      if (pos >= 0) {
        // 这里注意不能用pop，因为找到的不一定是栈顶的
        stack.length = pos
        // 闭合标签找到，设置当前parent为空
        currentParent = stack[pos - 1]
      }
    }

    /**
     * 解析文本
     * 文本分为普通的文本和表达式文本
     */
    function parseText(text) {
      if (!currentParent) return
      // 非表达式文本不用解析
      if (!defaultTagRE.test(text)) return
      // 解析含表达式的文本
      // 这里会引入一个比较专业的名次 token （词法单元）
      const tokens = []
      const rawTokens = []
      // 这一步是为了恢复defaultTagRE.test(text)造成的负面影响，此时lastIndex为0
      let lastIndex = (defaultTagRE.lastIndex = 0)
      let match, index, tokenValue
      // 匹配到有表达式
      while ((match = defaultTagRE.exec(text))) {
        // 如果你了解一点exec的知识基本就知道这一步是干嘛的。
        // 举个例子 比如  我的名字:{{name}}我的年龄{{age}}, 第一次使用这个正则匹配到的index为5,再执行会匹配到{{age}}的位置
        // 如上匹配中 match[0] 为 {{name}} match[1] 是name index为5
        // 这个就是为了分割表达式用的。
        index = match.index
        if (index > lastIndex) {
          // 如上，此处截取到的 tokenValue 是 我的名字: index是5
          rawTokens.push((tokenValue = text.slice(lastIndex, index)))
          tokens.push(JSON.stringify(tokenValue))
        }

        // 这里也做一个简单的处理，先来提取exp
        const exp = match[1].trim() // 找出表达式名称，比如上面就是 第一次找出的是name
        tokens.push(`_$(${exp})`) // 放入这个exp
        rawTokens.push({ "@binding": exp })
        // 类似于移动指针的效果
        lastIndex = index + match[0].length
      }

      // 将剩余的纯文本放进去
      if (lastIndex < text.length) {
        rawTokens.push((tokenValue = text.slice(lastIndex)))
        tokens.push(JSON.stringify(tokenValue))
      }

      // 现在 expression就是 我的名字:+_s(name)+我的年龄+_s(age)
      return {
        expression: tokens.join("+"),
        tokens: rawTokens
      }
      // 至此，文本解析已经完成
    }

    /**
     * 处理v-if
     */
    function processIf(el) {
      // 查看当前tag中是否有v-if属性,比如有个 v-if="isShow"那当前exp为isShow
      const exp = getAndRemoveAttr(el, "v-if")
      if (exp) {
        el.if = exp
        addIfCondition(el, {
          exp: exp,
          block: el
        })
      } else {
        // 查看当前tag中是否有v-else属性
        if (getAndRemoveAttr(el, "v-else") != null) {
          el.else = true
        }
        const elseif = getAndRemoveAttr(el, "v-else-if")
        if (elseif) {
          el.elseif = elseif
        }
      }
    }

    /**
     * 处理v-for
     */
    function processFor(el) {
      let exp
      // 还是先看属性列表中是否有v-for
      if ((exp = getAndRemoveAttr(el, "v-for"))) {
        const inMatch = exp.match(forAliasRE)
        el.for = inMatch[2].trim() // 这个获取的是v-for迭代的数组名称 for: list 这样

        // 对 迭代对象的项目名称和下标名称做解析

        // 将 (item, index) 转换为 item, index 这种形式
        const alias = inMatch[1].trim().replace(stripParensRE, "")
        // 匹配 item, index 并且可以根据分组获取到对应的item和index
        const iteratorMatch = alias.match(forIteratorRE)
        if (iteratorMatch) {
          // 还是先获取到 迭代项目别名
          el.alias = alias.replace(forIteratorRE, "").trim()
          el.iterator1 = iteratorMatch[1].trim()
          if (iteratorMatch[2]) {
            el.iterator2 = iteratorMatch[2].trim()
          }
        } else {
          el.alias = inMatch[1].trim()
        }
      }
    }

    /**
     * 移动指针
     * @param {*} n
     */
    function advance(n) {
      index += n
      html = html.substring(n)
    }

    /**
     * 说下这个方法的作用，
     * 由于对于v-if这种属性而言是没办法
     */
    function getAndRemoveAttr(el, name, removeFromMap) {
      var val
      // 对于传入这个方法的特殊属性 v-if，v-for 这些的是直接删除掉的
      if ((val = el.attrsMap[name]) != null) {
        var list = el.attrsList
        for (var i = 0, l = list.length; i < l; i++) {
          if (list[i].name === name) {
            list.splice(i, 1)
            break
          }
        }
      }
      // 直接删除项
      if (removeFromMap) {
        delete el.attrsMap[name]
      }
      return val
    }

    /**
     * 添加if条件
     * @param {*} el 当前元素的AST对象
     * @param {*} condition 条件
     */
    function addIfCondition(el, condition) {
      if (!el.ifConditions) {
        el.ifConditions = []
      }
      el.ifConditions.push(condition)
    }

    /**
     * 生成AttrsMap
     * 比如 <div id="app" :name="name" v-if="isShow">
     */
    function makeAttrsMap(attrs) {
      var map = {}
      for (var i = 0, l = attrs.length; i < l; i++) {
        map[attrs[i].name] = attrs[i].value
      }
      return map
    }

    // root 就是返回的AST
    return root
  }

  // 这些正则我们不需要关心大佬怎么写出来的。只需要知道，
  // 有了这几个正则，我们可以匹配到 标签开始，标签结束，直接关闭的标签，注释标签，属性就可以开始真正的parse了
  return parseHTML(template, options)
}
