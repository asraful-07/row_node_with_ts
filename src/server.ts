import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running....");

    //? Root route
    if (req.url == "/" && req.method == "GET") {
      res.writeHead(200, { "Content-Type": "Application/json" });
      res.end(
        JSON.stringify({
          message: "Hello I'm node js with typescript",
          path: req.url,
        })
      );
    }

    //* health route

    //TODO POST route
    if (req.url == "/api/user" && req.method == "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const paresBody = JSON.parse(body);
          //?  console.log(paresBody);
          res.end(JSON.stringify(paresBody));
        } catch (error: any) {
          console.log(error?.message);
        }
      });
    }

    //TODO GET route
    if (req.url == "/api/user" && req.method == "GET") {
      res.writeHead(200, { "Content-Type": "Application/json" });
      res.end(
        JSON.stringify({
          message: "Hello world my name is ts",
          path: req.url,
        })
      );
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server on running on ${config.port}`);
});
