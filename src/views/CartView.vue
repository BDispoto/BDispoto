<template>
    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
    <h1 id="shopping-cart-header">Shopping Cart</h1>
    <section id="shopping-cart-view">
    </section>
    <section id = "price-totals-view"></section>
    <button id="clear-cart-btn" v-show="this.authenticated"><p><span class = "fa fa-cart-plus"></span> Clear Cart</p></button>
    </body>
</template>

<script>
import ProductService from '../services/ProductService';

export default {
    data () {
        return {
            authenticated: false
        }
    },
    methods: {
        initialize() {
            const myCart = this.$store.state.cart;
            const view = document.getElementById('shopping-cart-view');
            const priceView = document.getElementById('price-totals-view')
            const qtyHeader = document.createElement('h1');
            qtyHeader.classList.add('qty-header');
            qtyHeader.innerText = 'Qty';
            const prodHeader = document.createElement('h1');
            prodHeader.classList.add('product-header');
            prodHeader.innerText = 'Product';
            const priceHeader = document.createElement('h1');
            priceHeader.classList.add('product-price');
            priceHeader.innerText = 'Price';
            const amountHeader = document.createElement('h1');
            amountHeader.classList.add('amount-price');
            amountHeader.innerText = 'Amount';
            const qtyList = document.createElement('ul');
            qtyList.classList.add('qty-list');
            const prodNameList = document.createElement('ul');
            prodNameList.classList.add('product-name-list');
            const priceList = document.createElement('ul');
            priceList.classList.add('unit-price-list');
            const amountList = document.createElement('ul');
            amountList.classList.add('amount-list');
            const xHeader = document.createElement('h1')
            xHeader.innerText = 'Remove from Cart?'
            const xList = document.createElement('ul')
            xList.classList.add('clear-list');
            let unitList = [];
            for (let i = 0; i < myCart.length; i++) {
                let cnt = 0;
                myCart.forEach((unit) => {
                    if (unit.name === myCart[i].name) {
                        cnt++;
                    }
                })
                let qty = document.createElement('li');
                qty.innerText = cnt;
                let name = document.createElement('li');
                name.innerText = myCart[i].name;
                let price = document.createElement('li');
                price.innerText = Intl.NumberFormat(`en-US`, { currency: `USD`, style: "currency" }).format(myCart[i].price)
                let amount = document.createElement('li');
                amount.innerText = Intl.NumberFormat(`en-US`, { currency: `USD`, style: "currency" }).format((myCart[i].price*cnt))
                let clear = document.createElement('button');
                clear.innerText = 'X';
                clear.addEventListener('click', () => {
                    let index = myCart.indexOf(myCart[i]);
                    this.$store.commit("REMOVE_FROM_CART", index);
                    view.removeChild(qtyHeader);
                    view.removeChild(prodHeader);
                    view.removeChild(priceHeader);
                    view.removeChild(amountHeader);
                    view.removeChild(xHeader);
                    view.removeChild(qtyList);
                    view.removeChild(prodNameList);
                    view.removeChild(priceList);
                    view.removeChild(amountList);
                    view.removeChild(xList);
                    priceView.removeChild(subTotal);
                    priceView.removeChild(tax);
                    priceView.removeChild(totalPrice);
                    priceView.removeChild(lineBreak);
                    this.initialize();
                })
                if (unitList.indexOf(name.innerText) == -1) {
                    unitList.push(name.innerText);
                    console.log(unitList);
                    qtyList.appendChild(qty);
                    prodNameList.appendChild(name);
                    priceList.appendChild(price);
                    amountList.appendChild(amount);
                    xList.appendChild(clear);
                }

            }
            view.appendChild(qtyHeader);
            view.appendChild(prodHeader);
            view.appendChild(priceHeader);
            view.appendChild(amountHeader);
            view.appendChild(xHeader);
            view.appendChild(qtyList);
            view.appendChild(prodNameList);
            view.appendChild(priceList);
            view.appendChild(amountList);
            view.appendChild(xList);
            let lineBreak = document.createElement('hr');
            lineBreak.classList.add('line-break');
            const clearCart = document.getElementById('clear-cart-btn');
            priceView.appendChild(lineBreak);
            let priceArr = [];
            for (let i = 0; i < myCart.length; i++) {
                let cnt = 0;
                myCart.forEach((unit) => {
                    if (unit.name === myCart[i].name) {
                        cnt++;
                    }
                })
                priceArr.push((myCart[i].price))
            }
            let totalAmount = 0;
            priceArr.forEach((amount) => {
                totalAmount += amount
            })
            let subTotal = document.createElement('p');
            subTotal.innerText = 'Cart Subtotal: ' + Intl.NumberFormat(`en-US`, { currency: `USD`, style: "currency" }).format((totalAmount));
            priceView.appendChild(subTotal);
            let tax = document.createElement('p');
            let taxRate = .06;
            tax.innerText = 'Tax: ' + Intl.NumberFormat(`en-US`, { currency: `USD`, style: "currency" }).format((totalAmount*taxRate));
            priceView.appendChild(tax);
            let totalPrice = document.createElement('p');
            totalPrice.innerText = 'Total: ' + Intl.NumberFormat(`en-US`, { currency: `USD`, style: "currency" }).format(((totalAmount) += totalAmount*taxRate));
            priceView.appendChild(totalPrice);
            clearCart.addEventListener('click', () => {
                this.$store.commit('CLEAR_CART');
                view.removeChild(qtyList);
                view.removeChild(prodNameList);
                view.removeChild(priceList);
                view.removeChild(amountList);
                view.removeChild(xList);
                subTotal.innerText = 'Cart Subtotal: $0.00';
                tax.innerText = 'Tax: $0.00';
                totalPrice.innerText = 'Total: $0.00';
            })
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
body {
    display: grid;
    grid-template-columns: 100vw;
}
.clear-list {
    display:flex;
    flex-direction:column;
}
button {
    width: fit-content;
    border-radius: 10px;
}
#shopping-cart-view {
    display: grid;
    grid-template-areas: 
    "qty name price amount x"
    "qlist nlist plist alist xlist";
}
#price-totals-view {
    float:right;
    text-align: right;
    margin-right: 10vw;
}
hr {
    border-top: 3px solid black;
    width: 50vw;
}
#clear-cart-btn {
    float:right;
    position:relative;
}
</style>