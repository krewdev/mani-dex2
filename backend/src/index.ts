import app from "./app.js";
import { env } from "./config/env.js";

const port = env.PORT;
const host = env.HOST;

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
