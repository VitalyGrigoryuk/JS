"use strict";

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

const reformData = (items) => {
  return items.map(({product_name, ...rest}) => {
    return {
      ...rest,
      title: product_name
    }
  })
}

const URL = 'http://localhost:8000';
const GOODS_POSTFIX = '/goods.json';
const BASKET_GOODS_POSTFIX = '/getBasket.json';
const ADD_GOOD_TO_BASKET_POSTFIX = '/addToBasket.json';
const DELETE_GOOD_TO_BASKET_POSTFIX = '/deleteFromBasket.json';

const fetchAddGood = (id) => {
  fetch(`${URL}/${id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  })
}
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
const app = new Vue({
  el: "#app",
  data: {
    goods: goods,
    filteredGoods: goods,
    search: '',
    basketVision: false
  },
  mounted() {
    service(URL, GOODS_POSTFIX).then((data) => {
      this.goods = data;
      this.filteredGoods = data;
    });
  },
  methods: {
    filter() {
      this.filteredGoods = this.goods.filter(({ title }) => {
        return new RegExp(this.search, 'i').test(title);
      });
    },
    showBasket() {
      this.basketVision = true
    },
    closeBasket() {
      this.basketVision = false
    }
  }
})
}

Vue.component('custom-button', {
  props: ['click'],
  template: `
    <button @click="$emit('click')">
      <slot></slot>
    </button>
  `
})

Vue.component('basket', {
  prop: ['close'],
  template: `
    <div class="cart-box-menu">
      <h1>Корзина</h1>
      <custom-button @click="$emit('close')">Закрыть</custom-button>
    </div>
  `
})

Vue.component('goods-item', {
  props: ['item'],
  template: `
    <div class="goods-item">
      <h3>{ {item.title} }</h3>
      <div>{ {item.price} }</div>
      <div>
        <custom-button @click="addGood" >добавить</custom-button>
      </div>
    </div>
  `,
  methods: {
    addGood() {
      fetchAddGood(this.item.id);
    }
  }
})
//---------------------
Vue.component('basket-item', {
  props: ['item'],
  template: `
    <div class="basket-item">
      <div>{ {item.title} }</div>
      <div>{ {item.price} }</div>
      <div>
        <custom-button>добавить</custom-button>
      </div>
    </div>
  `
})
//-----------
Vue.component('searchbox', {
  props: ['value'],
  template: `
      <input type="text" class="search-line" 
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
  `
})


//----------------- Форма валидации

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