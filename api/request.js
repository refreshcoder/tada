import Vue from 'vue'

const request = (options) => {
	return new Promise((resolve,reject) => {
		uni.request({
			...options,
			success: (res) => {
				if(res.statusCode == '200'){
					resolve(res.data)
				}else{
					reject(res)
				}
			},
			error:(err)=>{
				reject(err)
			}
		});
	})
}


export default request
