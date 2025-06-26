import app from "./app";
import { APP_PORT } from "./utils/secret"

const port = process.env.PORT || APP_PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});