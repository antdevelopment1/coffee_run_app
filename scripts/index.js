// =======================================
// Dom Selection
// =======================================
const orderForm = document.querySelector('[data-form]');
const confirmOrderDiv = document.querySelector('[data-confirm]');
// const waitASec = document.querySelector('[data-wait');

// =======================================
// Helper Functions
// =======================================
function handleSubmit(event) {
    event.preventDefault();
    // console.log('You get a coffee. And you get a monkey. And you get a puppy');

    const url = event.target.action;
    const method = event.target.method;
    const elements =  event.target.elements;
    const data = {
        strength: elements.strength.value,
        flavor: elements.flavor.value,
        size: elements.size.value,
        coffee: elements.coffee.value,
        emailAddress: elements.emailAddress.value
    };
    if (data.flavor === "" || 
        data.size === "" || 
        data.coffee === "" || 
        data.emailAddress === "") {
        errorMessage.textContent = "Invalid Please fill in the form. Please Try Again!!!";
        confirmOrderDiv.appendChild(errorMessage);
        confirmOrderDiv.classList.add('messageBox');
    } else {
        errorMessage.textContent = "";
        fetch(url, {
            method: method,
            headers: {
            "Content-type": "application/json; charset=utf-8",   
            },
            body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(holdOn)
    }
}
// ===================
// Comfirm Users Order
// ===================
let message = document.createElement('h1');
let oneMoment = document.createElement('p');
let errorMessage = document.createElement('h1');

function holdOn(wait) {
    confirmOrderDiv.classList.add('messageBox');
    oneMoment.textContent = 'One moment please while we place your order...';
    confirmOrderDiv.appendChild(oneMoment);
    triggerOrderConfirmation();
}
function triggerOrderConfirmation(order) {
    setTimeout(function confirmOrder(order) {
        message.textContent = "You order has been placed and will be ready for pickup in three to five minutes.";
        confirmOrderDiv.appendChild(message);
    }, 4000) 
}

// =======================================
// Main Event Listeners
// =======================================
console.log('About to add event listener');
orderForm.addEventListener('submit', handleSubmit);