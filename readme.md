# cc视频sdk

## 用法

```
const CClivesdk = require('./modules/cclivesdk')
let ccClient = new CClivesdk.Client(userId, apiKey, sparkApiKey)

var result = await ccClent.live.call("roomCreate", params)

console.log(result) // {"result":"OK", ...}

var result2 = await ccClient.spark.call("user", {})

//{"user":{"account":"","version":"","expired":"2018-07-31","space":{"total":100,"remain":100,
"used":0},"traffic":{"total":100,"remain":100,"used":0}}}
```

可参考test.js中的用法

[cc视频直播api](https://doc.bokecc.com/live/dev/liveapi/#toc_0)

[cc视频点播api](https://doc.bokecc.com/vod/dev/SparkAPI/spark01/)