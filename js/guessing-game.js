
class Game {

  constructor() {
    this.playersGuess = null;
    this.winningNumber = this.generateWinningNumber(); //√
    this.pastGuesses = [];//√
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);//math.abs <-absolute value
  }

  isLower() {
    return this.playersGuess < this.winningNumber; //√
  }

  playersGuessSubmission(guess) {

    if (typeof guess !== 'number' || guess < 1 || guess > 100) { //√
      throw 'That is an invalid guess.';//
    }

    this.playersGuess = guess; //√
    
        
    return this.checkGuess(); 
  }

  checkGuess() {
    
    
    let feedbackText = ''; //√
    
    if (this.playersGuess === this.winningNumber) { //√
      feedbackText = 'You Win!';
    } 
    
    else if (this.pastGuesses.includes(this.playersGuess)) { //√ if the number is already a guess
      feedbackText = 'You have already guessed that number.';
    } 
    
    
    else {
      this.pastGuesses.push(this.playersGuess); //√ if number is not in the array then push

      if (this.pastGuesses.length === 5) { //√
        feedbackText = `You Lose. The winning Number is : ${this.winningNumber}`;
      } 
      
      else { //√
        let diff = this.difference();
        if (diff < 10) feedbackText = "You're burning up!";
        else if (diff < 25) feedbackText = "You're lukewarm.";
        else if (diff < 50) feedbackText = "You're a bit chilly.";
        else feedbackText = "You're ice cold!";
      }
    }


   let currentButton = document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`)

    // these lines will make the test specs fail
    document.querySelector('#guess-feedback > h4').innerHTML = feedbackText; // replacing nothing with feedbacktext
    currentButton.innerHTML = this.playersGuess //√ assigns the latest number into the square boxes

    currentButton.classList.remove('is-warning')

    currentButton.classList.add('is-success')
    



    return feedbackText; // mainly keeping the return statement to satisfy test specs
  }

  provideHint() { 
    const hintArray = [
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
    ];
    return shuffle(hintArray); //√
  }


  generateWinningNumber() { //√
    return Math.ceil(Math.random() * 100); //ceil rounds to the next whole number
  }

  // newGame() {  //√
  //   return new Game(); //check that old game !== new game
  // }

  shuffle(arr) { //√
    //Fisher-Yates - https://bost.ocks.org/mike/shuffle/
    for (let i = arr.length - 1; i > 0; i--) { //go backwards
      let randomIndex = Math.floor(Math.random() * (i + 1)); //i+1 to exclude 0
      let temp = arr[i];// element where you are at
      arr[i] = arr[randomIndex]; //reassigning the element with rando
      arr[randomIndex] = temp; //reassigning rando with element
    }
    return arr;
  }

  playGame() {

    // const game = newGame(); //√
    
    // We are grabbing the button from our html
    const goButton = document.getElementById('submit'); //√
    const resetButton = document.getElementById('reset')
    const hintButton = document.getElementById('hint')
    const guessList = document.getElementById('guess-list')

    // We are listening for when the use clicks on our button.
    // When they click, we will check in the input field to see if they have guessed a number. Then we will run the function `checkGuess`, and give it the player's guess, the winning number, and the empty array of guesses!
    goButton.addEventListener('click', () => { // use arrow function ** look up this
    console.log(this);
      const playersGuess =+ document.querySelector('input').value; //√ gets the value from text box

      document.querySelector('input').value = ''; // reassigning the value to an empty string
      
      this.playersGuessSubmission(playersGuess); //passes the input value into the playersGuessSubmission method
    });

    // goButton.addEventListener('click', function() { // use arrow function ** look up this
    //   console.log(this);
    //   // const playersGuess =+ document.querySelector('input').value; //√ gets the value from text box

    //   // document.querySelector('input').value = ''; // reassigning the value to an empty string
      
    //   // this.playersGuessSubmission(playersGuess); //passes the input value into the playersGuessSubmission method
    // });

    resetButton.addEventListener('click', () => {

      document.querySelector('input').value = '';

      document.querySelector('#guess-feedback > h4').innerHTML = ''; // replacing nothing with feedbacktext

  
     const guessBoxes = [...document.getElementsByClassName('guess-box')]

     guessBoxes.map(box => {
      box.classList.remove('is-success');
      box.classList.add('is-warning');
     })

      for(let i = 1; i <= 5 ; i++){
        document.querySelector(`#guess-list li:nth-child(${i})`).innerHTML = '-'
      }
      this.playersGuess = null
      this.winningNumber = this.generateWinningNumber()
      this.pastGuesses = []

    });

    hintButton.addEventListener('click', () => {

      if (this.winningNumber % 2 !== 0) document.querySelector('#guess-feedback > h4').innerHTML = `The number is Odd` 
      else document.querySelector('#guess-feedback > h4').innerHTML = `The number is Even`
      

    })

    guessList.addEventListener('click', (event) => {
      const feedback = document.querySelector('#guess-feedback > h4').innerHTML
      const buttonClicked = event.target;
      const buttonValue = parseInt(buttonClicked.innerHTML)
      if(buttonValue === '')
      feedback.innerHTML = `You chose ${buttonValue}`;

    });




  }
}


// start up the game!
//playGame(); // note: running this function will cause the test specs to fail
const myGame = new Game();
myGame.playGame();
