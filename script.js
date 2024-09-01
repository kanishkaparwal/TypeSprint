const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

//set Value

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph(){
    const paragraph = [
        " Avoid daydreaming about the years to come.","You are the most important person in your whole life.","Always be true to who you are, and ignore what other people have to say about you.","Always be true to who you are, and ignore what other people have to say about you.","Only demonstrate your strength when its really required.", "As the final notes of the symphony faded away, the audience erupted into thunderous applause, their appreciation echoing through the grand concert hall.",
        "The old photographs scattered across the attic floor told stories of generations past, each image a window into a different time and place.","With trembling hands, she opened the letter that would determine her future, her heart racing as she unfolded the crisp paper.",
        "The ancient castle stood atop the hill, its weathered stones a testament to the centuries it had witnessed, silently guarding the secrets of the past.","The old oak tree stood tall in the center of the park, its branches reaching out like welcoming arms to all who passed by.","As the sun dipped below the horizon, the sky erupted in a brilliant display of oranges, pinks, and purples, painting the clouds with vibrant hues.","The bustling city streets were alive with the sounds of honking horns, chattering pedestrians, and the rhythmic beat of street musicians performing on every corner.","In the quiet library, students hunched over their textbooks, frantically scribbling notes as they prepared for their upcoming exams, the air thick with concentration.","The aroma of freshly baked bread wafted through the air, drawing customers into the small bakery like moths to a flame."
     ]

     const randomIndex = Math.floor(Math.random()*paragraph.length);

     typingText.innerHTML='';

     for(const char of paragraph[randomIndex]){
        typingText.innerHTML+= `<span>${char}</span>`
     }

     typingText.querySelectorAll('span')[0].classList.add('active');
     document.addEventListener('keydown',()=>{input.focus()});
     typingText.addEventListener("click",()=>{input.focus()});
}

//handle User Input

function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }

        if(char[charIndex].innerText===typedChar){
            char[charIndex].classList.add('correct');
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect');
            
        }
        charIndex++;
        if(charIndex===char.length){
            clearInterval(timer);
            input.value='';
        }
        else{
            char[charIndex].classList.add('active');
            console.log("mistakes : "+mistake);
            mistakes.innerText = mistake;
            cpm.innerText = charIndex - mistake;
        }  
    }
    else{
        clearInterval(timer);
        input.value='';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let Wpm = Math.round(((charIndex-mistake)/5)/(maxTime-timeLeft)*60);
        wpm.innerText = Wpm
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
    loadParagraph();
}

input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);

loadParagraph();