import express  from "express";
import  {getQoutes,addQuote,addManyQuotes,getQuotesByCategory,getQuotesByAuther,getAuthorsList}  from "../Controllers/quotesControllers.js"

const router = express.Router();

router.get("/quotes", getQoutes);
router.post("/addQuotes", addQuote)
router.post("/addManyQuotes", addManyQuotes)
router.get("/byCategory/:category", getQuotesByCategory)
router.get("/byAuther/:auther", getQuotesByAuther)
router.get("/authorsList", getAuthorsList)

export default router;