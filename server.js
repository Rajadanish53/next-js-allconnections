const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const schema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
let port = 3000

nextApp.prepare().then(() => {
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  console.log("running");
  io.on("connection", (socket) => {
    // console.log(socket.id);
    socket.emit("now", {
      message: "zeit",
    });
    socket.on("clicked", (data) => {
      io.emit("message", data);
    });
  });
  app.get("/api/express", (req, res) => {
    console.log("running");
    return res.send({ res: "hello from express" });
  });
  app.get("/api/Test", (req, res) => {
    res.send({ tesT: "hello from express" });
  });
  app.all("*", (req, res) => {
    //   console.log("inside all route")
    return nextHandler(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(("running on ", port));
  });
});
