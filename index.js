function project(){
	document.body.style.background = '#999';

	let rounds = ['One','Two','Three','Four',
	'Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen',
	'Fourteen',"Fifteen",'Sixteen','Seventeen','Eighteen','Nineteen','Twenty',
	'twenty-one','Twenty-two','Twenty-three','Twenty-four','Twenty-five','Twenty-six','Twenty-seven','Twenty-eight'];

	let suit = ['Heart','Diamond','Spade','Club'];
	let value = ['Ace','King','Queen','Jack','Two',
	             'Three','Four','Five','Six','Seven',
	             'Eight','Nine','Ten'];

	const createDeck = ()=>{
		let packOfDeck = [];
		for(let s of suit){
			for(let v of value){
				let cards = {
					suit:s,
					value:v
				}

				packOfDeck.push(cards)
			}
		}

		return packOfDeck;
	}

	let gameStart = false,
	    gameOver = false,
	    tie = false;
	    playerWon = false,
	    playerCards = [],
	    dealerCards = [],
	    playerScores = 0,
	    dealerScores = 0,
	    deckPack = [];

	let newGameBtn, hitBtn, stayBtn;

	newGameBtn = document.querySelector('#newGameBtn');
	hitBtn = document.querySelector('#hitBtn');
	stayBtn = document.querySelector('#stayBtn');

	let winMassage = document.getElementById('win-massage');

	hitBtn.style.display = 'none';
	stayBtn.style.display = 'none';

	checkStatus();

	newGameBtn.addEventListener('click',(event)=>{
		gameStart = true;
		gameOver = false;
		playerWon = false;
	    tie = false;

		deckPack = createDeck();

	    shufleCards(deckPack);

		playerCards = [getNextCard(),getNextCard()];
		dealerCards = [getNextCard(),getNextCard()];

		let target = event.currentTarget;
		target.style.display = 'none';
		target.innerHTML = `End of round <strong class="round">${rounds.shift()}</strong> Play again.`;

		hitBtn.style.display = 'inline';
		stayBtn.style.display = 'inline';
	    document.querySelectorAll('.platform').forEach((x)=>{
	    	x.style.visibility = 'visible';
	    })
	    document.getElementById('win-massage').innerText = '';

	    checkStatus();
	})
	newGameBtn.addEventListener('mouseover',handleEvent,false);
	newGameBtn.addEventListener('mouseout',handleEvent,false);

	hitBtn.addEventListener('click',()=>{
	    playerCards.push(getNextCard());
	    checkEndOfGame();
	    checkStatus();
	})
	hitBtn.addEventListener('mouseover',handleEvent,false);
	hitBtn.addEventListener('mouseout',handleEvent,false);

	stayBtn.addEventListener('click',()=>{
		gameOver = true;
		checkEndOfGame();
		checkStatus();
	})
	stayBtn.addEventListener('mouseover',handleEvent,false);
	stayBtn.addEventListener('mouseout',handleEvent,false);

	const getNextCard = ()=>{
		return deckPack.shift();
	}

	const getCardString = (card)=>{
		return card.value + ' ' +'of'+' '+ card.suit;
	}

	const getCardNumericalValue = (card)=>{
		if(card.value === 'Ace'){
			return 1;
		}else if(card.value === 'Two'){
			return 2;
		}else if(card.value === 'Three'){
			return 3;
		}else if(card.value === 'Four'){
			return 4;
		}else if(card.value === 'Five'){
			return 5;
		}else if(card.value === 'Six'){
			return 6;
		}else if(card.value === 'Seven'){
			return 7;
		}else if(card.value === 'Eight'){
			return 8;
		}else if(card.value === 'Nine'){
			return 9;
		}else{
			return 10;
		}
	// Card this array will be either the player of dealer cards array.
		/*switch(card.value){
			case 'Ace':
			return 1;
			case 'Two':
			return 2;
			case 'Three':
			return 3;
			case 'Four':
			return 4;
			case 'Five':
			return 5;
			case 'Six':
			return 6;
			case 'Seven':
			return 7;
			case 'Eight':
			return 8;
			case 'Nine':
			return 9;
			default:
			return 10;
		}*/
	}
	   
	function getScore(cardArray){
		let score = 0;
		let hasAce = false;

		for(let oneCard of cardArray){
	        score += getCardNumericalValue(oneCard);
	        if(oneCard.value === 'Ace'){
	        	hasAce = true
	        } 
		}

		if(hasAce && score + 10 <= 21){
			return score + 10;
		}else{
			return score;
		}
	}

	function updateScores(){
		playerScores = getScore(playerCards);
		dealerScores = getScore(dealerCards);
	}

	const shufleCards = (deck)=>{
	   for(let i=0; i<deck.length; i++){
	   	  let swapIndx = Math.trunc(Math.random() * deck.length);
	   	  let tmpValues = deck[swapIndx];
	   	  deck[swapIndx] = deck[i];
	   	  deck[i] = tmpValues;
	   }
	}

	function checkEndOfGame(){
	   updateScores();

	   if(gameOver){
	   	  if(dealerScores < playerScores && playerScores < 21 && dealerScores < 21){
		   	  dealerCards.push(getNextCard());
		   	  updateScores();
		  }	  
	   }

	   if(playerScores > 21){
	   	  playerWon = false;
	   	  gameOver = true;
	   }else if(dealerScores > 21){
	   	 playerWon = true;
	   	 gameOver = true;
	   }else if(gameOver){
	   	 if(playerScores === 21){
	   	 	playerWon = true;
	   	 }else if(dealerScores === 21){
	        playerWon = false;
	   	 }else if(playerScores > dealerScores){
	   	 	let dif = playerScores - dealerScores;
	   	 	if(dif < 3){
	   	 	playerWon = true;
	   	    }
	   	 }else if(dealerScores > playerScores){
	   	 	let difTwo = dealerScores - playerScores;
	   	 	if(difTwo < 2 ){
	   	 	 playerWon = true;
	   	 	} 
	   	 }else if(playerScores === dealerScores){
	   	 	tie = true;
	   	 }
	   }
	}

	function checkStatus(){
	    updateScores();

		let dealerText = document.getElementById("dealerText");
		dealerText.innerText = '';
		for(let string of dealerCards){
			dealerText.innerText += '\n' + getCardString(string) + '\n';
		}

	    if(dealerScores > 0){
	    	document.getElementById('dealerScore').innerHTML = `<strong>Score:</strong> <span class="bold">
	    	                                                   ${dealerScores}</span>`;
	    }

		let playerText = document.getElementById('playerText');
		playerText.innerText = ''
		for(let string of playerCards){
			playerText.innerText += '\n' + getCardString(string) + '\n';
		}

	    if(playerScores > 0){
	    	document.getElementById('playerScore').innerHTML = `<strong>Score:</strong> 
	    	                                                   <span class="bold">${playerScores}</span>`;
	    }

	    

	    if(gameOver){
	      if(tie){
	        document.getElementById('win-massage').innerText = 'There was a tie'
	      }else{
	      	if(playerWon){
	    		winMassage.innerText = 'Congratulation You have won this round 10 point have been add to your progress bar.';
	    		winMassage.style.color = 'red';
	    	}else{
	    		winMassage.innerText = 'Sorry! The dealer has Won! Try again';
	    		winMassage.style.color = 'green';    		
	     	}
	      }

	    	newGameBtn.style.display = 'inline';
	    	hitBtn.style.display = 'none';
	    	stayBtn.style.display = 'none';
	    	increaseValue();
	    }
	}

	function increaseValue(){
		let playerProgress = document.getElementById('playerProgress');
		let dealerProgress = document.getElementById('dealerProgress');
		let dealerValue;
		let playerValue;

		let valueDs = document.getElementById('valueDs');
		let valuePs = document.getElementById('valuePs');

		if(winMassage.innerHTML === 'Sorry! The dealer has Won! Try again'){

		   dealerValue = dealerProgress.value
		   dealerValue =  dealerValue+10;
		   valueDs.innerHTML = dealerValue
		
		   dealerProgress.value = dealerValue;

		   valueDs.innerHTML = `${dealerProgress.value}%  `;
	       

	       dealerCongrats(dealerProgress.value)


		}else if(winMassage.innerHTML === 'Congratulation You have won this round 10 point have been add to your progress bar.'){

			playerValue = playerProgress.value;
			playerValue = playerValue+10;
			playerProgress.value = playerValue;
	        valuePs.innerHTML = ` ${playerProgress.value}%  `;

			playerCongrats(playerProgress.value)
		}
	    
	}

	function handleEvent(event){
		if(event.type === 'mouseover'){
			event.currentTarget.style.background = 'red';
		}else if(event.type === 'mouseout'){
			event.currentTarget.style.background = '';
		}
	}

	function dealerCongrats(total){

		let mainPlatform = document.querySelector('.mainplatform');
		let platForm = document.querySelectorAll('.platform');

		if(total === 100){
			mainPlatform.classList.add('invisible-platformD');
			mainPlatform.classList.add('plat');
	        
	        let introduction = document.querySelector('.intro');
			introduction.innerHTML = `<strong>Ops! the dealer has won all the rounds!!!</strong>`;
			introduction.classList.add('animation');
			winMassage.innerHTML = '';
	        
			platForm.forEach((elements)=>{
				elements.style.visibility = 'hidden';
			})

			newGameBtn.innerHTML = 'Start New Game Rounds';
			newGameBtn.addEventListener('click',()=>{
				document.location.reload(true);
			});
		}    
	}
	function playerCongrats(total){

		let mainPlatform = document.querySelector('.mainplatform');
		let platForm = document.querySelectorAll('.platform');

	    if(total === 100){
			mainPlatform.classList.add('invisible-platformP');
			mainPlatform.classList.add('plat');

			let introduction = document.querySelector('.intro');
			introduction.innerHTML = `<strong>Congratulation! You have won all the rounds!!!</strong>`;
			introduction.classList.add('animation');
			winMassage.innerHTML = '';

			platForm.forEach((elements)=>{
				console.log(elements);

				elements.style.visibility = 'hidden';
			})

			newGameBtn.innerHTML = 'Start new Game Rounds';
			newGameBtn.addEventListener('click',()=>{
				document.location.reload(true);
			});
		}
	}

	function accordion(){
		let instructionBtn = document.querySelector('.Instruction');
	    
	    instructionBtn.addEventListener('click',(event)=>{
	         let target = event.currentTarget;

	         target.classList.toggle('active');

	         let hide = target.nextElementSibling;
	         if(hide.style.display === 'block'){
	         	setTimeout(()=> hide.style.display = 'none',100);
	         }else{
	         	setTimeout(()=> hide.style.display = 'block',100);
	         }
	    })
	}
	accordion();
}

document.addEventListener("DOMContentLoaded",project,false);