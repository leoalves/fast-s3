const AWS = require('aws-sdk')

exports.getFile = function (bucket, key, contentType) {
  let s3 = new AWS.S3()
  let params = {
    Bucket: bucket,
    Key: key
  }
  if (contentType) {
    params.ResponseContentType = contentType
  }
  return s3.getObject(params).promise()
  .then((res) => {
    if (res.Body) {
      return JSON.parse(res.Body.toString(res.ContentEncoding))
    } else {
      throw new Error('Error getting file from S3')
    }
  })
  .catch((err) => {
    throw new Error(err)
  })
}
