// container
const container = document.querySelector('.container');

// seats that are not occupied selects all the class seat that not have the class occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

// get count and total
const count = document.getElementById('count');
const total = document.getElementById('total');

// select list
const movieSelect = document.getElementById('movie');

// movieslect current value
let ticketPrice = parseFloat(movieSelect.value); // or we could say +movieSelect.value;
// console.log(typeof +movieSelect.value)

// update totals and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // we want to save the selected seats into a local storage
    // 1.copy the selected seats into an arreay
    // 2.Map through array
    // 3. return a new array method




    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = parseFloat(selectedSeatsCount * ticketPrice).toFixed(2);
}

// movie select event
movieSelect.addEventListener('change', (e)=>{
    ticketPrice = parseFloat(e.target.value);
    updateSelectedCount();
})


//  we can add event listern to the container to see where it has been clicked
// seat clicked event
container.addEventListener('click', (e) => {
    //console.log(e.target); // target tells you where in the container it has been clicked
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        // add the selected class
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();
})







