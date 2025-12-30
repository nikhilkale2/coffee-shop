// Locomotive Scroll Initialization

// const { use } = require("react");

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// GSAP Animation for Hero and About section
function animateHeroabout() {
  const element = gsap.timeline();
  // Hero section animation
  element.from(".hero-section", {
    opacity: 0,
    y: -400,
    duration: 1,
    delay: 1,
  });

  // order page section styling

  element.from("#cart-items", {
    opacity: 0,
    y: 500,
    scale: 2,
    duration: 1.2,
    // delay: 0.4,
  });

  // About Section Animation
  element.from(".about-coffee", {
    opacity: 0,
    y: -250,
    duration: 1,
    stagger: 0.4,
    // delay: 1.9,
  });

  // Menu Section Animation
  element.from(".item-1", {
    opacity: 0,
    y: -450,
    duration: 1.1,
    stagger: 0.3,
    // delay: 3.9,
  });

  element.from(".coffe-table-book", {
    opacity: 0,
    y: 300,
    stagger: 0.5,
    duration: 1.2,
    // delay: 7.5,
  });

  element.from(".users", {
    opacity: 0,
    y: -500,
    duration: 0.9,
    stagger: 0.4,
    // delay: 8.4,
  });

  element.from(".img-1", {
    opacity: 0,
    y: 500,
    duration: 1.9,
    stagger: 0.4,
    // delay: 10,
  });

  element.from(".contact-sec", {
    opacity: 0,
    y: 200,
    duration: 0.8,
    // delay: 13,
    stagger: 0.2,
  });
}

animateHeroabout();

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
const closeBtn = document.getElementById("closePopup");
let popupname = document.querySelector("#popupname");
let popupprice = document.querySelector("#popupprice");
let itemImage = document.querySelector("#itemImage");
let itemqty = document.querySelector("#itemqty");
//let input = document.querySelector("#itemqty");

// Order buttons functionality

OrderButtons.forEach((button) => {
  button.addEventListener("click", function () {
    let cart = getCart();

    let item = this.closest(".item-1");
    let name = item.dataset.name;
    let price = Number(item.dataset.price);
    let image = item.dataset.image;

    overlay.classList.add("active");
    itemImage.src = `${image}`;
    itemImage.classList.add("item-image");
    popupname.innerHTML = `<b>Name</b>: ${name}`;
    popupprice.innerHTML = `<b>Price</b>: ${price}`;

    //let qty = Number(input.value);

    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
    });

    addToCart(name, price, image);
  });
});

function addToCart(name, price, image) {
  let cart = getCart();

  let existingitem = cart.find((item) => item.name === name);

  if (existingitem) {
    existingitem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }
  saveCart(cart);
  itemCount();
}

// Display item in order page

function displayItem() {
  let cart = getCart();
  let cartContainer = document.querySelector("#cart-items");

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
    itemBtn.classList.add("itemBtn");
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
// Remove item from cart function

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayItem();
  itemCount();
  popupfunction();
}
