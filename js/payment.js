// Get the total amount from the product cart total amount
const Total = sessionStorage.getItem("total");

// Display the total amount in the payment flatform
document.getElementsByClassName("total-price")[0].innerHTML = "$" + Total;

//add click function to the payment button
document
  .getElementsByClassName("pay-btn")[0]
  .addEventListener("click", paymentButton);

//create function to payment
function paymentButton() {
  alert("Payment Successful");
}
