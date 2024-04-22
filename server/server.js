import express from 'express';
import dotenv from 'dotenv';
import router from './routes.js';
import cors from 'cors';
import { notFound, errorHandler} from './middleware/errorMiddleware.js';


const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == 'development'){
    dotenv.config();
}
app.use(cors({origin: process.env.ORIGIN}));

//parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//router
app.use('/api', router);

//middleware
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});
