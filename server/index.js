import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js';
import CommentRoute from './Routes/CommentRoute.js';
import StoryRoute from './Routes/StoryRoute.js';
//Routes

const app = express();

//Serve Images for Public
app.use(express.static('public'))
app.use('/images', express.static("images"))

//Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors())
dotenv.config();

mongoose
.connect(
    process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));

  //Route Usage
  app.use('/auth', AuthRoute)
  app.use('/user', UserRoute)
  app.use('/post', PostRoute)
  app.use('/upload', UploadRoute)
  app.use('/chat', ChatRoute)
  app.use('/message', MessageRoute)
  app.use('/comment', CommentRoute)
  app.use('/story', StoryRoute)