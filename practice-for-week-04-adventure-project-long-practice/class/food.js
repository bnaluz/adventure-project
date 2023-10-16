// Create an edible `Food` class that inherits from the `Item` class
const { Item } = require('./item.js');

// Your code here
class Food extends Item {
  constructor(name, description) {
    super(name, description);
  }
}

module.exports = { Food };
