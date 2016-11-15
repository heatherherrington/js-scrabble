var Scrabble = function() {};

// YOUR CODE HERE
// Scrabble.prototype.helloWorld = function() {
//   return 'hello world!';
// };

Scrabble.prototype.score = function(input) {
  var totalValue = 0;
  var word = input.toLowerCase();

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


Scrabble.prototype.highestScoreFrom = function(arrayOfWords) {
  var maxScore = 0;
  var currentWord = [];

  for (var i = 0; i < arrayOfWords.length; i++) {
    var totalValue = score(word);
    if (score >= maxScore) {
      // Clears array if another word is higher, otherwise, it will just generate a giant array
      // of highest scoring words and not be specific when there is a tie
      if (score > maxScore) {
        currentWord = [];
        currentWord.push(word);
        maxScore = score;
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
    for (var l = 0; i < currentWord.length; l++) {
      if (word.length == 7) {
        return word;
      } else if (word.length < lengthOfWord) {
        lengthOfWord = word.length;
        smallWord = word;
      }
    }
  // Returns shortest word if there is NOT a seven letter word
  return small_word;
  }
};

module.exports = Scrabble;

var hi = new Scrabble();

console.log(hi.score("ABC"));
