import mongoose from "mongoose";

const ramdomQuotesSchema = new mongoose.Schema({

    text: {
        type: String,
        required: true,
        min: 3,
        max: 80
    },
    auther: String,
    category: String,

},);

const QuotesModel = mongoose.model("oraahyos", ramdomQuotesSchema);

export default QuotesModel;