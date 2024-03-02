import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const re = 
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: "Please enter a valid email address."
        },
    },
    type: {
        required: false,
        type: String
    },
    password: {
        required: true,
        type: String,
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Favorite'
    }]
})

const User = mongoose.model("User", userSchema)

export default User;