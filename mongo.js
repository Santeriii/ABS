const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.blvny.mongodb.net/ABS?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const ratingSchema = new mongoose.Schema({
  mal_id: Number,
  rating: Number,
})

const Rating = mongoose.model('Rating', ratingSchema)

const rating = new Rating({
  mal_id: 5114,
  rating: 5,
})

Rating.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })

/*rating.save().then(response => {
  console.log('rating saved!')
  mongoose.connection.close()
})*/