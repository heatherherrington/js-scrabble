var Scrabble = function() {};

Scrabble.prototype.score = function(word) {
  var totalValue = 0;
  this.word = word.toLowerCase();

  if (! /^[a-zA-Z0-9]+$/.test(word)) {
    return "I'm sorry, but you need to input a word containing only letters";
  }

  // Might refactor to use property map rather than switch:
  // Or not, ran out of energy :(
  // Example: var map = { A:1, B:1, C:1, D:2, E:2, F:2 };
  // console.log(map.A+map.D+map.D); // 5
  for (var i = 0; i < word.length; i++) {
    switch(true) {
      case ("aeioulnrst".indexOf(word[i]) >= 0):
        totalValue += 1;
        break;
      case ("dg".indexOf(word[i]) >= 0):
        totalValue += 2;
        break;
      case ("bcmp".indexOf(word[i]) >= 0):
        totalValue += 3;
        break;
      case ("fhvwy".indexOf(word[i]) >= 0):
        totalValue += 4;
        break;
      case ("k".indexOf(word[i]) >= 0):
        totalValue += 5;
        break;
      case ("jx".indexOf(word[i]) >= 0):
        totalValue += 8;
        break;
      case ("qz".indexOf(word[i]) >= 0):
        totalValue += 10;
        break;
      default:
        totalValue = "I'm sorry, you need to input a word.";
    }
  }

  // Bonus for word of maximum length
  if (word.length == 7) {
    totalValue += 50;
  }

  return totalValue;
};

Scrabble.prototype.highestScoreFrom = function(arrayOfWords) {
  var maxScore = 0;
  var currentWord = [];
  var wordsPlayed = arrayOfWords;

  for (var i = 0; i < wordsPlayed.length; i++) {
    var word = wordsPlayed[i];
    var totalValue = this.score(word);
    if (totalValue >= maxScore) {
      // Clears array if another word is higher, otherwise, it will just generate a giant array
      // of highest scoring words and not be specific when there is a tie
      if (totalValue > maxScore) {
        currentWord = [];
        currentWord.push(word);
        maxScore = totalValue;
      } else {
        // Returns array of words with multiple words if there's a tie
        currentWord.push(word);
      }
    }
  }

  var lengthOfWord = 7;
  var smallWord = null;

  // If there is a tie between a seven-letter word and a shorter word, the array will have both
  // words. This will narrow it down and award the victory to the seven letter word.
  if (currentWord.length > 0) {
    for (var l = 0; l < currentWord.length; l++) {
      var current = currentWord[l];
      if (current.length == 7) {
        return current;
      } else if (current.length < lengthOfWord) {
        lengthOfWord = current.length;
        smallWord = current;
      }
    }
  // Returns shortest word if there is NOT a seven letter word
  return smallWord;
  }
};

// I'm not sure if this was the intent, but I talked with a classmate and decided that a Player should be able to play any game, so you'd instantiate a new Scrabble game for each Player
var Player = function(name, scrabble = (new Scrabble())) {
  this.name = name;
  this.scrabble = scrabble;
  this.wordsPlayed = [];
};

Player.prototype.playerName = function(name) {
  return name;
};

// Adds the input word to the wordsPlayed Array
// Returns false if player has already won
Player.prototype.play = function(word) {
  if (this.hasWon()) {
    return false;
  }

  this.word = word;
  this.wordsPlayed.push(word);

  return this.scrabble.score(word);
};

// Returns an Array of the words played by the player
Player.prototype.plays = function() {
  return this.wordsPlayed;
};

// Sums up and returns the score of the players words
Player.prototype.totalScore = function() {
  var playerTotalScore = 0;
  for (var m = 0; m < this.wordsPlayed.length; m++) {
    playerTotalScore += this.scrabble.score(this.wordsPlayed[m]);
  }
  return playerTotalScore;
};

// Returns `true` if the player has over 100 points, otherwise returns `false`
Player.prototype.hasWon = function() {
  if (this.totalScore() > 100) {
    return true;
  } else {
    return false;
  }
};

// Returns the highest scoring word the user has played
Player.prototype.highestScoringWord = function() {
  if (this.wordsPlayed.length === 0) {
    return "No words have been played";
  }

  var maxWord = "";
  var maxWordScore = 0;

  // Iterates over the words that have been played by this player and finds the word with the highest total score. Returns that word.
  for (var n = 0; n < this.wordsPlayed.length; n++) {
    var score = this.scrabble.score(word);
    // Keeps track of both word and score, to avoid duplication of code in highest_word_score
    if (score > maxWordScore) {
      maxWordScore = score;
      maxWord = word;
    }
  }
  return "Max score: " + maxWordScore + " and max scoring word: " + maxWord;
};

module.exports = Scrabble;

var playerOne = new Player();
var playerScrabble = new Scrabble();

// Test cases

// console.log("Highest Score From Three Words: " + playerScrabble.highestScoreFrom(["hello","what","sup"]));
// console.log("Returns a score for a particular word: " + playerScrabble.score("yay"));
// console.log("Player's name is: " + playerOne.playerName("Heather"));
// console.log("Log a word and return false if the player has won: " + playerOne.play("howdy"));
// console.log("Log a word and return false if the player has won: " + playerOne.play("lovely"));
// console.log("Return total score for one player: " + playerOne.totalScore());
// console.log("Log a word and return false if the player has won: " + playerOne.play("qqzzzzzz"));
// console.log("Return total score for one player: " + playerOne.totalScore());
// console.log("Log a word and return false if the player has won: " + playerOne.play("qqzzzzzz"));
// console.log("Should return an array of words from one player: " + playerOne.plays());
