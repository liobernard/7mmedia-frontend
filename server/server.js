const resolve = require("path").resolve;
const bodyParser = require("body-parser");
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const render = require("./renderer").render;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use((req, res, next) => {
  res.set({
    "X-XSS-Protection": "1; mode=block",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "script-src 'self' assets.7mmedia.online data:",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  });
  next();
});

app.get("/*", render);

// Comment out the line below if you will serve static assets
// via reverse proxy (as is recommendeded in Express documentation),
// otherwise will serve via Express app from 'build' directory

// app.use(express.static(resolve(__dirname, "../public")));

app.use(render);
app.listen(PORT, console.log(`App listening on port ${PORT}!`));

// Handle errors
app.on("error", error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});
