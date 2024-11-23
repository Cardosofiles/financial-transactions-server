import { app } from "./app";
import { env } from "./env";

const port = env.PORT || 4000;

app
  .listen({
    port: port,
  })
  .then(() => {
    console.log("HTTP Server is running on port 3333");
  });
