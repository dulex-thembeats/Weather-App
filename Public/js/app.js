console.log('this is javascript on the frontend');

// const url = 'http://puzzle.mead.io/puzzle';

// fetch(url)
// .then((resp) => resp.json()) // Transform the data into json
// .then((data) =>{
//     console.log(data); // Create and append the li's to the ul
//   })




const form = document.querySelector('form');
const inputValue = document.querySelector('input');
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const search = inputValue.value;
    message1.textContent = 'Loading..'
    message2.textContent = ''
    
const url = `/weather?address=${search}`;
fetch(url)
.then((resp) => resp.json())
.then((data) => {
    if(data.error){
        message1.textContent = data.error
    }else{
        message1.textContent = data.forecast
        message2.textContent = data.location
    }
})
})