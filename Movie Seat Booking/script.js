// container
const container = document.querySelector('.container');

// seats that are not occupied selects all the class seat that not have the class occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

// get count and total
const count = document.getElementById('count');
const total = document.getElementById('total');

// select list
const movieSelect = document.getElementById('movie');

populateUI();

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
    // spread operator will put the values of the array rather than the array

    const seatIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat)
    });

    // store the seldcted seats in the browswer local storage
    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = parseFloat(selectedSeatsCount * ticketPrice).toFixed(2);
}




// saved seleted movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);

}

// get movie from local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // just to help you understand the index and seat being used in the function right below it
    // seats.forEach((seat, index) => console.log(seat, index));
    
    // we want to add selected to the selected seats from the local storage
    if(selectedSeats !== null && selectedSeats.length > 0 ){
        seats.forEach((seat, index)=>{
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }


    // selected movie index
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    
    console.log(selectedMovieIndex)

    if (selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
        
    }

    
}


// movie select event
movieSelect.addEventListener('change', (e)=>{
    ticketPrice = parseFloat(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value)
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



// inisital page local counter and total values
updateSelectedCount();


