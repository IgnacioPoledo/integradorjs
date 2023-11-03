const btnCart = document.querySelector(".container-cart-icon");
const containerCartProducts = document.querySelector(
  ".container-cart-products"
);

btnCart.addEventListener("click", () => {
  containerCartProducts.classList.toggle("hidden-cart");
});

/* ========================= */
const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");

// Lista de todos los contenedores de productos
const productsContainer = document.querySelector(".container-items");
const productsList = document.querySelector(".container-items");
const total = document.querySelector(".total");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const showMoreBtn = document.querySelector(".btn-load");
const cartBubble = document.querySelector(".contador-productos");
const countBubble = document.querySelector(".count-products");
const barsMenu = document.querySelector(".navbar-list");
const deletePrice = document.querySelector(".butt-down");
const buyPrice = document.querySelector(".butt-up");
const btnBuy = document.querySelector(".btn-buy");
const btnClearCart = document.querySelector(".btn-clear-cart");

const createProductTemplate = (product) => {
  const { id, name, price, cardImg } = product;
  return `<div class="item">
  <figure>
    <img src="${cardImg}" alt="${name}" />
  </figure>
  <div class="info-product">
    <h2>${name}</h2>
    <p class="price">${price}</p>
    <button class="btn-add-cart">Añadir al carrito</button>
  </div>
</div>`;
};
const renderProducts = (productList) => {
  productsContainer.innerHTML += productList
    .map(createProductTemplate)
    .join("");
};

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector(".total-pagar");

const countProducts = document.querySelector("#contador-productos");

const cartEmpty = document.querySelector(".cart-empty");
const cartTotal = document.querySelector(".cart-total");

productsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add-cart")) {
    const product = e.target.parentElement;

    const infoProduct = {
      quantity: 1,
      title: product.querySelector("h2").textContent,
      price: product.querySelector("p").textContent,
    };

    const exits = allProducts.some(
      (product) => product.title === infoProduct.title
    );

    if (exits) {
      const products = allProducts.map((product) => {
        if (product.title === infoProduct.title) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });
      allProducts = [...products];
    } else {
      allProducts = [...allProducts, infoProduct];
    }

    showHTML();
  }
});

rowProduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-close")) {
    const product = e.target.parentElement;
    const title = product.querySelector("p").textContent;

    allProducts = allProducts.filter((product) => product.title !== title);

    console.log(allProducts);

    showHTML();
  }
});

const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

