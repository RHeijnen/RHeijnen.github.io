var unirest = require('unirest');

var img = "https://i.imgur.com/sZL7bMs.jpg"
var imgpng = "https://imgur.com/a/rIXn5"
console.log(img)
unirest.post("http://cl-api.vize.ai/3657?image=" + imgpng)

.header("Authorization", "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjM0MzgsImlhdCI6MTUxMTQzNzMyNiwiZXhwIjoxNTE5MjEzMzI2fQ.vqRn6VJKLjl2gte65ylFx_JP7O5XUym8_YRVdDDxQQA")
.header("Content-Type", "application/x-www-form-urlencoded")
.header("Accept", "text/plain")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});