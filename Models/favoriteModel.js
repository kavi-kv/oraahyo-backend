import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema({
    quoteId: String,
    quoteTxt: String,
    imgUrl: String,
    author: String,
})

const Favorites = mongoose.model("Favorite", favoriteSchema)

export default Favorites;