// Funcion para mostrar  HTML
const showHTML = () => {
  if (!allProducts.length) {
    cartEmpty.classList.remove("hidden");
    rowProduct.classList.add("hidden");
    cartTotal.classList.add("hidden");
  } else {
    cartEmpty.classList.add("hidden");
    rowProduct.classList.remove("hidden");
    cartTotal.classList.remove("hidden");
  }

  // Limpiar HTML
  rowProduct.innerHTML = "";

  let total = 0;
  let totalOfProducts = 0;

  allProducts.forEach((product) => {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("cart-product");

    containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            </div>
            <button class="butt-up">+</button>
            <button class="butt-down">-</button>
          </div>
        `;

    rowProduct.append(containerProduct);

    total = total + parseInt(product.quantity * product.price.slice(1));
    totalOfProducts = totalOfProducts + product.quantity;
  });

  valorTotal.innerText = `$${total}`;
  countProducts.innerText = totalOfProducts;
};

// función para habilitar o deshabilitar un boton segun corresponda

const disablePrice = (price) => {
  if (!cart.length) {
    price.classList.add("disabled");
  } else {
    price.classList.remove("disabled");
  }
};
// función para guardar el carrito en el localStorage
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Botones + -

const createCartProductTemplate = (cartProduct) => {
  const { id, name, price, img, quantity } = cartProduct;
  return ` </div>
  <div class="item-handler">
  <span class="quantity-handler down" data-id=${id}>-</span>
  <span class="item-quantity">${quantity}</span>
  <span class="quantity-handler up" data-id=${id}>+</span>
  </div>
  `;
};

// Agregar una unidad a un producto que ya sta en el carrito

const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};

// Boton para agregar una unidad dentro del carrito

const handlePlusEvent = (productContainer) => {
  const title = productContainer.querySelector(
    ".titulo-producto-carrito"
  ).textContent;

  const product = allProducts.find((item) => item.title === title);
  if (product) {
    product.quantity++;
    showHTML();
  }
};

// Boton para sacar una unidad dentro del carrito

const handleMinusEvent = (productContainer) => {
  const title = productContainer.querySelector(
    ".titulo-producto-carrito"
  ).textContent;

  const product = allProducts.find((item) => item.title === title);
  if (product) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      // Si la cantidad es 1, puedes eliminar el producto del carrito
      allProducts = allProducts.filter((item) => item.title !== title);
    }
    showHTML();
  }
};

// Agregar eventos a los botones "+" y "-"
rowProduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("butt-up")) {
    // Manejar el incremento de la cantidad de productos
    handlePlusEvent(e.target.parentElement);
  } else if (e.target.classList.contains("butt-down")) {
    // Manejar el decremento de la cantidad de productos
    handleMinusEvent(e.target.parentElement);
  }
});

// Remover producto del carrito
const removeProducFromCart = (product) => {
  cart = cart.filter((item) => item.id !== product.id);
  updateCartState();
};
// Restar unidad de producto en el carrito
const subtractProductUnit = (product) => {
  cart = cart.map((item) => {
    return item.id === product.id
      ? { ...item, quantity: Number(item.quantity) - 1 }
      : item;
  });
};

// Manejo de enventos de los botones + -

const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinusEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusEvent(e.target.dataset.id);
  }
  updateCartState();
};

// Vaciar el carrito

const resetCart = () => {
  allProducts = [];
  showHTML();
};
btnClearCart.addEventListener("click", () => {
  resetCart();
  alert("¡El carrito ha sido vaciado!");
});

// Completar compra o vaciar el carrito

const completeCartAction = (confirmMsg, succesMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(succesMsg);
  }
};

// Mensaje de compra exitosa
const completeBuy = () => {
  if (allProducts.length > 0) {
    if (window.confirm("¿Desea completar su compra?")) {
      resetCart(); // Llama a la función para vaciar el carrito
      alert("¡Gracias por su compra!");
    }
  } else {
    alert("El carrito está vacío. Agregue productos antes de comprar.");
  }
};

btnBuy.addEventListener("click", completeBuy);

// Mensaje de vaciado exitoso del carrito
const deleteCart = () => {
  if (allProducts.length > 0) {
    if (window.confirm("¿Desea vaciar el carrito?")) {
      resetCartItems();
      alert("¡El carrito ha sido vaciado!");
    }
  } else {
    alert("El carrito ya está vacío.");
  }
};

btnClearCart.addEventListener("click", deleteCart);

// Actualizar el estado del carrito
const updateCartState = () => {
  renderCart();
  disablePrice(buyPrice);
  disablePrice(deletePrice);
  saveCart();
  renderCartBubble();
};

// Renderizar el contador de productos en el carrito
const renderCartBubble = () => {
  const totalProducts = allProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );
  countBubble.textContent = totalProducts;
  cartBubble.style.display = totalProducts > 0 ? "block" : "none";
};

// Función para habilitar o deshabilitar un botón según corresponda
const disablePrices = (price) => {
  if (allProducts.length === 0) {
    price.classList.add("disabled");
  } else {
    price.classList.remove("disabled");
  }
};

// Ver más //

const isLastIndexOf = () => {
  return appState.currentProductsIndex === appState.productsLimit - 1;
};

const showMoreProducts = () => {
  appState.currentProductsIndex += 1;
  let { products, currentProductsIndex } = appState;
  renderProducts(products[currentProductsIndex]);
  if (isLastIndexOf()) {
    showMoreBtn.classList.add("hidden");
  }
};

const setShowMoreVisibility = () => {
  if (!appState.activeFilter) {
    showMoreBtn.classList.remove("hidden");
    return;
  }
  showMoreBtn.classList.add("hidden");
};

// Lógica de los filtros

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisibility(appState.activeFilter);
};

const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

const applyFilter = (event) => {
  const { target } = event;
  console.log(target);
  if (!isInactiveFilterBtn(target)) return;
  productsContainer.innerHTML = "";

  changeFilterState(target);
  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentProductsIndex = 0;
    return;
  }

  renderProducts(appState.products[0]);
};

const renderFilteredProducts = () => {
  const filteredProducts = productsData.filter(
    (product) => product.category === appState.activeFilter
  );
  renderProducts(filteredProducts);
};

const formularioContacto = document.getElementById("contacto");
const mensajeExito = document.getElementById("mensaje-exito");
const errores = document.getElementById("errores");

formularioContacto.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("Email").value;
  const consulta = document.getElementById("desarrolle").value;

  // Validación básica del correo electrónico

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarError("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  // Validación de la consulta (se requiere al menos 10 caracteres)
  if (consulta.length < 10) {
    mostrarError("La consulta debe tener al menos 10 caracteres.");
    return;
  }

  // Si pasó todas las validaciones, mostramos el mensaje de éxito
  mostrarMensajeExito();

  // Limpiamos los mensajes después de 1 segundos
  setTimeout(() => {
    limpiarMensajes();
  }, 5000);
});

function mostrarError(mensaje) {
  const errores = document.getElementById("errores");
  errores.classList.remove("hidden");
  errores.innerHTML = `<p>${mensaje}</p>`;

  setTimeout(() => {
    limpiarMensajes();
  }, 1000);
}

function mostrarMensajeExito() {
  const mensajeExito = document.getElementById("mensaje-exito");
  mensajeExito.classList.remove("hidden");
  mensajeExito.innerHTML = "Mensaje enviado con éxito.";
  setTimeout(() => {
    limpiarMensajes();
  }, 2000);
}

function limpiarMensajes() {
  const errores = document.getElementById("errores");
  errores.classList.add("hidden");
  errores.innerHTML = "";
  const mensajeExito = document.getElementById("mensaje-exito");
  mensajeExito.classList.add("hidden");
  mensajeExito.innerHTML = "";
}
function mostrarError(mensaje) {
  const errores = document.getElementById("errores");
  errores.classList.remove("hidden");
  errores.innerHTML = `<p>${mensaje}</p>`;
  // Limpiar el campo de consulta
  document.getElementById("desarrolle").value = "";
  setTimeout(() => {
    limpiarMensajes();
  }, 2000);
}
function mostrarMensajeExito() {
  const mensajeExito = document.getElementById("mensaje-exito");
  mensajeExito.classList.remove("hidden");
  mensajeExito.innerHTML = "Mensaje enviado con éxito.";

  // Limpiar el campo de consulta
  document.getElementById("desarrolle").value = "";

  setTimeout(() => {
    limpiarMensajes();
  }, 1000);
}
const init = () => {
  renderProducts(appState.products[0]);
  showMoreBtn.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
  menuBtn.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", closeOnScroll);
  barsMenu.addEventListener("click", closeOnClick);
  overlay.addEventListener("click", closeOnOverlayClick);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  productsContainer.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart);
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble(cart);
  setTimeout(function () {
    console.log("Han pasado 5 segundos");
  }, 5000);
};

init();
