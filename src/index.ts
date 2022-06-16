import proxy from 'express-http-proxy'
import exp from  'express'
import aws4 from 'aws4'

const app = exp()

const esUrl = process.env['ES_URL']!
const accessKeyId = process.env['AWS_ACCESS_KEY_ID']
const secretAccessKey = process.env['AWS_SECRET_ACCESS_KEY']

app.use(proxy(esUrl, {proxyReqOptDecorator(reqOpts) {
    const reqOptions:aws4.Request = {host: reqOpts.host ?? undefined}
    console.log('REQ OPTS', reqOptions)
    aws4.sign(reqOptions, {accessKeyId, secretAccessKey})
    console.log('AFTER', reqOptions)
    return reqOptions
},}));

app.listen(process.env['PORT'], () => {
    console.log('proxy started')
})