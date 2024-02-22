import favoriteModel from "../Models/favoriteModel.js"
import User from "../Models/userModel.js";
import userModel from "../Models/userModel.js"

export const addToFavorite = async (req,res) => {
    try{
        const newFavQuote = new favoriteModel({
            quoteId: req.body.quoteId,
            quoteTxt: req.body.quoteTxt,
            imgUrl: req.body.imgUrl,
            author: req.body.author
        })

        const value = await newFavQuote.save();
        
        const user = await User.findById(req.body.userId);
        if(user){
            user.favorites.push(value._id);
            await user.save();
            res.json(value);
        }
        else{
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}
export const removeFromFavorite = async (req,res) => {
    try{
        const { _id, userId } = req.params;

        const favQuote = await favoriteModel.findById( _id )
        if(favQuote){
            var deleteById = await favoriteModel.deleteOne({ _id })
            if(deleteById.deletedCount === 1){

                const user = await User.findById( userId )
                if(user){
                    const index = user.favorites.indexOf(_id);
                    if(index > -1){
                        user.favorites.splice(index, 1)
                        await user.save();
                    }
                }
                res.status(200).json({ message: `Successfully removed quote with the ID: ${_id} from favorite.` })
            }
            else{
                res.status(501).json({ message: 'Internal error,sorry!' });
            }
        }
        else{
            res.status(200).json({ message: `Sorry favorite quote with the ID: ${_id} doesn't found.` })
        }
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}
export const readFavByUser = async (req,res) => {
    try{
        const { _id } = req.params;
        const userWithFav = await User.findById(_id).populate('favorites').exec();

        if(userWithFav){
            res.status(200).json(userWithFav.favorites);
        }
        else{
            res.status(500).json({ message: 'User with Id ${_id} not found.' })
        }
            
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}