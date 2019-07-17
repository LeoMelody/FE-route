## 点击劫持

点击劫持的攻击方式主要是通过在源网页上嵌套一个透明的iframe来实现点击劫持

### 如何防范

1、给资源的请求设置相应头 X-FRAME-OPTIONS 属性来防止 iframe的嵌套点击
2、通过判断当前window是否是top window来隐藏内容