(function runGame() {
    // debugger;
    var display = document.getElementById('cards');
    var cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

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


    /**
     * Check the result of the current cards and alert the game result
     *
     * @param  {Boolean} standing  Whether or not the player is standing
     * @param  {Boolean} hitting   Whether or not the player is hitting
     * @return {void}
     */
    function checkResult(standing) {
        var yourHand = display.innerHTML.split(' ');
        var playerTotal = 0;
        yourHand.forEach(function(currentCard, i) {   // check hand total TODO: make function
            if (Number(currentCard)) {
                currentCard = Number(currentCard);
                playerTotal += currentCard;
            }

            if (currentCard === 'J' || currentCard == 'Q' || currentCard === 'K') {
                playerTotal += 10;
            }

            if (currentCard === 'A') {
                playerTotal += 11;
            }
        }); // end of check hand total
        console.log("player total = " + playerTotal);
        if (playerTotal > 21) { // player goes over
          alert('Bust!');
        }

        if (playerTotal === 21) {
          alert('Blackjack! You win!');
        }

        if (standing) {
          if (playerTotal < 15) {
            alert('Dealer wins.');
          } else if (playerTotal < 19) {
            alert('Push!');
          } else {
            alert('Player wins!');
          }
        }



        // display.innerHTML = '';
        // card = Math.floor(Math.random() * cards.length);
        // display.innerHTML = cards[card];
    }

    document.getElementById('stand').addEventListener('click', function() {
        checkResult(true);
    });

    document.getElementById('hit').addEventListener('click', function() {
        getCard(1);
    });

    display.innerHTML = '';
    getCard(2); // deal hand
})();
