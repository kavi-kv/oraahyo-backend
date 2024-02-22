import express from 'express'
import { addToFavorite, readFavByUser, removeFromFavorite } from "../Controllers/favController.js"

const favRouter = express.Router();

favRouter.post("/api/addfav", addToFavorite)
favRouter.delete("/api/removeFav/:_id/:userId", removeFromFavorite)
favRouter.get("/api/readFav/:_id", readFavByUser)


export default favRouter