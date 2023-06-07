var express = require("express");
var mongoose = require("mongoose");
var app = express();
require("dotenv").config();
const url = process.env.ATLAS_URI;
const { Schema } = mongoose;

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFood: [String],
});
const Person = mongoose.model("Person", personSchema);
const person1 = new Person({
  name: "Alaa",
  age: "25",
  favoriteFood: ["Pizza", "Burger"],
});
person1
  .save()
  .then(() => {
    console.log("person saved succefully");
  })
  .catch((error) => {
    console.error("error saving person", error);
  });
const people = [
  { name: "Alaa", age: 25, favoriteFoods: ["Pizza", "Burger"] },
  { name: "Imed", age: 47, favoriteFoods: ["Sushi", "Pasta"] },
  { name: "Zied", age: 35, favoriteFoods: ["Steak", "Ice Cream"] },
];
Person.create(people)
  .then((createPeople) => {
    console.log("People created succefully", createPeople);
  })
  .catch((error) => {
    console.error("error creating people", error);
  });
Person.find({ age: { $gte: 30 } })
  .then((people) => {
    console.log("People found", people);
  })
  .catch((error) => {
    console.log("People not found", error);
  });

// Search for a record with a specific favorite food using Model.findOne()
function findPersonByFavoriteFood(food) {
  return Person.findOne({ favoriteFood: food })
    .then((person) => {
      if (person) {
        console.log("Person found", person);
      } else {
        console.log("no person found with this fav foof");
      }
    })
    .catch((error) => {
      console.error("error searching person", error);
    });
}
findPersonByFavoriteFood("Pizza");

// Search for a person with a specific _id using Model.findById()
function findPersonById(person) {
  return Person.findById(person)
    .then((foundPerson) => {
      if (foundPerson) {
        console.log("Person found", foundPerson);
      } else {
        console.log("nos person found with id");
      }
    })
    .catch((error) => {
      console.error("error search");
    });
}
findPersonById("647f7ec0ebd90444e7fd77c8");

// Find person by _id, add 'hamburger' to favorite foods, and save the updated person
function updatePersonFavorite(personId) {
  Person.findById(personId)
    .then((person) => {
      if (person) {
        person.favoriteFood.push("Humburger");
        return person.save();
      } else {
        console.log("person not found with _id");
      }
    })
    .then((updatePerson) => {
      if (updatePerson) {
        console.log("person update:", updatePerson);
      }
    })
    .catch((error) => {
      console.error("error updating person", error);
    });
}
updatePersonFavorite("647f8114ffb20e1878ea6173");

// Find person by name, update age to 20, and return the updated person
function updatePersonAge(personName) {
  const update = { age: 20 };
  const options = { new: true };
  Person.findByIdAndUpdate({ name: personName }, update, options)
    .then((updatePerson) => {
      if (updatePerson) {
        console.log("Person updated", updatePerson);
      } else {
        console.log("Person not found with given name");
      }
    })
    .catch((error) => {
      console.error("error updating", error);
    });
}
updatePersonAge("Zied");

// Delete person by _id using Model.findByIdAndRemove()
function deletePersonById(personId) {
  Person.findByIdAndRemove(personId)
    .then((deletedPerson) => {
      if (deletedPerson) {
        console.log("Person deleted:", deletedPerson);
      } else {
        console.log("No person found with the given _id.");
      }
    })
    .catch((error) => {
      console.error("Error deleting person:", error);
    });
}

// Example usage
deletePersonById("647f77b83ae8e16bccd709ab");
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.error("error connection to monggodb:", error);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("succefully");
});
app.listen(3000, function (req, res) {
  console.log("server is started on port 3000");
});
