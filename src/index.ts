import proxy from 'express-http-proxy'
import exp from  'express'
import aws4 from 'aws4'

const app = exp()

const esUrl = process.env['ES_URL']!
const accessKeyId = process.env['AWS_ACCESS_KEY_ID']
const secretAccessKey = process.env['AWS_SECRET_ACCESS_KEY']

app.use(proxy(esUrl, {proxyReqOptDecorator(reqOpts, srcReq) {
    console.log('REQ OPTS', reqOpts)
    aws4.sign(reqOpts as aws4.Request, {accessKeyId, secretAccessKey})
    console.log('AFTER', reqOpts)
    return reqOpts
},}));

app.listen(process.env['PORT'], () => {
    console.log('proxy started')
})