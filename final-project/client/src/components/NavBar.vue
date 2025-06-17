<template>
    <nav>
        <router-link v-bind:to="{ name: 'home' }" id = "home">Home</router-link>
        <router-link v-bind:to="{ name: 'cart' }" v-if="$store.state.token" id = "cart">Cart</router-link>
        <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token" id="logout">
          Logout
        </router-link>
        <router-link v-bind:to="{ name: 'login' }" v-else id="login">Login</router-link>
    </nav>
</template>

<script>
export default {
    
    
}
</script>

<style>
nav {
    background-color:slategray;
    position:sticky;
    top: 70px;
    height: 30px;
    width: 100vw;
    border: 2px black;
    border-style: solid;
    align-items: center;
    justify-content: center;
    float:left;
}
#home{
    float: left;
    margin-left: 5px;
}
#cart{
    float:left;
    margin-left: 5px;
}
#message {
    text-align: center;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
}
#logout {
    float: right;
    margin-right: 20px;
}
#login {
    float: right;
    margin-right: 20px;
}
</style>