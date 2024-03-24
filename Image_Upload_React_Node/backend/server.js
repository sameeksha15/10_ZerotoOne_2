import app from "./app.js";
import dotenv from "dotenv";

import connectDatabase from "./Db/db.js";

dotenv.config({ path: "backend/Config/config.env" });

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
