import express from 'express';
import dotenv from 'dotenv';
import router from './routes.js';
import cors from 'cors';
import { notFound, errorHandler} from './middleware/errorMiddleware.js';

if (process.env.NODE_ENV == 'development'){
    dotenv.config();}

const app = express();
app.use(cors({origin: process.env.ORIGIN}));
const port = process.env.PORT;

app.use(express.static("dist"));

//parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//router
app.use('/api', router);

//middleware
app.use(notFound);
app.use(errorHandler);

//delete later
app.get('/', (req,res) => {
    res.send("hello world")
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});
