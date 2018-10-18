// =======================================
// Dom Selection
// =======================================
const orderForm = document.querySelector('[data-form]');

// =======================================
// Helper Functions
// =======================================
function handleSubmit(event) {
    event.preventDefault();
    console.log('You get a coffee. And you get a monkey. And you get a puppy');

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
         "Content type": "application/json; charset=utf-8",   
        },
        body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(console.log)
}
// =======================================
// Main Event Listeners
// =======================================
console.log('About to add event listener');
orderForm.addEventListener('submit', handleSubmit);