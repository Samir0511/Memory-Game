 let CardDeck = [
        'fa-cube',
        'fa-bicycle',
        'fa-bomb',
        'fa-paper-plane-o',
        'fa-diamond',
        'fa-bolt',
        'fa-anchor',
        'fa-leaf',
    ];
    let flippedCards = [],flippedicons = [];
    let moves = 0,cardopen = 0,id=0, cardid = 0;
    let cardindex = [];
    var htmlelement = "";
    let CardDeck2 = [];
    let hintcard = [] ;
    let hints = 5;
    let seconds = Math.floor(Math.random() * 60)+50;

    while(CardDeck.length !=0)
    {
        let randomIndex = Math.floor(Math.random() * CardDeck.length);
        cardid++;
        cardindex.push(randomIndex);
        let randomCard = CardDeck[randomIndex];
        let val = CardDeck.splice(randomIndex, 1);
        CardDeck2.push(val);
        hintcard.push(val);
        htmlelement +=  `<li class = 'card' id ='${cardid}' ><i class = 'fa ${val}'></i> </li>`;
    }
    
    while(CardDeck2.length !=0)
    {
        let randomIndex = Math.floor(Math.random() * CardDeck2.length);
        cardid++;
        cardindex.push(randomIndex);
        let randomCard = CardDeck2[randomIndex];
        let val = CardDeck2.splice(randomIndex, 1)[0];
        hintcard.push(val);
        htmlelement +=  `<li class = 'card' id ='${cardid}' ><i class = 'fa ${val}'></i> </li>`;
    }
    let divElement = document.getElementById("deck");
    divElement.innerHTML = htmlelement;
    window.onload = timer();
    let time= setInterval(timer, 1000);
    function timer() {
    if(seconds ==0)
    {
    let winpage = document.getElementById("winpage");
    winpage.classList.remove("closed");
    document.getElementById('gamemessage').innerHTML = "Game Over";
    document.getElementById('movescount').innerHTML = "Your Moves "+moves;
    document.getElementById('finaltime').innerHTML = " ";
    clearInterval(time);
    
    }
    else
    {
        let timer = document.getElementById('timer');
        seconds--;
        timer.innerHTML = ('00' + Math.floor(seconds / 60)).slice(2) + ':' + ('00' + (seconds % 60)).slice(-2);
    }  
    }
    function hint() {

        console.log(hintcard)
        if (hints > 0 || hintcard.length < 2) {
            let randomIndex = Math.floor(Math.random() * hintcard.length);
            let randomCard = hintcard[randomIndex];
            for (let i = 0; i < hintcard.length; i++) {
              
               if(randomCard[0] == hintcard[i])
               {
                
               let cardElement =  document.getElementsByClassName(`${randomCard}`);
               let Cardtag =  document.getElementById(`${randomIndex}`);

                if (cardElement) {


                    cardElement[0].classList.add('hint');  
                    cardElement[1].classList.add('hint');  
                        
                    document.getElementById('hint').style.display ='none';
                        setTimeout(() => {
                            cardElement[0].classList.remove('hint');
                            cardElement[1].classList.remove('hint');
                            let hintbtn =  document.getElementById('hint').innerHTML;
                            document.getElementById('hint').style.display ='block';
                            document.getElementById('hint').innerHTML =" "+ hints +" Hints left";



                        }, 1500);

                        break;
                        
                }
        
               }
                
            }
            
            hints--;
        } else {
            alert("No more hints available");
        }
    }
    
    
    function winPage() {
    let winpage = document.getElementById("winpage");
    winpage.classList.remove("closed");
    document.getElementById('movescount').innerHTML = moves;
    document.getElementById('gamemessage').innerHTML = "Congratulation";
    document.getElementById('finaltime').innerHTML = "You Save time "+Math.floor(seconds/60) +" minute and "+(seconds%60)+" seconds";
        clearInterval(time);

    }

    function Restart() {
        location.reload();
        moves=0;
        let seconds = Math.floor(Math.random() * 65)+100;
        document.getElementById('moves').innerHTML = moves;
        let winpage = document.getElementById("winpage");
        winpage.classList.add("closed");
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => card.classList.remove('open','match'));
        let deck = document.querySelectorAll('.deck li');
        deck.forEach(deck => deck.classList.remove('open','show'));
        let icons = document.querySelectorAll('.icon');
        icons.forEach(icon => icon.classList.remove('open'));
        let stars = document.querySelectorAll('.stars li');
        stars.forEach(star => star.classList.remove('active'));
        document.getElementById('timer').innerHTML = '00:00:00';
        setInterval(timer, 1000)
    }
    
    function showInnerDivId()
      {
        document.querySelector('.deck').addEventListener('click', function(event) {
            if (event.target.classList.contains('card')) {
                console.log('Clicked child ID:', event.target.id);
            }
        });
        var cardId = event.target.id;


        var card = document.getElementById(cardId);

        if (card.classList.contains('open') || flippedCards.length ==2)
        {
          
        return;
        }
        else
        {
            card.classList.remove('close');
            card.classList.add('open');
        }
        flippedCards.push(card);
        flippedicons.push(card.getElementsByTagName('i')[0].classList.item(1));
        if (flippedCards.length === 2)
        {
            checkcards(flippedCards, flippedicons);
        }
    }
    function checkcards(cards, icons) {
        let [card1, card2] = cards;
        let [icon1, icon2] = icons;
    
        if (icon1 === icon2) {
            card1.classList.add('match', 'blur');
            card2.classList.add('match', 'blur');
    
            hintcard = hintcard.filter(icon => icon[0] !== icon1);
    
            moves++;
            document.getElementById('moves').innerHTML = moves;
            flippedCards = [];
            flippedicons = [];
            cardopen += 2;
            if (cardopen === 16) {
                winPage();
            }
        } else {
            setTimeout(function() {
                card1.classList.remove('open');
                card2.classList.remove('open');
                card1.classList.add('close');
                card2.classList.add('close');
    
                flippedCards = [];
                flippedicons = [];
            }, 1000);
        }
    }