const fetch = require("node-fetch");
var CryptoJS = require("crypto-js");
var config = {
    'base' : 'https://pub.bitstorage.finance/',
    'wapi' : 'https://bitstorage.finance/'
}

const apiMethod = {
    'assets' : {
        'method' : 'v2/assets',
        'type' : 'public',
    },
    'ticker' : {
        'method' : 'v2/ticker',
        'type' : 'public',
    },
    'orderbook' : {
        'method' : 'v2/orderbook',
        'type' : 'public',
        'require' : ['market_pair' , 'depth' , 'level' ]
    },
    'trades' : {
        'method' : 'v2/trades',
        'type' : 'public',
        'require' : ['market_pair']
    },
    'balances-and-info' : {
        'method' : 'api/balances-and-info', 
        'type' : 'private',
    },
    'open-orders' : {
        'method' :'api/open-orders', 
        'type' : 'private',
        'require' : ['currency', 'market']
    },
    'orders/new' : {
        'method' :'api/orders/new', 
        'type' : 'private',
        'require' : ['side','type','currency','market','amount','stop_price','limit_price']
    },
    'orders/edit' : {
        'method' :'api/orders/edit', 
        'type' : 'private',
        'require' : ['id','type','amount','stop_price','limit_price']
    },
    'btc-deposit-address/get' : {
        'method' :'api/btc-deposit-address/get', 
        'type' : 'private',
        'require' : ['market','limit']
    },
    'btc-deposit-address/new' : {
        'method' :'api/btc-deposit-address/new', 
        'type' : 'private',
        'require' : ['market']
    },
    'withdrawals/new' : {
        'method' :'api/withdrawals/new', 
        'type' : 'private',
        'require' : ['currency','amount','address']
    },
    'user-transactions' : {
        'method' :'api/user-transactions', 
        'type' : 'private',
        'require' : ['currency', 'market' , 'limit' , 'side' ]
    }
}

exports.init_key = function (cfg) {
	config.key = cfg.key;
	config.secret = cfg.secret;
};


function checkParam(name, data, require = []) {
    if('require' in apiMethod[name]) {
        if('orders' in data) {
            data['orders'].forEach(elem => {
                require.forEach(element => {
                    if(!elem[element] && isNaN(elem[element])) {
                        throw new Error(`Method ${name} requires ${element} parameter.`)
                    }
                })    
            })
        } else {
        require.forEach(element => {
            if(!data[element] && isNaN(data[element])) {
                throw new Error(`Method ${name} requires ${element} parameter.`)
            }
        })
        }
    }
    return true
}

function checkKey() {
    if(!config.key)
        throw new Error(`Not found API KEY`)
    if(!config.secret)
        throw new Error(`Not found API SECRET KEY`)
    return true
}

function getUrl(name,data) {
    var url = apiMethod[name].method
    if('require' in apiMethod[name]) {
        apiMethod[name].require.forEach(r => {
            url += '/' + data[r];    
        })
    }
    return url
}

function setSignData(name,data) {
    var params = {
        'api_key' : config.key,
        'nonce' : parseInt(Math.round(new Date().getTime() / 1000))	
    }
    if('require' in apiMethod[name]) {
        if('orders' in data) {
            params['orders'] = JSON.stringify(data['orders'])
            console.log(params)
        } else {
        apiMethod[name].require.forEach(element => {
            params[element] = data[element]
            })
        } 
    }
    
    var hash = sign(params)
    params.signature = hash;
    var boundary = String(Math.random()).slice(2);
    var boundaryMiddle = '--' + boundary + '\r\n';
    var boundaryLast = '--' + boundary + '--\r\n'
    var dataParams = ['\r\n'];
    for (var key in params) {
        dataParams.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + params[key] + '\r\n');
    }
    dataParams = dataParams.join(boundaryMiddle) + boundaryLast;

    return {'dataParams' : dataParams,'boundary': boundary}
}


function sign(params) {
    return CryptoJS.HmacSHA256(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(params))), config.secret).toString()
}

exports.queryApi = async function api_query (name, data = {}) { 
    
    checkParam(name,data,apiMethod[name].require)

    if(apiMethod[name].type == 'public') {
        var response = await fetch(config.base + getUrl(name,data));
    } else {
        checkKey()
        var postData = setSignData(name,data)
        var response = await fetch(config.wapi + apiMethod[name].method, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=' + postData.boundary
              },
            body: postData.dataParams
        })
     }
     if (response.ok) { 
        let json = await response.json();
        return(json);
    } else {
        throw new Error(`Error HTTP ` + response.status)
    }
    
}






 

