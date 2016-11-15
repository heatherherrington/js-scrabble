var Scrabble = function() {};

var Scoring = function() {};

Scoring.score = function(input) {
  var totalValue = 0;
  var word = input.toLowerCase();

  if (! /^[a-zA-Z0-9]+$/.test(word)) {
    return "I'm sorry, but you need to input a word containing only letters";
  }

  // Might refactor to use property map rather than switch:
  // var map = { A:1, B:1, C:1, D:2, E:2, F:2 };
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


Scoring.highestScoreFrom = function(arrayOfWords) {
  var maxScore = 0;
  var currentWord = [];

  for (var i = 0; i < arrayOfWords.length; i++) {
    var input = arrayOfWords[i];
    var totalValue = this.score(input);
    if (totalValue >= maxScore) {
      // Clears array if another word is higher, otherwise, it will just generate a giant array
      // of highest scoring words and not be specific when there is a tie
      if (totalValue > maxScore) {
        currentWord = [];
        currentWord.push(input);
        maxScore = totalValue;
      } else {
        // Returns array of words with multiple words if there's a tie
        currentWord.push(input);
      }
    }
  }

  var lengthOfWord = 7;
  var smallWord = null;

  // If there is a tie between a seven-letter word and a shorter word, the array will have both
  // words. This will narrow it down and award the victory to the seven letter word.
  if (currentWord.length > 0) {
    for (var l = 0; l < currentWord.length; l++) {
      if (currentWord[l].length == 7) {
        return currentWord[l];
      } else if (currentWord[l].length < lengthOfWord) {
        lengthOfWord = currentWord[l].length;
        smallWord = currentWord[l];
      }
    }
  // Returns shortest word if there is NOT a seven letter word
  return smallWord;
  }
};

module.exports = Scrabble;

console.log(Scoring.highestScoreFrom(["hello","what","sup"]));
