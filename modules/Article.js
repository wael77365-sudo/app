const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const ArtcleSchema = new Schema ({
    title: String,
    body: String,
    NumberOflikes : Number,
})

const Article = mongoose.model("Articls",ArtcleSchema)

module.exports = Article