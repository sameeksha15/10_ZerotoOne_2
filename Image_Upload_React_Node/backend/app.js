import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import methodOverride from "method-override";

import fileRoutes from "./routes/FileRoutes.js";
import s3Routes from "./routes/S3Routes.js";
import ErrorMiddleware from "./Middlewares/ErrorMiddleware.js";

// import session from "express-session";
// import flash from "express-flash";

// import crypto from 'crypto';

dotenv.config({ path: "backend/Config/config.env" });

const app = express();

app.use(express.json());

const corsOptions = {
  origin: true, //included origin as true
  // credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept,"
  );
  next();
});

app.use(bodyParser.json());
// app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


// const secret = crypto.randomBytes(32).toString('hex');

// const sessionMiddleware = session({
//   secret: process.env.GOOGLE_CLIENT_SECRET,
//   resave: false,
//   saveUninitialized: false
// });

// app.use(flash());

// app.use(sessionMiddleware);
// app.use(passport.initialize());
// app.use(passport.session());

app.use(ErrorMiddleware);

app.use("/api/v1", fileRoutes);
app.use("/api/v1", s3Routes);

export default app;
