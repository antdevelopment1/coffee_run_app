// =========
// Constants
// =========
const API_URL = 'https://dc-coffeerun.herokuapp.com/api/coffeeOrders';

// =============
// Dom Selection
// =============
const orderForm = document.querySelector('[data-form]');
const notificationArea = document.querySelector('[data-notification]');

const orderListingArea = document.querySelector('[data-order-area]');
const orderListingButton = document.querySelector('[data-load-orders]')

// ================
// Helper Functions
// ================
function handleSubmit(event) {
    event.preventDefault();
    // console.log('You get a coffee. And you get a monkey. And you get a puppy');

    const url = API_URL;
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

function convertOrderToElement(orderInfo) {
    // debugger;
    const orderElement = document.createElement('p');
    const orderText = `${orderInfo.size} ${orderInfo.flavor} ${orderInfo.coffee} for ${orderInfo.emailAddress} ${orderInfo.strength}`;
    orderElement.innerHTML = orderText;
    return orderElement;
}

// Working with an array of coffee orders
function convertArrayOfOrdersToElements(giantOrder) {
    let orderArray = Object.values(giantOrder);
    let elementsArray = orderArray.map(convertOrderToElement);
    return elementsArray;
}

function getAndShowOrders(event) {
    console.log('Hey a click');
    fetch(API_URL)
        .then(response => response.json())
        .then(convertArrayOfOrdersToElements)
        .then(elementsArray => {
            // debugger;
            elementsArray.forEach(e => orderListingArea.appendChild(e));
        })
    // console.log(event);
}

// ====================
// Main Event Listeners
// ====================
console.log('About to add event listener');
orderForm.addEventListener('submit', handleSubmit);
orderListingButton.addEventListener('click', getAndShowOrders);

