/*
 * @Author: leowangheng@tencent.com 
 * @Date: 2019-12-14 15:48:22 
 * @Last Modified by: leo
 * @Last Modified time: 2019-12-14 17:31:49
 * ts 编写json服务器
 */
import {Server, createServer, IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from "path";
import Order from "./Order";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse): void => {
  const BASE_PATH: string = path.resolve(__dirname, "../")
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-type": "text/html"
    });
    const html: string = fs.readFileSync(path.resolve(BASE_PATH, "index.html"), {
      encoding: "UTF-8"
    });
    res.end(html);
  } else {
    res.writeHead(200, {
      "Content-type": "application/json"
    });
    // 获取订单数据
    if (req.url === "/order") {
      fs.readFile(path.resolve(BASE_PATH, "datas/order.json"), "UTF-8", (err, orderData): void => {
        res.end(orderData)
      })
    }
    
    if (req.url === "/albums") {

    }
  }

})

server.listen(8088)