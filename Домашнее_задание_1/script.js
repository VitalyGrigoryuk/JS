"use strict";
// Всплывающее окно по клику на кнопку корзины
const cartBtnOpen = document.querySelector('.cart-box-menu');
document.querySelector('.cart-button').addEventListener('click', event => {
    if (cartBtnOpen.style.visibility !== 'visible') {
        cartBtnOpen.style.visibility = 'visible';
    } else {
        cartBtnOpen.style.visibility = 'hidden';
    }
});
// Товар
const goods = [
  { title: 'Shirt', price: 150, image: 'https://picsum.photos/341/400'},
  { title: 'Socks', price: 50, image: 'https://picsum.photos/342/400'},
  { title: 'Jacket', price: 350, image: 'https://picsum.photos/340/401'},
  { title: 'Shoes', price: 250, image: 'https://picsum.photos/340/402'},
  { title: 'Shirt', price: 150, image: 'https://picsum.photos/341/400'},
  { title: 'Socks', price: 50, image: 'https://picsum.photos/342/400'},
  { title: 'Jacket', price: 350, image: 'https://picsum.photos/340/401'},
  { title: 'Shoes', price: 250, image: 'https://picsum.photos/340/402'},
  { title: 'Shirt', price: 150, image: 'https://picsum.photos/341/400'},
];
// Создаем класс для товара
class GoodsItem {
  constructor({title, price, image}) {
    this.title = title;
    this.price = price;
    this.image = image;
  }
  // Выводим разметку товара
  render() {
    return `<div class="goods-item">
      <img src=${this.image} alt="">
      <h3 class = "goods-item-heading">${this.title}</h3>
      <p class = "goods-item-text">${this.price}$</p>
    </div>`;
  }
}
// Класс для списка товара и рендер
class GoodsList {
  constructor() {
    this.goods = goods;
  }
  render() {
    const _goods = [...this.goods];
    const _goodsItems = _goods.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods-list').innerHTML = _goodsItems.join('');
  }
  
}
onload = () => {
  const goodsList = new GoodsList();
  goodsList.render();
}

// Создавем класс корзина Cart
class Cart {
  constructor () {
    this.goods = [];
  }
  // Метод добавления товара в корзину
  addCartItem(cartItem) {
    this.goods.push(cartItem);
  }
  // Метод для вывода итоговой суммы корзины
  totalCartPrice() {
    let totalPrice = document.getElementsByClassName('cartTotalNumber');
    let sum = 0;
    this.goods.forEach (good => {
      sum += good.price;
    })
    totalPrice.innerText = `${sum}`;
  } 
}