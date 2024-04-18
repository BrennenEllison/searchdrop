import express from 'express';

import {nameSearchHandler, urlSearchHandler, selectionSearchHandler} from './controllers/searchController.js';

const router = express.Router();

router.get('/search', nameSearchHandler);
router.get('/search/url', urlSearchHandler);
router.get('/search/selection', selectionSearchHandler)

export default(router);