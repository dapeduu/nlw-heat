import { httpServer } from "./app";

httpServer.listen(process.env.PORT, () =>
  console.log(`App is running on PORT ${process.env.PORT}`)
);
