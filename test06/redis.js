const redis = require('redis')

const client = redis.createClient(6379,'localhost')

// get 同步
client.set('hello','hahaha')
// set 异步
client.get('hello',function(err,v){
    console.log('redis key:',v)
})