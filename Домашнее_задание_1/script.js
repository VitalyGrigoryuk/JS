"use strict";
const goods = [
  { title: 'Shirt', price: 150, image: 'https://picsum.photos/341/400' },
  { title: 'Socks', price: 50, image: 'https://picsum.photos/342/400'},
  { title: 'Jacket', price: 350, image: 'https://picsum.photos/340/401'},
  { title: 'Shoes', price: 250, image: 'https://picsum.photos/340/402'},
  { title: 'Shirt', price: 150, image: 'https://picsum.photos/341/400'},
  { title: 'Socks', price: 50, image: 'https://picsum.photos/342/400'},
  { title: 'Jacket', price: 350, image: 'https://picsum.photos/340/401'},
  { title: 'Shoes', price: 250, image: 'https://picsum.photos/340/402'},
  { title: 'Shirt', price: 150, image: 'https://picsum.photos/341/400'},
];

const renderGoodsItem = ({title, price = 55, image}) => 
  `<div class="goods-item">
    <img src=${image} alt="">
    <h3 class = "goods-item-heading">${title}</h3>
    <p class = "goods-item-text">${price}$</p>
  </div>`;

const renderGoodsList = (list) => {
  let goodsList = list.map(item => renderGoodsItem(item)).join(' ');
  document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);