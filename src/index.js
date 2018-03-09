import express from 'express'

import app from './server'

app.use(express.static(`${__dirname}/../public`))
