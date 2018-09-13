const util = require('util')
const liveApiRoot = 'http://api.csslcloud.net/api/'
const sparkApiRoot = 'http://spark.bokecc.com/api/'
const md5 = require('md5')
const request = require('request');

function Live(userId, apiKey, opts, client) {
    this.userId = userId.trim();
    this.apiKey = apiKey.trim();
    this.timeout = 10000;
    this.format = 'json';
    this.version = 'nodejs-1.0.0';
    this.client = client

    if (!util.isUndefined(opts) && util.isObject(opts)) {
        for (var key in opts) {
            this[key] = opts[key];
        }
    }
}

function Spark(userId, apiKey, opts, client) {
    this.userId = userId.trim();
    this.apiKey = apiKey.trim();
    this.timeout = 10000;
    this.format = 'json';
    this.version = 'nodejs-1.0.0';
    this.client = client

    if (!util.isUndefined(opts) && util.isObject(opts)) {
        for (var key in opts) {
            this[key] = opts[key];
        }
    }
}

function Client(userId, apiKey, sparkKey, opts) {
    this.userId = userId.trim();
    this.apiKey = apiKey.trim();
    this.sparkKey = sparkKey.trim()
    this.timeout = 10000;
    this.format = 'json';
    this.version = 'nodejs-1.0.0';

    this.live = new Live(userId, apiKey, opts, this)
    this.spark = new Spark(userId, sparkKey, opts, this)

    if (!util.isUndefined(opts) && util.isObject(opts)) {
        for (var key in opts) {
            this[key] = opts[key];
        }
    }
};

// 调用直播api方法
Live.prototype.call = async function (action, queryData) {
    var url = liveApiRoot + action.replace(/([A-Z])/g, (g) => `/${g[0].toLowerCase()}`)
    queryData.format = this.format
    var queryString = this.client.thqs(queryData)
    console.log(`${url}?${queryString}`)
    return await new Promise((resolve, reject) => {
        request(`${url}?${queryString}`, (error, response, body) => {
            if (error) {
                reject(error)
            }
            resolve(body)
        })
    })
}

// 验证直播参数有效性
Live.prototype.validate = function (params) {
    return this.client.validate(params, this.apiKey)
}

// 调用点播api方法
Spark.prototype.call = async function (action, queryData) {
    var url = sparkApiRoot + action.replace(/([A-Z])/g, (g) => `/${g[0].toLowerCase()}`)
    queryData.format = this.format
    var queryString = this.client.thqs(queryData, this.apiKey)
    console.log(`${url}?${queryString}`)
    return await new Promise((resolve, reject) => {
        request(`${url}?${queryString}`, (error, response, body) => {
            console.log(error)
            console.log(body)
            resolve(body)
        })
    })
}

// 验证点播参数有效性
Spark.prototype.validate = function (params) {
    return this.client.validate(params, this.apiKey)
}

Client.prototype.thqs = function (params, apiKey) {
    params.userid = this.userId
    var keys = Object.keys(params).sort()
    var qs = ''
    for (var key of keys) {
        if (params[key]) {
            qs += `${key.toLowerCase()}=${encodeURIComponent(params[key])}&`
        }
    }
    qs += `time=${Math.round(new Date().getTime() / 1000)}`
    qf = qs + `&salt=${apiKey || this.apiKey}`
    var md5String = md5(qf).toUpperCase()
    qs += `&hash=${md5String}`

    return qs
}
Client.prototype.validate = function (params, apiKey) {
    var hash = params.hash
    var time = params.time
    delete params.hash
    delete params.time
    var keys = Object.keys(params).sort()
    var qs = ''
    for (var key of keys) {
        qs += `${key}=${encodeURIComponent(params[key])}&`
    }
    qs += `time=${time}`
    qf = qs + `&salt=${apiKey || this.apiKey}`
    var md5String = md5(qf).toUpperCase()
    return hash == md5String
}

exports.Client = Client;