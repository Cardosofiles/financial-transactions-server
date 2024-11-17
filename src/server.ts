import fastify from "fastify";

const app = fastify();

app.get("/hello", (req, res) => {
  res.send("Hello, Fastify and Node!");
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server is running on port 3333");
  });
