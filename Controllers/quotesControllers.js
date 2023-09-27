import QuotesModel from "../Models/QuotesModel.js";

export const getQoutes = async (req, res) => {
  try {
    const quotes = await QuotesModel.find();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getQuotesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const quotes = await QuotesModel.find({ category });
    res.status(200).json(quotes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAuthorsList = async (req,res) => {
    try{
        // const authors = await QuotesModel.find().distinct("auther");
        const authors = await QuotesModel.aggregate([
            {
                $group: {
                    _id: "$auther",
                    count: { $sum: 1 },
                },
            }
        ])
        res.status(200).json(authors);
    }
    catch(err){
        res.status(404).json({ message: err.message })
    }
}

export const getQuotesByAuther = async (req, res) => {
  try {
    const { auther } = req.params;
    const quote = await QuotesModel.find({ auther });
    res.status(200).json(quote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addQuote = async (req, res) => {
  try {
    const newQuote = new QuotesModel({
      text: req.body.text,
      auther: req.body.auther,
      category: req.body.category,
    });
    const val = await newQuote.save();
    res.json(val);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addManyQuotes = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res
        .status(400)
        .json({ message: "Request should be an array of objects" });
    }

    const quotes = [];

    for (const quotesData of req.body) {
      const newQuotes = new QuotesModel({
        text: quotesData.text,
        auther: quotesData.auther,
        category: quotesData.category,
      });

      const savedQuote = await newQuotes.save();
      quotes.push(savedQuote);
    }

    res.status(201).json(quotes);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
