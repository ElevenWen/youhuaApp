import axios from 'axios'
import qs from 'qs'
var report = axios.create({
baseURL: 'https://acct.wqbol.com', // 记账报税java后台
//  baseURL: 'https://acct.wqbol.net', // 记账报税测试java后台
	timeout: 123123,
});



//POST传参序列化
report.interceptors.request.use((config) => {
//	config.data = qs.stringify(config.data);
//console.log(config)
	return config;
}, (error) => {});

//返回状态判断
report.interceptors.response.use((res) => {
	
	if(res.data.info == -1){
		return Promise.reject(res);
	}
//console.log(res,1111)
	return res;

}, (error) => {
	//console.log('Promise.reject(res) ',error)
});

export default {
	fetch(type, url , params  ) {
		return new Promise((resolve, reject) => {
			switch (type) {
				case 'post':
					report.post(url, params)
						.then(response => {
							resolve(response.data);
						}, err => {
							reject(err);
						})
						.catch((error) => {
							reject(error)
						})
					break;
				case 'get':
					report.get(url, params)
						.then(response => {
							resolve(response.data);
						}, err => {
							reject(err);
						})
						.catch((error) => {
							reject(error)
						})
					break;

			}

		})
	}
}