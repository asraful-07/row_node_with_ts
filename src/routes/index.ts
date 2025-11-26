import { readUsers, writeUsers } from "../helper/fileDb";
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

//* POST
addRoutes("POST", "/api/users", async (req, res) => {
  const body = await paresBody(req);
  const users = readUsers();

  const newUser = {
    ...body,
  };

  users?.push(newUser);
  writeUsers(users);

  sandJson(res, 201, body);
});

//* GET
addRoutes("GET", "/api/users", (req, res) => {
  sandJson(res, 200, {
    message: "Hello world",
    path: req.url,
  });
});

//* PUT
addRoutes("PUT", "/api/users/:id", async (req, res) => {
  const { id } = (req as any).params;
  const body = await paresBody(req);

  const users = readUsers();

  const index = users.findIndex((user: any) => user.id == id);

  if (index === -1) {
    sandJson(res, 404, {
      success: false,
      message: "user not found",
    });
  }

  users[index] = {
    ...users[index],
    ...body,
  };

  writeUsers(users);

  sandJson(res, 202, {
    success: true,
    message: `id ${id} user updated`,
    data: users[index],
  });
});
