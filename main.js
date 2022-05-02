let textArea = document.getElementById('pList');
let rollBtn = document.getElementById('roll')
let boxList = document.getElementById('boxList')
let winner = document.querySelector('.winner')
let pointer = document.querySelector('.pointer')

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

let coords = [pointer.getBoundingClientRect().right/2, pointer.getBoundingClientRect().right/2 + 120];

rollBtn.addEventListener('click', e => {
    boxList.innerHTML = ""
    //take names from textarea and create array
    let participants = textArea.value.trim().split('\n')
    //create html li element for each array element and append to boxList ul element
    if (participants.length < 5) {
        let pNum = participants.length;
        for (let i = 0; i < pNum; i++) {
            participants.push(...textArea.value.trim().split('\n'))
        }
    }
    boxList.style.left = -participants.length * 7 * 16 + 'px'

    shuffle(participants).forEach(participant => {
        let list = document.createElement('li');
        list.classList.add('list')
        list.innerText = participant
        boxList.appendChild(list)
    })

    boxList.classList.add('rollanimation')

    setTimeout(_ => {
        boxList.classList.remove('rollanimation')
        boxList.removeAttribute("style")

        document.querySelectorAll('.list').forEach(l => {
            let lRight = l.getBoundingClientRect().right;
            if (coords[0] <= lRight && lRight <= coords[1]) {
                winner.innerText = "Winner is: " + l.innerText
            }
        })
    }, 2000)
})