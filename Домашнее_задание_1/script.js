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
  constructor({title, price}) {
    this.title = title;
    this.price = price;
  }
  // Выводим разметку товара
  render() {
    return `<div class="goods-item">
      <h3 class = "goods-item-heading">${this.title}</h3>
      <p class = "goods-item-text">${this.price}$</p>
    </div>`;
  }
}

const reformData = (items) => {
  return items.map(({product_name, ...rest}) => {
    return {
      ...rest,
      title: product_name
    }
  })
}

// 
const URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS_POSTFIX = '/catalogData.json';
const BASKET_GOODS_POSTFIX = '/getBasket.json';
const ADD_GOOD_TO_BASKET_POSTFIX = '/addToBasket.json';
const DELETE_GOOD_TO_BASKET_POSTFIX = '/deleteFromBasket.json';

const service = function (url, postfix, method = "GET") {
  return new Promise((resolve, reject) => {
    fetch(`${url}${postfix}`, {
      method: method
    }).then((res) => {
      return res.json();
    }).then((data) => {
      resolve(data)
    })
  });
}

class GoodsList {
  getSum() {
    return this.reduce((prev, {price}) => prev + price, 0);
  }
  addGoodToCart() {
    return service(URL, ADD_GOOD_TO_BASKET_POSTFIX, "POST").then((data) => {
    
     })
  }
  setGoods() {
    return service(URL, GOODS_POSTFIX).then((data) => {
     return reformData(data)
    })
  }
  render() {
    this.setGoods().then((data) => {
      this.goods = data;
      const _goods = [...this.goods];
      const _goodsItems = _goods.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods-list').innerHTML = _goodsItems.join('');
    })
  }
}
// Создаем класс корзины Cart
class Cart {
  setGoods() {
    return service(URL, BASKET_GOODS_POSTFIX).then((data) => {
      this.goods = reformData(data.contents);
    });
  }
  deleteGoodToCart(id) {
    return service(URL, `${DELETE_GOOD_TO_BASKET_POSTFIX}/${id}`, "DELETE").then((data) => {
    
    })
  }
  setVision() {}
  render() {}
}

//Создаем класс добавления товара в корзину
class CartItem {
  setCount() {}
  deleteItem() {}
  render() {}
}

onload = () => {
  const goodsList = new GoodsList();
  goodsList.render();
}
