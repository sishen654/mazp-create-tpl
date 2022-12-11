// main.js
import Vue from 'vue'
import App from './App.vue'
import "./style.css"
import "./global/index.scss";

new Vue({
  el: '#app',
  render: h => h(App)
}).$mount()
