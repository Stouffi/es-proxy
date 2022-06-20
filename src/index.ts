import proxy from "express-http-proxy";
import exp from "express";
import aws4 from "aws4";

const app = exp();
const esUrl = process.env["ES_URL"]!;
const accessKeyId = process.env["AWS_ACCESS_KEY_ID"]!;
const secretAccessKey = process.env["AWS_SECRET_ACCESS_KEY"]!;

// app.use(exp.raw({ type: "application/json" }));

app.use(
  proxy(esUrl, {
    // proxyReqOptDecorator(reqOpts, request) {
    //   const headers = reqOpts.headers ?? {};
    //   const { ["content-type"]: contentType, date: dateHeader } = headers;
    //   const reqOptions: aws4.Request = {
    //     headers: Object.assign(
    //       contentType ? { "Content-Type": contentType } : {},
    //       dateHeader ? { Date: dateHeader } : {}
    //     ),
    //   };
    //   if (request.body instanceof Buffer) {
    //     reqOptions.body = request.body;
    //   }
    //   if (reqOpts.host) {
    //     reqOptions.host = reqOpts.host
    //   }
    //   if (reqOpts.path) {
    //     reqOptions.path = reqOpts.path
    //   }
    //   if (reqOpts.method) {
    //     reqOptions.method = reqOpts.method
    //   }
    //   console.log("REQ OPTS", reqOpts.headers, reqOptions);
    //   aws4.sign(reqOptions, { accessKeyId, secretAccessKey });
    //   console.log("AFTER", reqOptions);
    //   return reqOptions;
    // },
    proxyReqOptDecorator(reqOpts, request) {
      
      aws4.sign({host: reqOpts.host!, path: reqOpts.path!}, { accessKeyId, secretAccessKey });
      // console.log("AFTER", reqOptions);
      return reqOpts;
    },
  })
);

app.listen(process.env["PORT"], () => {
  console.log("proxy started");
});
