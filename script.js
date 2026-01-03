// Locomotive Scroll Initialization

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
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
    duration: 1.2,
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
const closeBtn = document.getElementById("closePopup");
let popupname = document.querySelector("#popupname");
let popupprice = document.querySelector("#popupprice");
let itemImage = document.querySelector("#itemImage");
let itemqty = document.querySelector("#itemqty");

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
    overlay.classList.remove("active");
    addToCart(
      selectedItem.dataset.name,
      Number(selectedItem.dataset.price),
      selectedItem.dataset.image
    );
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
    itemBtn.addEventListener("click", () => removeItem(index, itemName));

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

document.addEventListener("DOMContentLoaded", () => {
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
});

// Remove item from cart function

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayItem();
  itemCount();
  Removepopup();
}

let popupOrder = document.querySelector("#popupOrder");
let popoupRemove = document.querySelector("#popoupRemove");
let ispopup = true;
function Removepopup() {
  if (ispopup) {
    popupOrder.style.display = "block";
    popoupRemove.innerHTML = `Cancel the order`;

    setTimeout(() => {
      popupOrder.style.display = "none";
    }, 900);
  }
}
