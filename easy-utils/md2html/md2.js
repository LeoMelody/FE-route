/*
 * @Author: leowangheng@tencent.com 
 * @Date: 2019-11-20 10:43:21 
 * @Last Modified by: leo
 * @Last Modified time: 2019-11-20 20:58:06
 * 第二种方案尝试
 */

const path = require("path")
const fs = require("fs")
const md = require("markdown").markdown

console.log(md.toHTML("hello *world*"))