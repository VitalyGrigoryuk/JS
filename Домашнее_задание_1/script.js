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

//----------------- ДЗ 4 урока. Задание 1

const text = "Lorem 'ipsum dolor' sit amet consectetur.";
const re = /'/g;
const result = text.replace(re, "\"");
console.log(result);

//----------------- ДЗ 4 урока. Задание 2

const text2 = "Lorem 'ipsum dolor' sit aren't amet consectetur.";
const re2 = /\b'(?!\b)|(?<!\b)'\b/gi;
const result2 = text2.replace(re2, "\"");
console.log(result2);

//----------------- ДЗ 4 урока. Задание 3

var form = document.forms.regform;
var spanErrorText = document.getElementsByClassName('error-text');
var inputArea = document.getElementsByClassName('form-box__area');

//очистка всех текстов с ошибками
var clearErrorText = () => {
    for (let n = 0; n < spanErrorText.length; n++) {
        spanErrorText[n].innerText = ' ';
    }
};

//очистка красной рамки в input с ошибками
var clearInputArea = () => {
    for (let n = 0; n < inputArea.length; n++) {
        let classList = inputArea[n].classList;
        console.log(classList);

        if (classList.contains('input_error') === true) {
            classList.remove("input_error");
            classList.remove("p_error");
        }
    }
};

//Валидация формы глобальная функция 
var formValidation = function(e) {
    e.preventDefault();
    console.log('Run validation');

    clearErrorText(); //очистка ВСЕХ текстов с ошибками
    clearInputArea(); //очистка красной рамки в input с ошибками

    let name = form.elements.name;
    let mail = form.elements.email;
    let telephone = form.elements.telephone; 
    
    let result = true;

    if (nameValidation(name) == false) {
        result = false;
    }
    if (mailValidation(mail) == false) {
        result = false;
    }
    if (telephoneValidation(telephone) == false) {
        result = false;
    }
    if (result == false) {
        document.getElementById('form-box__area__headline').innerText = "Данные не приняты!"
    }
    if (result == true) {
        document.getElementById('form-box__area__headline').innerText = "Спасибо! Ваши данные приняты!"
    }
    return result;
};

//ИМЯ валидация 
var nameValidation = (name) => {
    console.log('funcNameValid');
    
    let regexp = /^[A-Za-zА-Яа-я ]+$/;

    if (name.value == '') {
        spanErrorText[0].innerText = 'Заполните поле!';
        return false;
    }
    if (name.value.match(regexp)) { 
        return true;
    } else {
        spanErrorText[0].innerText = 'Имя может содержать только буквы и пробел';
        name.classList.add("input_error");
        name.classList.add("p_error");
        name.focus();
        return false;
    }
};

//Mail валидация 
var mailValidation = (mail) => {
    console.log('funcMailValid');
    
    let regexp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
    
    if (mail.value == '') {
        spanErrorText[1].innerText = 'Заполните поле!';
        return false;
    }
    if (mail.value.match(regexp)) { 
        return true;
    } else {
        spanErrorText[1].innerText = 'Адрес эл. почты может содежрать латинские буквы (@, . - _)';
        mail.classList.add("input_error");
        mail.classList.add("p_error");
        mail.focus();
        return false;
    }
};

//telephone валидация 
var telephoneValidation = (telephone) => {
    console.log('funcPhoneValid');
    
    let regexp = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;
    
    if (telephone.value == '' ||  telephone.value == '+7(000)000-0000') {
        spanErrorText[2].innerText = 'Заполните поле!';
        return false;
    }
    if (telephone.value.match(regexp)) { 
        return true;
    } else { 
        spanErrorText[2].innerText = 'Телефон введите в формате +7(000)000-0000';
        telephone.classList.add("input_error");
        telephone.classList.add("p_error");
        telephone.focus();
        return false;
    }
};