// Locomotive Scroll Initialization
const main = document.querySelector("#main");
//  document.querySelector("#main")
const scroll = new LocomotiveScroll({
  el: main,
  smooth: true,
});

// GSAP Animation for Hero and About section
function animatedeWebsite() {
  const element = gsap.timeline();
  // Hero section animation
  element.from(".hero-section .Hero", {
    opacity: 0,
    y: -800,
    duration: 1.1,
    stagger: 0.4,
  });

  // order page section styling

  gsap.from("#cartItems", {
    opacity: 0,
    y: 500,
    scale: 2,
    duration: 1,
  });

  // About Section Animation
  element.from(".about-coffee", {
    opacity: 0,
    y: -250,
    duration: 1,
    stagger: 0.4,
  });

  // Menu Section Animation
  element.from(".item-1", {
    opacity: 0,
    y: -450,
    duration: 1.2,
    stagger: 0.3,
  });

  element.from(".coffe-table-book", {
    opacity: 0,
    y: 300,
    stagger: 0.5,
    duration: 1.2,
  });

  // Users section
  element.from(".users", {
    opacity: 0,
    y: -500,
    duration: 0.9,
    stagger: 0.4,
  });

  // Gallery section
  element.from(".img-1", {
    opacity: 0,
    y: 500,
    duration: 1,
    stagger: 0.4,
  });
  // Contact section
  element.from(".contact-sec", {
    opacity: 0,
    y: 200,
    duration: 0.8,

    stagger: 0.2,
  });
}

animatedeWebsite();

// Navbar code working
let MenuBar = document.querySelector("#MenuBar");
let NavLink = document.querySelector("#NavLink");
let isclick = false;

MenuBar.addEventListener("click", () => {
  if (isclick) {
    NavLink.classList.remove("add");
    MenuBar.style.color = "white";
    MenuBar.setAttribute("class", "fa-solid fa-bars");
  } else {
    NavLink.classList.add("add");
    MenuBar.style.color = "red";
    MenuBar.setAttribute("class", "fa-solid fa-xmark");
  }
  isclick = !isclick;
});

// Page Navigation code
const NavBar = document.querySelectorAll(".link");
NavBar.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = link.dataset.target;
    scroll.scrollTo(`#${id}`);
  });
});

// Main Code working

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
  return localStorage.setItem("cart", JSON.stringify(cart));
}

// Item count display function

function itemCount() {
  let cart = getCart();
  let totalValue = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector("#cart-count").innerText = totalValue;
}

itemCount();

// Order button functionality

let OrderButtons = document.querySelectorAll(".orderBtn");
const overlay = document.getElementById("overlay");
let closeBtn = document.getElementById("closePopup");
let popupname = document.querySelector("#popupname");
let popupprice = document.querySelector("#popupprice");
let itemImage = document.querySelector("#itemImage");
let itemqty = document.querySelector("#itemqty");
let confirmMsg = document.querySelector("#confirmMsg");
let inputQty = document.querySelector("#inputQty");

// Order buttons functionality
let selectedItem = null;

OrderButtons.forEach((button) => {
  button.addEventListener("click", function () {
    selectedItem = this.closest(".item-1");
    let name = selectedItem.dataset.name;
    let price = Number(selectedItem.dataset.price);
    let image = selectedItem.dataset.image;

    overlay.classList.add("active");
    itemImage.src = `${image}`;
    itemImage.classList.add("item-image");
    popupname.innerHTML = `<b>Name</b>: ${name}`;
    popupprice.innerHTML = `<b>Price</b>: ${price}`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  closeBtn.addEventListener("click", () => {
    let Qty = Number(inputQty.value);
    if (!Qty) return;
    addToCart(
      selectedItem.dataset.name,
      Number(selectedItem.dataset.price),
      selectedItem.dataset.image,
      Qty
    );
    overlay.classList.remove("active");

    document.querySelector("#inputQty").value = "";
  });
  cancelPopup();
});

// Popup cancel function

function cancelPopup() {
  let CancelPopBtn = document.querySelector("#CancelPopBtn");
  CancelPopBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
}

// Add to cart function
function addToCart(name, price, image, Qty) {
  let cart = getCart();

  let existingitem = cart.find((item) => item.name === name);

  if (!Qty) return;

  if (existingitem) {
    existingitem.quantity += Qty;
  } else {
    cart.push({ name, price, image, quantity: Qty });
  }
  saveCart(cart);
  itemCount();
}

// Display item in order page

function displayItem() {
  let cart = getCart();
  let cartContainer = document.querySelector("#cartItems");

  cartContainer.innerHTML = "";
  cart.forEach((item, index) => {
    let container = document.createElement("div");
    container.classList.add("container");

    let itemindex = index + 1;
    let itemIndexP = document.createElement("p");
    itemIndexP.classList.add("itemIndex");
    itemIndexP.innerText = `${itemindex}`;

    let itemName = document.createElement("p");
    itemName.classList.add("itemName");
    itemName.innerText = `${item.name}`;

    let itemimg = document.createElement("img");
    itemimg.classList.add("itemimg");
    itemimg.src = `${item.image}`;

    let itemprice = document.createElement("p");
    itemprice.classList.add("itemprice");
    itemprice.innerText = `₹${item.price * item.quantity}`;

    let itemqty = document.createElement("p");
    itemqty.classList.add("itemqty");
    itemqty.innerText = `${item.quantity}`;

    let itemBtn = document.createElement("button");
    itemBtn.classList.add("ItemBtn");
    itemBtn.innerText = "Cancle";
    itemBtn.addEventListener("click", () => removeItem(index));

    container.appendChild(itemIndexP);
    container.appendChild(itemName);
    container.appendChild(itemimg);
    container.appendChild(itemprice);
    container.appendChild(itemqty);
    container.appendChild(itemBtn);
    cartContainer.appendChild(container);
    scroll.update();
  });
}
displayItem();

// to show empty cart image
function emptycart() {
  let emptyimg = document.querySelector("#emptyImg");
  let cart = getCart();
  if (cart.length === 0) {
    emptyimg.style.display = "block";
  } else {
    emptyimg.style.display = "none";
  }
}
emptycart();

// Remove item from cart function

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayItem();
  itemCount();
  Removepopup();
  console.log("Item clicked");
}

// Toast message function
let popupOrder = document.querySelector("#popupOrder");
let popoupRemove = document.querySelector("#popoupRemove");
let ispopup = true;
function Removepopup() {
  if (ispopup) {
    popupOrder.style.display = "block";
    popoupRemove.innerHTML = `Cancel the order ❌`;

    setTimeout(() => {
      popupOrder.style.display = "none";
    }, 900);
  }
}
