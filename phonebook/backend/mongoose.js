const mongoose = require('mongoose')

if (process.argv.length === 2) {
  console.log('node mongoose.js yourPassword')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.lsxs3fh.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('Persons:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const personName = process.argv[3]
  const personNumber = process.argv[4]

  const person = new Person({
    name: personName,
    number: personNumber,
  })

  person.save().then((result) => {
    console.log(`Added ${personName} number ${personNumber} to phonebook.`)
    mongoose.connection.close()
  })
} else {
  console.log('To add: node mongo.js <password> "<name>" "<password>"')
  process.exit(1)
}
