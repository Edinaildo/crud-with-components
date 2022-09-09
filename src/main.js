import Vue from "vue";
import HoMe from "./pages/HoMe.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(HoMe),
}).$mount("#home");
