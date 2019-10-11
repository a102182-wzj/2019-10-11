import { Toast } from 'antd-mobile'
import { notification, Spin } from 'antd'
// import { baseUrl } from './baseServer';
import { getToken, setToken } from './token';
import { is_mobile } from './common'
// import router from 'umi/router';

// const baseUrl = "http://yun.hippokidcare.com/"
const baseUrl = "https://api.hippokidcare.com/"

const fetch = require('dva').fetch;

const codeMessage = {
    200: 'ok',
    201: '执行成功',
    202: '服务器已接收，未返回任何',
    204: '删除成功',
    400: '请求出错',
    401: '无访问权限',
    403: '禁止访问',
    404: '未找到数据',
    406: '请求参数不正确',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '系统错误，请联系管理员',
    502: '服务器网络错误',
    503: '服务不可用，服务器过载或维护。',
    504: '请求超时',
};

function checkStatus(response, result, showError) {
    console.log("response", response)
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errorText = result.msg !== undefined ? result.msg : false || codeMessage[response.status] || response.statusText;

    if (showError) {
        if (is_mobile()) {
            Toast.fail(errorText, 3);
        } else {
            notification.open({
                message: '警告',
                description: errorText,
            });
        }
    }
    Toast.hide()

    if (result.error_code === 4001) {
        window.location.href = "/"
    }

    let error = new Error(errorText)
    error.name = response.status
    error.response = response
    throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {object} [options] The options we want to pass to "fetch"
 * {
 *   url: user,
 *   method: 'get',
 *   data: params,
 *   headers:{}
 * }
 * {
 *      method: 'POST', 
 *      mode: 'cors',
 *      body:JSON.stringify(tubState),
 *      headers:myHeaders
 *}
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(options, showError) {
    // 判断是否显示loading
    if (options.loading) Toast.loading('loading', 0)
    let headers = options.headers || {}
    headers["Authorization"] = "Bearer " + getToken()
    let url = options.url
    if (url.indexOf("http://") < 0 && url.indexOf("https://") < 0)
        url = baseUrl + url

    const option = {
        method: options.method,
        mode: 'cors',
        body: JSON.stringify(options.params),
        headers: headers
    }
    const response = await fetch(url, option)
    console.log('response', response)
    // if (showError)
    //     try
    //         checkStatus(response)
    //     catch

    //     return {}
    const data = await response.json();
    checkStatus(response, data, showError)

    console.log("data", data)

    const ret = {
        data: data.msg === undefined ? data : [],
        msg: data.msg || "",
        headers: {},
    };

    if (response.headers.get('x-total-count')) {
        ret.headers['x-total-count'] = response.headers.get('x-total-count');
    }
    Toast.hide()
    return ret;
}

request.get = (url, showError = true, loading = true) => {
    let options = {};
    options.method = 'GET';
    options.url = url;
    options.loading = loading
    return request(options, showError);
}

request.post = (url, data, showError = true, loading = true) => {
    let options = {};
    options.params = data || {};
    options.method = 'POST';
    options.url = url;
    options.loading = loading
    console.log("options", options)
    return request(options, showError);
};

request.put = (url, data, showError = true, loading = true) => {
    let options = {};
    options.body = data || {};
    options.method = 'PUT';
    options.url = url;
    options.loading = loading
    return request(options, showError);
};

request.delete = (url, data, showError = true, loading = true) => {
    let options = {};
    options.params = data || {};
    options.method = 'DELETE';
    options.url = url;
    options.loading = loading
    return request(options, showError);
};
