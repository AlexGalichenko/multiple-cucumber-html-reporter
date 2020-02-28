import Vue from "vue";
import VueRouter from "vue-router";

import Main from "./main/Main.vue";
import App from "./App.vue";

Vue.config.productionTip = false;

const router = new VueRouter({
    routes: [
        {
            name: "main",
            path: "/",
            component: Main
        }
    ]
});

Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    router,
    components: { App }
}).$mount("#app");
