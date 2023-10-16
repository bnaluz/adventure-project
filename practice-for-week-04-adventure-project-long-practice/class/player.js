const { Food } = require('./food');
const { Room } = require('./room');
const { Item } = require('./item');

class Player {
  constructor(name, startingRoom) {
    this.name = name;
    this.currentRoom = startingRoom;
    this.items = [];
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log('You cannot move in that direction');
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // Picks up an item from the current room into the player's inventory

    for (let i = 0; i < this.currentRoom.items.length; i++) {
      let each = this.currentRoom.items[i];
      if (each['name'] === itemName) {
        this.currentRoom.items.splice(i);
        this.items.push(each);
        return this.items;
      }
    }
  }

  dropItem(itemName) {
    for (let i = 0; i < this.items.length; i++) {
      let each = this.items[i];
      if (each['name'] === itemName) {
        this.items.splice(i);
        this.currentRoom.items.push(each);
        return this.currentRoom.items;
      }
    }
  }

  eatItem(itemName) {
    // Allow the player to eat food items, but not non-food items
    for (let i = 0; i < this.items.length; i++) {
      let eachItem = this.items[i];
      if (eachItem.name === itemName && eachItem instanceof Food) {
        this.items.splice(i);
      }
    }
    return this.items;
    // Your code here
  }

  getItemByName(name) {
    // Retrieves an item from a player's inventory by item name

    for (let i = 0; i < this.items.length; i++) {
      let each = this.items[i];
      if (each['name'] === name) {
        return each;
      }
    }
  }
}
let item = new Item('sword', 'just a sword');
let room = new Room('Room 2', 'A second test room');
let player = new Player('player2', room);

console.log(player.takeItem('sword'));

module.exports = {
  Player,
};
