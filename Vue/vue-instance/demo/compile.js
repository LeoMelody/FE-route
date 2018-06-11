function nodeToFragment() {
    var fragment = document.createDocumentFragment()
    var child = el.firstChild
    while(child) {
        fragment.appendChild(chuild)
        child = el.firstChild
    }

    return fragment
}

function compileElement(el) {
    var childNode = el.childNode
    var self = this
    [].slice.call(childNode).forEach(node => {
        var reg = /\{\{(.*)\}\}/
        var text = node.textContent

        if (self.isTextNode(node) && reg.test(text)) { // 有匹配的项
            self.compileText(node, reg.exec(text)[1])
        }

        if (node.childNodes && node.childNodes.length) {
            self.compileElement(node)
        }
    });
}

function compileText(node, exp) {
    var self = this
    var initText = this[exp]
}