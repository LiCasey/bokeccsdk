const CClivesdk = require('../../cclivesdk')
const config = require('../../../config/config.default.js')
const ccClient = new CClivesdk.Client(config.cclive.userId, config.cclive.apiKey, config.cclive.sparkKey)

console.log(ccClient)
var f1 = async () => {

    // 创建直播间
    // var result = await ccClient.call("roomCreate", {
    //     name: '测试直播间',
    //     desc: '第一个直播间',
    //     templatetype: 1,
    //     authtype: 2,
    //     publisherpass: '123',
    //     assistantpass: '123'
    // })
    // console.log(result)
    
    // 更新直播间信息
    // var result = await ccClient.live.call("roomUpdate", {
    //     roomid: '365D09F014F70DB39C33DC5901307461',
    //     name: '修改直播间名称3',
    //     desc: '修改直播间描述2',
    //     templatetype: 1,
    //     authtype: 1,
    //     publisherpass: '123',
    //     assistantpass: '123',
    //     playpass: '456'
    // })
    // console.log(result)

    // 点播：获取用户信息
    var result = await ccClient.spark.call("user", {})
    console.log(result)
}

f1()
