<template>
    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <section id="product-detail-view"></section>
    <div id="message"></div>
    <button id="add-to-cart-btn" v-show="this.authenticated"><p><span class = "fa fa-cart-plus"></span> Add to Cart</p></button>
</template>

<script>
export default {
    data () {
        return {
            authenticated: false
        }
    },
    methods: {
        initialize() {
            const currentProduct = this.$store.state.product;
            const view = document.getElementById('product-detail-view');
            const prodName = document.createElement('h1');
            prodName.classList.add('product-name');
            prodName.innerText = currentProduct.name;
            const description = document.createElement('h2');
            description.classList.add('product-description');
            description.innerText = currentProduct.description;
            const prodSku = document.createElement('h3');
            prodSku.classList.add('product-sku');
            prodSku.innerText = currentProduct.productSku;
            const price = document.createElement('h3');
            price.classList.add('product-price');
            price.innerText = Intl.NumberFormat(`en-US`, { currency: `USD`, style: "currency" }).format(currentProduct.price);
            const smallName = document.createElement('h4')
            smallName.classList.add('small-name');
            smallName.innerText = currentProduct.name;
            const prodImg = document.createElement('img');
            prodImg.classList.add('product-image');
            prodImg.setAttribute('src', '../img/product_350x250.jpg');
            view.appendChild(prodName);
            view.appendChild(description);
            view.appendChild(prodSku);
            view.appendChild(price);
            view.appendChild(smallName);
            view.appendChild(prodImg);
            let cartBtn = document.getElementById('add-to-cart-btn');
                cartBtn.addEventListener('click', () => {
                  const message = document.getElementById('message');
                  message.innerText = (currentProduct.name + ' added to cart!');
                  this.$store.commit("ADD_TO_CART", currentProduct);
                });
        }
    },
    mounted() {
        this.initialize();
        if (this.$store.state.token.length > 0) {
            this.authenticated = true;
        }
    }
    
}
</script>

<style>
#product-detail-view {
    display:grid;
    grid-template-areas:
    "title title"
    "desc desc"
    "sku price"
    "sn sn"
    "img img";
    grid-template-columns: 16vw 84vw;
}
.product-name {
    font-size: 24px;
    grid-area: title;
}
.product-description {
    grid-area: desc;
}
.product-sku {
    grid-area: sku;
}
.product-price {
    grid-area: price
}
.small-name {
    grid-area: sn;
}
.product-image {
    max-width: 250px;
    height: auto;
    grid-area: img;
}
#add-to-cart-btn {
    border-radius: 10px;
}

</style>