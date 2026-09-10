/* =========================================================
   BESPOKE — WEBSITE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     CART
     ======================================================= */

  let cart = JSON.parse(localStorage.getItem("bespokeCart")) || [];

  const cartBtn = document.getElementById("cartBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const closeCart = document.getElementById("closeCart");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");
  const checkoutBtn = document.getElementById("checkoutBtn");

  function saveCart() {
    localStorage.setItem(
      "bespokeCart",
      JSON.stringify(cart)
    );
  }


  function formatPrice(price) {

    return "PKR " + Number(price).toLocaleString("en-PK");

  }


  function updateCartCount() {

    const totalItems = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    cartCount.textContent = totalItems;

  }


  function renderCart() {

    if (cart.length === 0) {

      cartItems.innerHTML = `
        <div class="empty-cart">
          Your cart is empty.
        </div>
      `;

      cartTotal.textContent = "PKR 0";

      updateCartCount();

      return;
    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((item, index) => {

      total += item.price * item.quantity;


      const div = document.createElement("div");

      div.className = "cart-item";


      div.innerHTML = `

        <img
          src="${item.image}"
          class="cart-item-image"
          alt="${item.name}"
        >

        <div class="cart-item-info">

          <h3>${item.name}</h3>

          <p>
            ${formatPrice(item.price)}
            × ${item.quantity}
          </p>

          <button
            class="remove-item"
            data-index="${index}"
          >
            REMOVE
          </button>

        </div>

      `;


      cartItems.appendChild(div);

    });


    cartTotal.textContent = formatPrice(total);


    updateCartCount();


    document.querySelectorAll(".remove-item").forEach(button => {

      button.addEventListener("click", () => {

        const index = Number(
          button.dataset.index
        );

        cart.splice(index, 1);

        saveCart();

        renderCart();

      });

    });

  }


  function openCartDrawer() {

    cartDrawer.classList.add("active");

    drawerOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

  }


  function closeCartDrawer() {

    cartDrawer.classList.remove("active");

    drawerOverlay.classList.remove("active");

    document.body.style.overflow = "";

  }


  cartBtn.addEventListener(
    "click",
    openCartDrawer
  );


  closeCart.addEventListener(
    "click",
    closeCartDrawer
  );


  drawerOverlay.addEventListener(
    "click",
    closeCartDrawer
  );


  /* =======================================================
     QUICK ADD
     ======================================================= */

  document.querySelectorAll(".quick-add").forEach(button => {

    button.addEventListener("click", () => {

      const name = button.dataset.name;

      const price = Number(
        button.dataset.price
      );


      const productImage =
        button.parentElement.querySelector("img").src;


      const existingProduct = cart.find(
        item => item.name === name
      );


      if (existingProduct) {

        existingProduct.quantity += 1;

      } else {

        cart.push({

          name: name,

          price: price,

          quantity: 1,

          image: productImage

        });

      }


      saveCart();

      renderCart();

      showToast(
        `${name} added to cart`
      );

    });

  });


  /* =======================================================
     CHECKOUT
     ======================================================= */

  checkoutBtn.addEventListener(
    "click",
    () => {

      if (cart.length === 0) {

        showToast(
          "Your cart is empty"
        );

        return;

      }


      showToast(
        "Checkout system coming soon"
      );

    }
  );


  /* =======================================================
     TOAST
     ======================================================= */

  const toast =
    document.getElementById("toast");


  let toastTimeout;


  function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout = setTimeout(() => {

      toast.classList.remove("show");

    }, 2500);

  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

  const mobileNav =
    document.getElementById("mobileNav");


  mobileMenuBtn.addEventListener(
    "click",
    () => {

      mobileNav.classList.toggle("active");

    }
  );


  document.querySelectorAll(
    ".mobile-nav a"
  ).forEach(link => {

    link.addEventListener(
      "click",
      () => {

        mobileNav.classList.remove(
          "active"
        );

      }
    );

  });


  /* =======================================================
     SEARCH
     ======================================================= */

  const searchBtn =
    document.getElementById("searchBtn");

  const searchOverlay =
    document.getElementById("searchOverlay");

  const closeSearch =
    document.getElementById("closeSearch");

  const searchInput =
    document.getElementById("searchInput");

  const searchResults =
    document.getElementById("searchResults");


  searchBtn.addEventListener(
    "click",
    () => {

      searchOverlay.classList.add(
        "active"
      );

      searchInput.focus();

    }
  );


  closeSearch.addEventListener(
    "click",
    () => {

      searchOverlay.classList.remove(
        "active"
      );

    }
  );


  searchOverlay.addEventListener(
    "click",
    event => {

      if (
        event.target === searchOverlay
      ) {

        searchOverlay.classList.remove(
          "active"
        );

      }

    }
  );


  const products = [
    "Essential Black Tee",
    "Relaxed Denim",
    "Oversized White Shirt",
    "Utility Jacket",
    "Classic Black Tee",
    "Classic Shirt",
    "Utility Cargo",
    "Premium Overshirt"
  ];


  searchInput.addEventListener(
    "input",
    () => {

      const query =
        searchInput.value
          .trim()
          .toLowerCase();


      if (!query) {

        searchResults.innerHTML = "";

        return;

      }


      const results =
        products.filter(product =>
          product
            .toLowerCase()
            .includes(query)
        );


      if (results.length === 0) {

        searchResults.innerHTML = `
          <div class="search-result">
            No products found.
          </div>
        `;

        return;

      }


      searchResults.innerHTML =
        results
          .map(product => `
            <div class="search-result">
              ${product}
            </div>
          `)
          .join("");

    }
  );


  /* =======================================================
     ACCOUNT
     ======================================================= */

  const accountBtn =
    document.getElementById("accountBtn");


  accountBtn.addEventListener(
    "click",
    () => {

      showToast(
        "Account section coming soon"
      );

    }
  );


  /* =======================================================
     NEWSLETTER
     ======================================================= */

  const newsletterForm =
    document.getElementById(
      "newsletterForm"
    );


  newsletterForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const email =
        document.getElementById(
          "emailInput"
        ).value;


      if (!email) return;


      showToast(
        "Thanks for subscribing!"
      );


      newsletterForm.reset();

    }
  );


  /* =======================================================
     ESC KEY
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        searchOverlay.classList.remove(
          "active"
        );

        closeCartDrawer();

      }

    }
  );


  /* =======================================================
     INITIALIZE
     ======================================================= */

  renderCart();

});