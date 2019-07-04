//全局路径
const commonUrl = 'http://127.0.0.1:4000'

//解析json
function parseJSON(response) {
    return response.json()
}

//检查请求状态
function checkStatus(response) {
    debugger;
    if (response.status >= 200 && response.status < 500) {
        return response
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
}

// 格式化请求参数：?username=XXXX&password=XXXX
function formatUrl(data) {
    let queryStr = '';
    for (let key in data) {
        let value = data[key] === null || data[key] === undefined ? '' : data[key];
        queryStr += queryStr === '' ? `?${key}=${value}` : `&${key}=${value}`;
    }
    return queryStr;
}

export default function request(options = {}) {
    let {data, url} = options;
    options = {...options};
    options.mode = 'no-cors'; //跨域
    delete options.url;
    if (options.method === 'get') {
        if (data) {
            url = url + formatUrl(data);
        }
    }
    // 对非get类请求头和请求体做处理
    if (options.method === 'post' || options.method === 'put' || options.method === 'delete') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.body = JSON.stringify(options.body);
    }
    delete options.data;
    options.headers = {
        "Content-type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    }
    return fetch(commonUrl + url, options/*, {credentials: 'include'}*/);
    /*.then(checkStatus)
    .then(parseJSON)
    .catch(err => ({err}))*/
}