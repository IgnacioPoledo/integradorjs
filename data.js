const productsData = [
  {
    id: 1,
    name: "Remera Nike",
    price: "$15000",
    category: "remeras",
    cardImg: "img/remera nike.jfif",
  },

  {
    id: 2,
    name: "Remera Adidas",
    price: "$15000",
    category: "remeras",
    cardImg: "img/remera adidas.jpg",
  },

  {
    id: 3,
    name: "Remera Puma",
    price: "$15000",
    category: "remeras",
    cardImg: "img/remera puma.webp",
  },

  {
    id: 4,
    name: "Zapatilla Nike",
    price: "$30000",
    category: "zapatillas",
    cardImg: "img/zapatilla nike.jpg",
  },

  {
    id: 5,
    name: "Zapatilla Adidas",
    price: "$30000",
    category: "zapatillas",
    cardImg: "img/zapatilla adidas.webp",
  },

  {
    id: 6,
    name: "Zapatilla Puma",
    price: "$30000",
    category: "zapatillas",
    cardImg: "img/zapatilla puma.webp",
  },

  {
    id: 7,
    name: "Campera Puma",
    price: "$60000",
    category: "camperas",
    cardImg: "img/campera puma.jpg",
  },

  {
    id: 8,
    name: "Campera Nike",
    price: "$60000",
    category: "camperas",
    cardImg: "img/campera nike.jpg",
  },

  {
    id: 9,
    name: "Campera Adidas",
    price: "$60000",
    category: "camperas",
    cardImg: "img/campera adidas.webp",
  },

  {
    id: 10,
    name: "Buzo Adidas",
    price: "$50000",
    category: "buzos",
    cardImg: "img/buzo adidas 2.jfif",
  },

  {
    id: 11,
    name: "Buzo Adidas",
    price: "$50000",
    category: "buzos",
    cardImg: "img/buzo adidas.webp",
  },

  {
    id: 12,
    name: "Buzo Nike",
    price: "$50000",
    category: "buzos",
    cardImg: "img/buzo nike 2.jfif",
  },

  {
    id: 13,
    name: "Buzo Nike",
    price: "$50000",
    category: "buzos",
    cardImg: "img/buzo nike.jfif",
  },

  {
    id: 14,
    name: "Buzo Puma",
    price: "$50000",
    category: "buzos",
    cardImg: "img/buzo puma 2.jfif",
  },

  {
    id: 15,
    name: "Buzo Puma",
    price: "$50000",
    category: "buzos",
    cardImg: "img/buzo puma.webp",
  },
];

const divideProductsInParts = (size) => {
  let productsList = [];
  for (let i = 0; i < productsData.length; i += size) {
    productsList.push(productsData.slice(i, i + size));
  }
  return productsList;
};
const appState = {
  products: divideProductsInParts(6),
  currentProductsIndex: 0,
  productsLimit: divideProductsInParts(6).length,
  activeFilter: null,
};
