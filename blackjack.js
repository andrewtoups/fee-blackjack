(function runGame() {
    // debugger;
    function initialize() {
      display.innerHTML = '';
      getCard(2); // deal hand
    }

    document.getElementById('stand').addEventListener('click', function() {
      checkResult(true);
    });

    document.getElementById('hit').addEventListener('click', function() {
      getCard(1);
    });

    var display = document.getElementById('cards');
    var cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    initialize();

    function getCard(numOfCards) {
        for (i = 0; i < numOfCards; i++) {
            card = Math.floor(Math.random() * cards.length);
            if (display.innerHTML === '') {
                display.innerHTML = cards[card];
            } else {
                display.innerHTML += ' ' + cards[card];
            }
        }
        setTimeout(function() {
          checkResult(false);
        }, 100);
    }

    function tabulate() {
      var playerHand = display.innerHTML.split(' ');
      var playerTotal = 0;
      for (var index =0; index < playerHand.length; index++) {
        var currentCard = playerHand[index];
        if (Number(currentCard)) {
          currentCard = Number(currentCard);
          playerTotal += currentCard;
        }

        if (currentCard === 'J' || currentCard === 'Q' || currentCard === 'K') {
          playerTotal += 10;
        }

        if (currentCard === 'A') { //fuck my life but this is another loop that finishes
          index++;                ///adding the array. any future aces are counted as one
          for (index; index < playerHand.length; index++){ //because even a hand of two aces
            currentCard = playerHand[index];               //would go over 21 if both were
            if (Number(currentCard)) {                     //valued as 11
              currentCard = Number(currentCard);           //is there a way to do this
              playerTotal += currentCard;                 ///recursively??
            }

            if (currentCard === 'J' || currentCard === 'Q' || currentCard === 'K') {
              playerTotal += 10;
            }

            if (currentCard == 'A'){
              playerTotal += 1;
            }
          }
          if (playerTotal + 11 > 21){
            playerTotal += 1;
          } else {
          playerTotal += 11;
          }
        }
    } // end of check hand total

      return playerTotal;
    }

    /**
     * Check the result of the current cards and alert the game result
     *
     * @param  {Boolean} standing  Whether or not the player is standing
     * @param  {Boolean} hitting   Whether or not the player is hitting
     * @return {void}
     */
    function checkResult(standing) {
        var playerTotal = tabulate();
        var diff;
        var gameOver = false;

        if (playerTotal > 21) { // player goes over
          diff = playerTotal - 21;
          alert('Bust! ' + diff + " over!");
          gameOver = true; // game ends
        }

        if (playerTotal === 21) { //blackjack
          alert('Blackjack! You win!');
          gameOver = true; // game ends
        }

        if (standing) { //compare player hand to dealer hand on standing
          if (playerTotal < 15) {
            diff = 15 - playerTotal;
            alert('Dealer wins. ' + diff + ' under the dealer.');
          } else if (playerTotal < 19) {
            alert('Push!');
          } else {
            diff = playerTotal - 18;
            alert('Player wins! ' + diff + " over Dealer's hand");
          }
          gameOver = true; // game ends
        }

        if (gameOver){
          initialize();
        }

    }

})();
