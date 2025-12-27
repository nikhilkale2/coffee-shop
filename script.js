// Locomotive Scroll Initialization

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// GSAP Animation for Hero and About section
function animateHeroabout() {
  gsap.fromTo(
    "#page-1 .hero-section",
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: -30,
      duration: 1,
      delay: 0.7,
    }
  );

  // Order Section Animation
  gsap.fromTo(
    "#Orders #cart-items",
    {
      opacity: 0,
      y: 150,
    },
    {
      opacity: 1,
      y: -10,
      duration: 1.2,
      delay: 0.7,
    }
  );

  // About Section Animation
  gsap.from("#About", {
    opacity: 0,
    y: -350,
    duration: 1,
    delay: 1.9,
  });

  gsap.from(".item-1", {
    opacity: 0,
    y: -450,
    duration: 1.1,
    stagger: 0.3,
    delay: 3.8,
  });

  gsap.from(".users", {
    opacity: 0,
    y: -500,
    duration: 0.9,
    stagger: 0.4,
    delay: 7.7,
  });

  gsap.from(".img-1", {
    opacity: 0,
    y: 500,
    duration: 1.9,
    stagger: 0.4,
    delay: 9.9,
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
    //MenuBar.innerHTML = '<i class="fa-solid fa-bars"></i>';
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

OrderButtons.forEach((button) => {
  button.addEventListener("click", function () {
    let item = this.closest(".item-1");

    let name = item.dataset.name;
    let price = Number(item.dataset.price);
    let image = item.dataset.image;

    addToCart(name, price, image);
  });
});

// Add to cart function
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
}

// Scroll button functionality

let scrollBtn = document.querySelector("#Button");

scroll.on("scroll", (obj) => {
  if (obj.scroll.y >= 100) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});
