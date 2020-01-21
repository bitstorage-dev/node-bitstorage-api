# NodeJS BitStorage API

This project will allow you to create your own projects for interaction with the exchange [BitStorage](https://bitstorage.finance/api-docs).

#### Installation
```
npm install node-bitstorage-api --save
```
OR
```
git clone https://github.com/bitstorage-dev/node-bitstorage-api.git .
npm update
```


#### Getting started
```node
const bitstorage = require("node-bitstorage-api");
//config by specifying api key and secret
bitstorage.init_key({'key':'API KEY','secret':'API SECRET KEY'});
```

#### Info About all currency exchange
```node
let assets = bitstorage.queryApi('assets')
assets.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>

```
{
  NXB: {
    name: 'nxboost',
    unified_cryptoasset_id: 0,
    can_withdraw: true,
    can_deposit: true,
    min_withdraw: 50,
    max_withdraw: 1000000,
    maker_fee: 0.25,
    taker_fee: 0.25
  },
  DOGE: {
    name: 'dogecoin',
    unified_cryptoasset_id: 74,
    can_withdraw: true,
    can_deposit: true,
    min_withdraw: 200,
    max_withdraw: 1000000,
    maker_fee: 0.25,
    taker_fee: 0.25
  },
  BSF: {
    name: 'BITStorage',
    unified_cryptoasset_id: null,
    can_withdraw: true,
    can_deposit: true,
    min_withdraw: null,
    max_withdraw: null,
    maker_fee: 0.25,
    taker_fee: 0.25
  }
}
```
</details>

#### All info about trading pairs
```node
ticker = bitstorage.queryApi('ticker')
ticker.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>

```
{
  NXB_BTC: {
    base_id: 0,
    quote_id: 1,
    last_price: 1e-7,
    quote_volume: 0,
    base_volume: 0,
    isFrozen: 1
  },
  SICC_BTC: {
    base_id: 0,
    quote_id: 1,
    last_price: 1e-8,
    quote_volume: 0,
    base_volume: 0,
    isFrozen: 1
  },
  DOGE_BTC: {
    base_id: 74,
    quote_id: 1,
    last_price: 2.9e-7,
    quote_volume: 0,
    base_volume: 9.4e-7,
    isFrozen: 1
  }
}
```
</details>

#### Order book public method
```node
orderbook = bitstorage.queryApi('orderbook',{'market_pair':'LTC_BTC' , 'depth': 1 , 'level': 1})
orderBook.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>

```
{
  timestamp: 1579588331,
  asks: [ [ '0.00671549', '1.14803101' ] ],
  bids: [ [ '0.00657954', '0.43304520' ] ]
}
```
</details>

#### Trade history public method
```node
trades = bitstorage.queryApi('trades',{'market_pair':'LTC_BTC'});
trades.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>

```
[
    {
        "tradeID": 677429,
        "price": "7124.40150000",
        "base_volume": "0.00054492",
        "quote_volume": "4.62174174",
        "trade_timestamp": 1575896901,
        "type": "Sell"
    },
    {
        "tradeID": 677417,
        "price": "7123.75550000",
        "base_volume": "0.00054901",
        "quote_volume": "4.39435982",
        "trade_timestamp": 1575896666,
        "type": "Sell"
    }
]
```
</details>

#### Balance and Info methods
```node
balance = bitstorage.queryApi('balances-and-info')
balance.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>

```
{
    "balances-and-info": {
        "on_hold": {
            "BTC": {
                "withdrawal": 0,
                "total": 0.00002005,
                "order": 0.00002005
            },
            "DOGE": {
                "withdrawal": 0,
                "total": 100,
                "order": 100
            }
        },
        "available": {
            "BTC": 0.00035575,
            "DOGE": 179.23920463,
            "ETH": 0.008959,
            "LTC": 0.00226908
        },
        "usd_volume": 0,
        "fee_bracket": {
            "maker": 0.25,
            "taker": 0.25
        },
        "exchange_npc_volume": 0
    }
}
```
</details>


#### Open Orders
```node
openOrder = bitstorage.queryApi('open-orders',{'currency':'BTC', 'market':'DOGE'})
openOrder.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>

```
{ 
   "open-orders":{ 
      "market":"DOGE",
      "currency":"BTC",
      "bid":[ 
         { 
            "id":6316658,
            "side":"buy",
            "type":"limit",
            "amount":1400,
            "amount_remaining":1400,
            "price":2.7e-7,
            "avg_price_executed":0,
            "stop_price":0,
            "currency":null,
            "market":"DOGE",
            "status":"ACTIVE",
            "replaced":6316657,
            "replaced_by":0,
            "timestamp":1579167171
         },
         { 
            "id":6316660,
            "side":"buy",
            "type":"limit",
            "amount":150,
            "amount_remaining":150,
            "price":2.7e-7,
            "avg_price_executed":0,
            "stop_price":0,
            "currency":null,
            "market":"DOGE",
            "status":"ACTIVE",
            "replaced":6316659,
            "replaced_by":0,
            "timestamp":1579253492
         },
         { 
            "id":6316656,
            "side":"buy",
            "type":"limit",
            "amount":15,
            "amount_remaining":15,
            "price":2e-7,
            "avg_price_executed":0,
            "stop_price":0,
            "currency":null,
            "market":"DOGE",
            "status":"ACTIVE",
            "replaced":0,
            "replaced_by":0,
            "timestamp":1579166054
         }
      ],
      "ask":[ 

      ]
   }
}
```
</details>

#### User trade history
```node
history = bitstorage.queryApi('user-transactions',{'currency':'BTC', 'market':'DOGE' , 'limit':10 , 'side':'buy'});
history.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>

```
{
    "user-transactions":
  {
        "market":"DOGE",
        "currency":"BTC",
        "data":
    [
        {
            "id":680952,
            "date":"2019-12-10 08:09:31",
            "timestamp":1575958171,
            "btc":100,
            "side":"sell",
            "price":3.4e-7,
            "amount":0,
            "fee":0,
            "currency":null
        },
        {
            "id":616935,
            "date":"2019-11-23 09:29:30",
            "timestamp":1574494170,
            "btc":1898.39530592,
            "side":"sell",
            "price":0,
            "amount":0,
            "fee":0,
            "currency":null
        }
    ]
  }
}
```
</details>


#### Place One (or Many) New Orders
```node
orderNew = bitstorage.queryApi('orders/new',{'side':'sell','type':'limit','currency':'BTC','market':'DOGE','amount':15,'stop_price':0,'limit_price':0.00000027);
orderNew.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>
 
```
{ 
   "orders-new":[ 
      { 
         "transactions":0,
         "new_order":1,
         "order_info":{ 
            "id":6316661,
            "side":"sell",
            "type":"limit",
            "amount":15,
            "amount_remaining":15,
            "price":2.7,
            "avg_price_executed":0,
            "stop_price":0,
            "market":"DOGE",
            "currency":"BTC",
            "status":"ACTIVE"
         }
      }
   ]
}
```
</details>

```node
orderNew = bitstorage.queryApi('orders/new',{
    'orders': [
		{'side':'sell','type':'limit','currency':'BTC','market':'DOGE','amount':11,'stop_price':0,'limit_price':0.00000028},
		{'side':'sell','type':'limit','currency':'BTC','market':'DOGE','amount':19,'stop_price':0,'limit_price':0.00000029}
		]
    });
orderNew.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>
 
```
{ 
   "orders-new":[ 
      { 
         "transactions":0,
         "new_order":1,
         "order_info":{ 
            "id":6316677,
            "side":"sell",
            "type":"limit",
            "amount":11,
            "amount_remaining":11,
            "price":2.8e-7,
            "avg_price_executed":0,
            "stop_price":0,
            "market":"DOGE",
            "currency":"BTC",
            "status":"ACTIVE"
         }
      },
      { 
         "transactions":0,
         "new_order":1,
         "order_info":{ 
            "id":6316678,
            "side":"sell",
            "type":"limit",
            "amount":19,
            "amount_remaining":19,
            "price":2.9e-7,
            "avg_price_executed":0,
            "stop_price":0,
            "market":"DOGE",
            "currency":"BTC",
            "status":"ACTIVE"
         }
      }
   ]
}
```
</details>

#### Edit One (or Many) Orders
```node
orderEdit = bitstorage.queryApi('orders/edit',{'id':6316677,'type':'market','amount':20,'stop_price':0,'limit_price':0.00000027})
orderEdit.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>

```
{ 
   "orders-edit":[ 
      { 
         "transactions":1,
         "edit_order":0,
         "order_info":{ 
            "id":6316679,
            "side":"sell",
            "type":"market",
            "amount":20,
            "amount_remaining":0,
            "price":2.7e-7,
            "avg_price_executed":2.7e-7,
            "stop_price":0,
            "market":"DOGE",
            "currency":"BTC",
            "status":"FILLED",
            "replaced":6316677
         }
      }
   ]
}
```
</details>

```node
orderEdit = bitstorage.queryApi('orders/edit',{ 
	'orders': [
		{'id':6316673,'type':'market','amount':20,'stop_price':0,'limit_price':0.00000027},
		{'id':6316672,'type':'market','amount':20,'stop_price':0,'limit_price':0.00000027}
		]
});
orderEdit.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>

```
{ 
   "orders-edit":[ 
      { 
         "error":{ 
            "message":"Order not found.",
            "code":"ORDER_NOT_FOUND"
         }
      },
      { 
         "transactions":1,
         "edit_order":0,
         "order_info":{ 
            "id":6316676,
            "side":"sell",
            "type":"market",
            "amount":20,
            "amount_remaining":0,
            "price":2.7e-7,
            "avg_price_executed":2.7e-7,
            "stop_price":0,
            "market":"DOGE",
            "currency":"BTC",
            "status":"FILLED",
            "replaced":6316672
         }
      }
   ]
}
```
</details>

#### Existing Crypto Deposit Addresses
```node
getAddress = bitstorage.queryApi('btc-deposit-address/get',{'market':'BTC','limit':1});
getAddress.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>

```
{ 
   "btc-deposit-address-get":[ 
      { 
         "id":3444,
         "address":"39fHFx9Pj5hekUhtSHhptcLDf7MHTXq47B",
         "cryptonot_address":"",
         "site_user":1233,
         "date":"2019-11-24 14:44:47",
         "system_address":"N",
         "hot_wallet":"N",
         "warm_wallet":"N",
         "c_currency":28,
         "merch_address":"N",
         "merch_site":null,
         "merch_user":""
      }
   ]
}
```
</details>

#### Get New Crypto Deposit Addresses
```node
newAddress = bitstorage.queryApi('btc-deposit-address/new',{'market':'BTC'});
newAddress.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>

```
{ 
   "crypto-deposit-address-new":{ 
      "address":"33hifwz4ZNMnHcUyA3cs6PjwugqwUTczKx"
   }
}
```
</details>

#### Make a Withdrawal
```node
newWithdrawals = bitstorage.queryApi('withdrawals/new',{'currency':'NXB','amount':100,'address':'NF8wC43ZxmpWjCeaAvtpr9FiK8pd83Xvd6'})
newWithdrawals.then(resolve => console.log(resolve))
```
<details>
 <summary>View Response</summary>

```
[]
```
</details>

