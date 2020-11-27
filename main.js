import Vue from 'vue'
import App from './App'
import store from './store/index'
import request from './api/request'
import config from './api/config'

import uView from "uview-ui";
Vue.use(uView);

Vue.prototype.request = request
Vue.prototype.api = config

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store: store,
})


app.$mount()
