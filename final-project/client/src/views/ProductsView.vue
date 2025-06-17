<template>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <div class="home">
    <div id="heading-line">
      <h1>
        Products
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
    </div>
    <div id="app">
      <h3>Check out these awesome products by SolarGeeks!</h3>
      <div id="message"></div>
      <font-awesome-icon v-bind:class="{ 'view-icon': true, active: cardView }" v-on:click="setCardView"
        icon="fa-solid fa-grip" title="View tiles" />
      <font-awesome-icon v-bind:class="{ 'view-icon': true, active: !cardView }" v-on:click="setListView"
        icon="fa-solid fa-table" title="View table" />
      <form id="searchBar">
        <label for="search">Search our Merch: </label>
        <input type="'text" id="search" name="search" placeholder="Search...">
      </form>
      <p id="login-message" v-if="!isLoggedIn">
        Welcome! You may browse anonymously as much as you wish,<br />
        but you must
        <router-link v-bind:to="{ name: 'login' }">Login</router-link> to add
        items to your shopping cart.
      </p>
      <section id="product-cards">
        <!-- Code injected by script -->
      </section>
    </div>

  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductService from "../services/ProductService.js";


export default {
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      cardView: true,
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    }
  },

  methods: {
    createCards(filter = '') {
      this.clearList();
      this.isLoading = true;
      ProductService.list().then((response) => {
        let cardList = response.data;
        if (filter.length > 0) {
          filter = filter.toLowerCase();
          cardList = response.data.filter((item) => item.name.toLowerCase().includes(filter))
        }
        console.log(cardList);
        const productCards = document.getElementById('product-cards');
        for (let i = 0; i <= cardList.length; i++) {
          cardList.forEach(element => {
            let newProduct = document.createElement('article');
            if (cardList.indexOf(element) === i) {
              let sku = document.createElement('div');
              let name = document.createElement('div');
              name.addEventListener('click', (e) => {
                this.$store.commit('SET_PRODUCT', element);
                this.$router.push('/products/' + element.productId);
              });
              let description = document.createElement('div');
              let price = document.createElement('div');

              let imageBox = document.createElement('div');
              let image = document.createElement('img');
              image.setAttribute('src', '../img/product_350x250.jpg');
              imageBox.appendChild(image);

              sku.innerText = element.productSku;
              name.innerText = element.name;
              description.innerText = element.description;
              price.innerText = Intl.NumberFormat(`en-US`, { currency: `USD`, style: "currency" }).format(element.price);
              
              sku.classList.add('sku');
              name.classList.add('product-name-action');
              description.classList.add('description');
              price.classList.add('price');
              imageBox.classList.add('product-image');

              newProduct.setAttribute('data-id', element.productId);
              newProduct.appendChild(sku);
              newProduct.appendChild(name);
              newProduct.appendChild(price);
              newProduct.appendChild(image);
              newProduct.classList.add('product-card');

              if (this.$store.state.token.length > 0) {
                let cart = document.createElement('div');
                cart.className = 'cart-container';
                let cartIcon = document.createElement('i');
                cart.addEventListener('click', () => {
                  const message = document.getElementById('message');
                  message.innerText = (element.name + ' added to cart!');
                  this.$store.commit("ADD_TO_CART", element);
                });
                cart.title = 'Add item to cart';
                cartIcon.className = 'fa fa-cart-plus';
                cart.classList.add('cart-icon');
                newProduct.appendChild(cart);
                cart.appendChild(cartIcon);
              }

              productCards.appendChild(newProduct);
            }
          });
        }
      })
      this.isLoading = false;
    },
    clearCards() {
      let cards = document.querySelectorAll('article');
      cards.forEach((card) => {
        card.remove();
      })
    },
    clearList() {
      let list = document.querySelectorAll('ul');
      list.forEach((element) => {
        element.remove();
      })
      let headline = document.querySelectorAll('h2');
      headline.forEach((head) => {
        head.remove();
      })
    },
    createListView(filter = '') {
      this.clearCards();
      this.isLoading = true;
      ProductService.list().then((response) => {
        let prodArr = response.data;
        if (filter.length > 0) {
          filter = filter.toLowerCase();
          prodArr = response.data.filter((item) => item.name.toLowerCase().includes(filter))
        }
        console.log(prodArr);
        const prodView = document.createElement('section')
        let app = document.getElementById('app');
        app.appendChild(prodView);
        prodView.classList.add('prod-view')
        const prodList = document.createElement('ul');
        const skuList = document.createElement('ul');
        skuList.classList.add('sku-list');
        const nameList = document.createElement('ul');
        nameList.classList.add('name-list')
        const priceList = document.createElement('ul');
        priceList.classList.add('price-list');
        const cartList = document.createElement('ul')
        cartList.classList.add('class-list');
        let cartHeader = document.createElement('h2')
        cartHeader.classList.add('cart-header');
        prodView.appendChild(cartList);
        prodView.appendChild(cartHeader);
        let skuHeader = document.createElement('h2');
        let nameHeader = document.createElement('h2');
        let priceHeader = document.createElement('h2');
        skuHeader.innerText = 'SKU';
        skuHeader.classList.add('sku-header');
        nameHeader.innerText = 'Product';
        nameHeader.classList.add('name-header');
        priceHeader.innerText = 'Price';
        priceHeader.classList.add('price-header');
        prodView.appendChild(skuList);
        prodView.appendChild(nameList);
        prodView.appendChild(priceList);
        prodList.classList.add('product-list')
        prodView.appendChild(skuHeader);
        prodView.appendChild(nameHeader);
        prodView.appendChild(priceHeader);
        prodView.appendChild(prodList);
        for (let i = 0; i <= prodArr.length; i++) {
          prodArr.forEach((product) => {
            let newSku = document.createElement('li');
            let newName = document.createElement('li');
            let newPrice = document.createElement('li');
            let description = document.createElement('div');
            if (prodArr.indexOf(product) === i) {
              newSku.innerText = product.productSku;
              newName.innerText = product.name;
              newPrice.innerText = Intl.NumberFormat(`en-US`, { currency: `USD`, style: "currency" }).format(product.price);
              description.innerText = product.description;
              skuList.appendChild(newSku);
              nameList.appendChild(newName);
              priceList.appendChild(newPrice);

              if (this.$store.state.token.length > 0) {
                let cart = document.createElement('div');
                cart.className = 'cart-container'
                let cartIcon = document.createElement('i');
                cartHeader.innerText = 'Add to Cart';
                cart.addEventListener('click', () => {
                  const message = document.getElementById('message');
                  message.innerText = (product.name + ' added to cart!')
                  this.$store.commit("ADD_TO_CART", product);
                })
                cartIcon.title = 'Add item to cart';
                cartIcon.className = 'fa fa-cart-plus';
                cart.appendChild(cartIcon);
                cartList.appendChild(cart);
              }
            }
          })
        }
      })
      this.isLoading = false;
    },
    setCardView() {
      this.cardView = true;
      this.createCards();
    },
    setListView() {
      this.cardView = false;
      this.createListView();
    },
    initializeSearch() {
      const searchBar = document.getElementById('search');
      searchBar.addEventListener('keyup', (ev) => {
        ev.stopPropagation();
        let searchList = searchBar.value;
        if (this.cardView) {
          this.clearCards();
          this.createCards(searchList);
          if (searchBar.value === null) {
            this.createCards();
          }
        }
        if (!this.cardView) {
          this.clearList();
          this.createListView(searchList);
          if (searchBar.value === null) {
            this.createListView();
          }
        }
      });
    },
  },

  mounted() {
    this.createCards();
    this.initializeSearch();
  },
};
</script>

