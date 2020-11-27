import Vue from 'vue'
import Vuex from 'vuex'
import {
	CHANGE_NETWORK,
	SET_WEATHER_NOW,
	SET_WEATHER_FUTURE,
	SET_LIFE_SUGGESTION
} from './types'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		networkState: true,
		weatherNow:null,
		weatherFuture:null,
		lifeSuggestion:null
	},
	getters:{
		
	},
	mutations: {
		changeNetwork(state, payload) {
			state.networkState = payload;
		},
		setWeatherNow(state,payload){
			state.weatherNow = payload;
		},
		setWeatherFuture(state,payload){
			state.weatherFuture = payload;
		},
		setLifeSuggestion(state,payload){
			state.lifeSuggestion = payload;
		},
	},
	actions: {
		[CHANGE_NETWORK]({commit}, payload) {
			commit('changeNetwork', payload);
			console.log('网络状态改变');
		},
		[SET_WEATHER_NOW]({commit}, payload) {
			commit('setWeatherNow', payload);
			console.log('天气状态改变');
		},
		[SET_WEATHER_FUTURE]({commit}, payload) {
			commit('setWeatherFuture', payload);
			console.log('天气预报改变');
		},
		[SET_LIFE_SUGGESTION]({commit}, payload) {
			commit('setLifeSuggestion', payload);
			console.log('生活指数改变');
		}
	}
})
