import categories from './category/router';
import items from './word/router';
import * as express from "express";
import * as logger from "morgan";
import * as cors from "cors";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/categories', categories);
app.use('/api/word', items);

app.use(function (req, res, next) {
  res.json({
    statusCode: 404,
  });
});

app.use(function (err, req, res, next) {
  res.json({
    statusCode: 500,
    message: err.message,
    stack: err.stack,
  });
});

export default app;
