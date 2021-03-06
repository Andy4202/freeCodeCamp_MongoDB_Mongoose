const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema  = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let harryPotter = new Person({name: 'Harry Potter', age: 17, favouriteFoods:["Butter Beer", "Mince Pies", "Spaghetti Bolognese"] })
  harryPotter.save(function(err, data){
    if (err) return console.error(err)
    done(null, data);
  })
};

//Array of people
const arrayOfPeople = [
  {name: "Hermione Granger", age: 17, favoriteFoods: ["Spaghetti Bolognese", "burrito"]},
  {name: "Ronald Weasley", age: 17, favoriteFoods: ["Roast Beef", "burrito"]},
  {name: "Luna Lovegood", age: 17, favoriteFoods: ["Cake", "burrito"]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound){
    if (err) return console.log(err);
    done(null, personFound);
  })
};


const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, personFound){
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, personFound){
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if(err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet},{new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, result) => {
    if(err) return console.log(err);
    done(null, result);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, result) => {
    if(err) return console.log(err);
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 'asc'})
  .limit(2)
  .select('-age')
  .exec(function(err, data){
    if (err) return console.log(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
