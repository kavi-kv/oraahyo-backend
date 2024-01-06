import express  from "express";
import  {getQoutes,addQuote,addManyQuotes,getQuotesByCategory,getQuotesByAuther,getAuthorsList,deleteQuote,categoryExist,updateItem}  from "../Controllers/quotesControllers.js"

const router = express.Router();

router.get("/quotes", getQoutes);
router.post("/addQuotes", addQuote)
router.post("/addManyQuotes", addManyQuotes)
router.get("/byCategory/:category", getQuotesByCategory)
router.get("/byAuther/:auther", getQuotesByAuther)
router.get("/authorsList", getAuthorsList)
router.post("/delete/:_id", deleteQuote)
router.get("/isCatExist/:category", categoryExist)
router.put("/updateQuotes/:_id", updateItem)

export default router;