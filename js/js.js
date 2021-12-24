var blocksSelected = [];

// for start the gaame;
document.getElementById("start").onclick = function() {
    let name = prompt("Enter your name:").trim();
    if (name != null && name != "") {
        document.getElementById("name").innerHTML = name;
    } else {
        document.getElementById("name").innerHTML = "unKnown";
    }
    document.querySelector(".start").remove();
}

// do when the user win
document.getElementById("playAgain").onclick = function() {
    window.location.reload(true);
}

var duration = 1000;
// get all blocks 
var blocks = document.querySelectorAll(".block");

// get all indexes for get the random array
var orderArray = Array.from(blocks.keys());

//get  random array
randomArray(orderArray);

// set order for the img
for (let i = 0; i < orderArray.length; i++) {
    blocks[i].style.order = orderArray[i];
    blocks[i].addEventListener("click", () => {
        flibBlock(blocks[i]); // for give i alistener
    })

}



// for  add the class is-flipped
function flibBlock(block) { // selected block
    block.classList.add("is-flipped");
    blocksSelected.push(block);
    if (blocksSelected.length == 2) {
        // stop click for one sec
        stopClick();
        checkEquals(blocksSelected[0], blocksSelected[1]);
    }



}

// for stop click  for checks
function stopClick() {
    document.querySelector(".container").classList.add("noClick");
    setTimeout(() => {
        document.querySelector(".container").classList.remove("noClick");
    }, duration);
}


// for check 
function checkEquals(fisrt, seconed) {

    let wrongAmswer = document.getElementById("wrongCase");
    let goodAnswer = document.getElementById("goodCase");

    //check equal or not
    if (fisrt.dataset.img === seconed.dataset.img) {
        setTimeout(() => {
            fisrt.classList.remove("is-flipped");
            seconed.classList.remove("is-flipped");
            fisrt.classList.add("keep");
            seconed.classList.add("keep");
        }, duration);
        goodAnswer.innerHTML = parseInt(goodAnswer.innerHTML) + 1;

        document.getElementById("success").play();

        // for check if the user win or not
        setTimeout(() => {
            if (parseInt(goodAnswer.innerHTML) == 10) {
                document.querySelector(".win").style.display = "block";
            }
        }, 1000)





    } else {
        wrongAmswer.innerHTML = parseInt(wrongAmswer.innerHTML) + 1;
        setTimeout(() => {
            fisrt.classList.remove("is-flipped");
            seconed.classList.remove("is-flipped");

        }, duration);
        document.getElementById("fail").play();

    }
    blocksSelected = [];



}


// for return the random orfer array
function randomArray(arr) {
    let index = arr.length - 1,
        temp;
    while (index >= 0) {
        // for swape
        let randomNumber = Math.floor(Math.random() * arr.length);
        temp = arr[index];
        arr[index] = arr[randomNumber];
        arr[randomNumber] = temp;
        index--

    }
    return arr;


}