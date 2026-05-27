import app from "./app.js";
import 'dotenv/config';
// import { testConnection, sql } from "./dbConnection.js";

// const port = process.env.PORT;

(async () => {
    try {
        // await testConnection();

        app.listen(3000, () => {
            console.log(`Server is ready and using 3000 port`);
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
})()

process.on("SIGINT", async () => {
  console.log("Closing database");
  await sql.end();
  process.exit(0);
})