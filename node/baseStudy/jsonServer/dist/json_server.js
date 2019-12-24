"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: leowangheng@tencent.com
 * @Date: 2019-12-14 15:48:22
 * @Last Modified by: leo
 * @Last Modified time: 2019-12-14 17:31:49
 * ts 编写json服务器
 */
const http_1 = require("http");
const fs = require("fs");
const path = require("path");
const server = http_1.createServer((req, res) => {
    const BASE_PATH = path.resolve(__dirname, "../");
    if (req.url === "/") {
        res.writeHead(200, {
            "Content-type": "text/html"
        });
        const html = fs.readFileSync(path.resolve(BASE_PATH, "index.html"), {
            encoding: "UTF-8"
        });
        res.end(html);
    }
    else {
        res.writeHead(200, {
            "Content-type": "application/json"
        });
        // 获取订单数据
        if (req.url === "/order") {
            fs.readFile(path.resolve(BASE_PATH, "datas/order.json"), "UTF-8", (err, orderData) => {
                res.end(orderData);
            });
        }
        if (req.url === "/albums") {
        }
    }
});
server.listen(8088);
