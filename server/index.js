const express = require('express')
const finnhub = require('finnhub')
const url = require('url')
const api_key = finnhub.ApiClient.instance.authentications['api_key']
api_key.apiKey = 'cbpnk6iad3ieg7fat8jg'
const finnhubClient = new finnhub.DefaultApi()

const PORT = process.env.PORT || 4001

const app = express()

app.get('/api/symbols/:exchangeIdentifier', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  finnhubClient
    .stockSymbols('US', (error, data, response) => {
      console.log('res', data)
      console.log('error', error)
      // res.json(data)
    })
    .catch((e) => {
      console.log(e)
    })
  console.log('PARMAS', req.params)
})

app.get('/api/price/', async (req, res) => {
  const queryObject = url.parse(req.url, true).query
  console.log(queryObject)
  res.setHeader('Access-Control-Allow-Origin', '*')
  finnhubClient.stockCandles(
    queryObject.symbol,
    queryObject.resolution,
    queryObject.from,
    queryObject.to,
    (error, data, response) => {
      console.log('DATA', data)
      console.log('error', error)
      // console.log('response', response)
      res.json(data)
    }
  )
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
