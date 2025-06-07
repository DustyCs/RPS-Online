import app from "./app";
import { APP_PORT } from "./utils/secret"

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});