import express from 'express'
import webpack from 'webpack'
import config from './webpack.config.dev'

import app from './src/server'

const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})
