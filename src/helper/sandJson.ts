import { ServerResponse } from "http";

function sandJson(res: ServerResponse, statusCode: number, data: any) {
  res.writeHead(statusCode, { "Content-Type": "Application/json" });
  res.end(JSON.stringify(data));
}

export default sandJson;
