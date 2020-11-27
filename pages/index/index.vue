<template>
	<view class="wrap">
		<u-top-tips ref="uTips"></u-top-tips>
		<u-row gutter="16">
			<u-col span="12">
				<view class="swiper-wrap"><u-swiper :list="list" :effect3d="list3d"></u-swiper></view>
			</u-col>
		</u-row>
		<u-row gutter="16" justify="space-between">
			<u-col span="4">
				<view class="weather-wrap main-info">
					<u-image
						class="weather-icon"
						width="100%"
						height="auto"
						:src="weatherNow ? `/static/weather_icon/${weatherNow.now.code}@2x.png` : ''"
						mode="widthFix"
					></u-image>
					<view class="weather-temperature">
						<text>{{ weatherNow ? `${weatherNow.now.temperature}℃` : '' }}</text>
					</view>
					<view class="weather-text">
						<text>{{ weatherNow ? `${weatherNow.now.text}` : '' }}</text>
					</view>
					<view class="weather-location">
						<text>{{ weatherNow ? `${weatherNow.location.name}` : '' }}</text>
					</view>
					<view class="weather-time">
						<text>
							{{
								weatherNow
									? `更新时间
						${dateFormat(weatherNow.last_update, 'HH:mm')}`
									: ''
							}}
						</text>
					</view>
				</view>
			</u-col>
			<u-col span="8">
				<view class="weather-wrap append-info">
					<view class="weather-future">
						<view class="future-item" v-for="(item, index) in weatherFuture ? weatherFuture.daily : []" :key="index">
							<view class="icon-day">
								<u-image class="weather-icon" width="60rpx" height="60rpx" :src="`/static/weather_icon/${item.code_day}@1x.png`" mode="aspectFit"></u-image>
							</view>
							<view class="future-text">{{ `${dateFormat(item.date, 'MM-DD')}&nbsp;&nbsp;&nbsp;&nbsp;${item.low}℃~${item.high}℃` }}</view>
							<view class="icon-night">
								<u-image class="weather-icon" width="60rpx" height="60rpx" :src="`/static/weather_icon/${item.code_night}@1x.png`" mode="aspectFit"></u-image>
							</view>
						</view>
					</view>
					<view class="suggestion"><u-notice-bar type="none" mode="vertical" :volume-icon="true" :duration="3000" :list="lifeSuggestion ? lifeSuggestion : []"></u-notice-bar></view>
				</view>
			</u-col>
		</u-row>
		<u-row gutter="16">
			<u-col span="12"><u-input v-model="input" :type="type" :border="border" :placeholder="placeholder" input-align="center" :clearable="true" /></u-col>
		</u-row>
		<u-row gutter="16">
			<u-col span="12"><u-button shape="circle" :ripple="true" @click="clickHandler">TaDa！</u-button></u-col>
		</u-row>
	</view>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			title: 'Hello',
			list: [
				{
					image: 'https://i.loli.net/2020/11/27/kiwm2MI1VTKCU7c.png'
				},
				{
					image: 'https://i.loli.net/2020/11/27/tuZvBGHjOVKU5Pz.png'
				},
				{
					image: 'https://i.loli.net/2020/11/27/azw7pXiSHYhC2UI.png'
				},
				{
					image: 'https://i.loli.net/2020/11/27/H5dMgey9h8C3vkr.png'
				}
			],
			list3d: false,
			input: '',
			type: 'text',
			border: false,
			placeholder:'请输入查询位置',
		};
	},
	computed: {
		weatherNow() {
			return this.$store.state.weatherNow ? this.$store.state.weatherNow : null;
		},
		weatherFuture() {
			return this.$store.state.weatherFuture ? this.$store.state.weatherFuture : null;
		},
		lifeSuggestion() {
			if (this.$store.state.lifeSuggestion) {
				let temp = this.$store.state.lifeSuggestion.suggestion;
				const list = Object.keys(temp);
				const newList = list.map(val => {
					switch (val) {
						case 'dressing':
							return '穿衣指数：' + temp[val]['brief'];
						case 'uv':
							return '紫外线指数：' + temp[val]['brief'];
						case 'flu':
							return '流感指数：' + temp[val]['brief'];
						case 'sport':
							return '运动指数：' + temp[val]['brief'];
						case 'car_washing':
							return '洗车指数：' + temp[val]['brief'];
						case 'travel':
							return '旅行指数：' + temp[val]['brief'];
						default:
							return '';
					}
				});
				temp = newList.filter(val => {
					return val;
				});
				return temp;
			} else {
				return null;
			}
		}
	},
	onLoad() {
		this.getWeatherNow();
		this.getWeatherFuture();
		this.getLifeSuggestion();
	},
	methods: {
		...mapActions({
			setWeatherNow: 'SET_WEATHER_NOW',
			setWeatherFuture: 'SET_WEATHER_FUTURE',
			setLifeSuggestion: 'SET_LIFE_SUGGESTION'
		}),
		dateFormat(date, format) {
			return moment(date).format(format);
		},
		async getWeatherNow() {
			const data = await this.request({
				method: 'get',
				url: this.api.now,
				data: {
					key: 'SCrlfctVDKNRrefXZ',
					location: 'chengdu',
					language: 'zh-Hans',
					unit: 'c'
				}
			});
			this.setWeatherNow(data.results[0]);
		},
		async getWeatherFuture() {
			const data = await this.request({
				method: 'get',
				url: this.api.future,
				data: {
					key: 'SCrlfctVDKNRrefXZ',
					location: 'chengdu',
					language: 'zh-Hans',
					unit: 'c',
					days: 3
				}
			});
			this.setWeatherFuture(data.results[0]);
		},
		async getLifeSuggestion() {
			const data = await this.request({
				method: 'get',
				url: this.api.suggestion,
				data: {
					key: 'SCrlfctVDKNRrefXZ',
					location: 'chengdu',
					language: 'zh-Hans'
				}
			});
			this.setLifeSuggestion(data.results[0]);
		},
		clickHandler() {
			this.$refs.uTips.show({
							title: '数据刷新中，请稍候',
							type: 'success',
							duration: '2000'
						})
		}
	}
};
</script>

<style scoped lang="scss">
.wrap {
	padding: 24rpx;
}

/deep/.u-row {
	margin: 16rpx;
}

.weather-wrap {
	background: #f2d6d6;
	border-radius: 8rpx;
	padding: 20rpx;
	height: 480rpx;
}

.main-info {
	text-align: center;
	color: white;
	font-weight: bold;
	.weather-icon {
	}
	.weather-temperature {
		margin: 20rpx 0;
		font-size: 2em;
		text-shadow: 0rpx 0rpx 2rpx #000000;
	}
	.weather-text {
		font-size: 1.5em;
		text-shadow: 0rpx 0rpx 2rpx #000000;
	}
	.weather-location {
		margin-top: 20rpx;
	}
	.weather-time {
		margin-top: 20rpx;
		font-size: 0.8em;
		color: #eaeaea;
	}
}
.append-info {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.weather-future {
		.future-item {
			&:nth-child(n + 2) {
				margin-top: 10rpx;
			}
			padding: 10rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 8rpx;
			background: #ffc1c1;
			.future-text {
				color: #f1f1f1;
				font-size: 0.8em;
			}
		}
	}
	.suggestion {
	}
}
</style>
