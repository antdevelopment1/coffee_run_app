// =======================================
// Dom Selection
// =======================================
const orderForm = document.querySelector('[data-form]');
const notificationArea = document.querySelector('[data-notification]');

const orderListingArea = document.querySelector('[data-order-area]');
const orderListingButton = document.querySelector('[data-load-orders]')

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
    fetch(url, {
        method: method,
        headers: {
        "Content-type": "application/json; charset=utf-8",   
        },
        body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then( (orderInfo) => { //Wrap it in a anonymous function  
        // First checks for the exsistance of then name.
        if (orderInfo.name && (orderInfo.name === "Validation error")) {
            notifyUser(`I'm sorry. Please fill out the coffee field and the email address field.`);
        } else {
            notifyUser(`Your coffee is totally (not) on the way.`)
        }
    })
}

// ===================
// Comfirm Users Order
// ===================
function notifyUser(notificationText) {
    // Create a div
    const notificationBox = document.createElement('div');
    // Add some text content
    // Must checl for exsistance of first child
    // if (notificationArea.firstChild) {
    //     notificationArea.removeChild(notificationArea.firstChild);
    // }
    notificationBox.textContent = notificationText;
    notificationArea.innerHTML = "";
    // Append to Something
    notificationArea.appendChild(notificationBox);
}

function getAndShowOrders(event) {
    console.log('Hey a click');
    fetch()
    // console.log(event);

}

// =======================================
// Main Event Listeners
// =======================================
console.log('About to add event listener');
orderForm.addEventListener('submit', handleSubmit);
orderListingButton.addEventListener('click', getAndShowOrders);

