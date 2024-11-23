import { app } from "./app";
import { env } from "./env";

const port = env.PORT || 4000;

app
  .listen({
    host: "0.0.0.0",
    port: port,
  })
  .then(() => {
    console.log("HTTP Server is running on port 3333");
  });