<style>
#spinner {
  color: green;
}

i:hover {
  cursor:pointer;
  background-color:rgb(15, 182, 90);
}

#message {
  text-align: center;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
}

.view-icon {
  font-size: 1.2rem;
  margin-right: 7px;
  padding: 3px;
  color: #444;
  border-radius: 3px;
}

.view-icon.active {
  background-color: lightgreen;
}

.view-icon:not(.active) {
  font-size: 1.2rem;
  margin-right: 7px;
  cursor: pointer;
}

.prod-view {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  grid-template-areas:
    "sku name price cart"
    "skuList nameList priceList cartList";
  height: auto;
}

.product-list {
  display: flex;
}

.sku-header {
  grid-area: sku;
}

.cart-header {
  grid-area: cart;
}

.sku-list {
  grid-area: skuList;
}

.name-list {
  grid-area: nameList;
}

.price-list {
  grid-area: priceList;
}

.cart-container {
  grid-area: cartList;
}

.name-header {
  grid-area: name;
}

.price-header {
  grid-area: price;
}

.view-icon:not(.active):hover {
  color: blue;
  background-color: rgba(255, 255, 255, 0.7);
}

#searchBar {
  top: 110px;
  margin-bottom: 10px;
}

#product-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
}

.product-card {
  display: grid;
  width: auto;
  grid-template-rows: .05fr .05fr .25fr 2fr .05fr;
  border: 2px black;
  border-style: solid;
  background-color: rgb(14, 226, 109);
}

.sku {
  grid-column: 1;
  grid-row: 1;
}

.product-name-action {
  grid-column: 1/3;
  grid-row: 3;
}

.product-card>img {
  grid-column: 1/3;
  grid-row: 4;
  width: 100%;
  height: auto;
}

.price {
  grid-column: 2;
  grid-row: 1;
  text-align: right;
}

.cart-icon {
  grid-column: 2;
  grid-row: 5;
  text-align: right;
  margin-right: 2px;
  margin-top: 3px;
}

.product-image {
  width: 100%;
  height: auto;
}
</style>