import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { RouteHandler, routes } from "./helper/RouteHandler";
import "./routes";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running....");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";

    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "Application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "Not found!",
        })
      );
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server on running on ${config.port}`);
});
