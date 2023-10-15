// Cart
let cartImg = document.querySelector(".cart-icon");
let cart = document.querySelector(".cart-style");
let cartClose = document.querySelector("#close-cart");

//Open cart
cartImg.onclick = () => {
  cart.classList.add("active");
};
//cart close
cartClose.onclick = () => {
  cart.classList.remove("active");
};

//cart working
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// function for add to cart
function ready() {
  //remove item from cart
  var cartRemove = document.getElementsByClassName("cart-remove");
  console.log(cartRemove);
  for (var i = 0; i < cartRemove.length; i++) {
    var button = cartRemove[i];
    button.addEventListener("click", removeItem);
  }

  //Change poduct quantity
  var inputQyantity = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < inputQyantity.length; i++) {
    var input = inputQyantity[i];
    input.addEventListener("change", changeQuantity);
  }
  // Add to the cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", cartClicked);
  }

  //buy product
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
//Buy Button
function buyButtonClicked() {
  location.replace("payment.html");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  totalAmount();
}

//Add cart
function cartClicked(event) {
  var button = event.target;
  var products = button.parentElement;
  var title = products.getElementsByClassName("product-title")[0].innerText;
  var price = products.getElementsByClassName("price")[0].innerText;
  var productImg = products.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  totalAmount();
}

//function to  add product to the cart
function addProductToCart(title, price, productImg) {
  var cartShopBoxs = document.createElement("div");
  cartShopBoxs.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsName = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsName.length; i++) {
    if (cartItemsName[i].innerText == title) {
      alert("You already add this item to your cart");
      return;
    }
  }

  var cartBoxContent = `
                            <img src="${productImg}" class="cart-img" alt="">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <i class="bx bxs-trash-alt cart-remove"></i>`;
  cartShopBoxs.innerHTML = cartBoxContent;
  cartItems.append(cartShopBoxs);
  cartShopBoxs
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeItem);
  cartShopBoxs
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", changeQuantity);
}

//remove item from cart
function removeItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  totalAmount();
}

//change quantity
function changeQuantity(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  totalAmount();
}

//calculate total amount
function totalAmount() {
  var cartcontent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartcontent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var productPrice = cartBox.getElementsByClassName("cart-price")[0];
    var productQuantity = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(productPrice.innerText.replace("$", ""));
    var quantity = productQuantity.value;
    total = total + price * quantity;
    //price contain cencs
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    sessionStorage.setItem("total", total);
  }
}

//set the total amout to a setter
sessionStorage.setItem("total", totalAmount());
