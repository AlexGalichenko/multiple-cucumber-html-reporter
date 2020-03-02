import Vue from "vue";
import VueRouter from "vue-router";

import Main from "./main/Main.vue";
import Feature from "./feature/Feature.vue";
import App from "./App.vue";

Vue.config.productionTip = false;

const router = new VueRouter({
    routes: [
        {
            name: "main",
            path: "/",
            component: Main
        },
        {
            name: "feature",
            path: "/feature/:fid",
            component: Feature,
            props: true
        },
    ]
});

Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    router,
    components: { App }
}).$mount("#app");
