import paresBody from "../helper/parsBody";
import addRoutes from "../helper/RouteHandler";
import sandJson from "../helper/sandJson";

//* Root GET
addRoutes("GET", "/", (req, res) => {
  sandJson(res, 200, {
    message: "Hello I'm node js with typescript",
    path: req.url,
  });
});

//* Root POST
addRoutes("POST", "/api/users", async (req, res) => {
  const body = await paresBody(req);
  sandJson(res, 201, body);
});

//* Root GET
addRoutes("GET", "/api/users", (req, res) => {
  sandJson(res, 200, {
    message: "Hello world",
    path: req.url,
  });
});
