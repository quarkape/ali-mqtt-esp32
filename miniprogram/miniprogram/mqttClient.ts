const mqtt: any = require('./utils/mqtt/mqtt.min.js');
const CryptoJS = require('./utils/mqtt/crypto-js.js');

// 阿里MQTT的相关配置
const instanceId: string = ''; //实例 ID，购买后从控制台获取
const host: string = ''; // 设置当前用户的接入点域名，接入点获取方法请参考接入准备章节文档，先在控制台创建实例
const port: number = 80; // WebSocket 协议服务端口，如果是走 HTTPS，设置443端口
const topic: string = 'xfsystem'; // 需要操作的 Topic;第一级父级 topic 需要在控制台申请
const accessKey: string = ''; // 账号的 AccessKey，在阿里云控制台查看
const secretKey: string = ''; // 账号的的 SecretKey，在阿里云控制台查看
const cleansession: boolean = true;
const groupId: string = 'GID_test'; // MQTT GroupID;创建实例后从 MQTT 控制台创建
const clientId: string = groupId + '@@@mp';// GroupId@@@DeviceId，由控制台创建的 Group ID 和自己指定的 Device ID 组合构成
//username 和 Password 签名模式下的设置方法
let client: any = null;
const username: string = `Signature|${accessKey}|${instanceId}`;
const password: string = CryptoJS.HmacSHA1(clientId, secretKey).toString(CryptoJS.enc.Base64);

// 配置超时时间
const reconnectTimeout: number = 2000;

function connect2MQTT() {

  const options = {
    connectTimeout: 30000,
    keepalive: 120,
    clientId: clientId,
    username: username,
    password: password,
  }

  client = mqtt.connect(`wxs://${host}`, options);
 
  // 重新连接
  // client.on('reconnect', (e: object) => {
  //   console.log(`mqtt on reconnect: ${e}`)
  // })
 
  // 断开连接
  // client.on('disconnect', (e: object) => {
  //   console.log(`mqtt on disconnect: ${e}`);
  // })
 
  // 连接出错
  // client.on('error', (err: object) => {
  //   console.log(`mqtt on error: ${err}`)
  // })
 
  // 连接到mqtt服务器
  // client.on('connect', (e: object) => {
  //   console.log(`mqtt on connect: ${e}`)
  //   client.subscribe(topic, { qos: 0 }, function (err: object) {
  //       if (!err) {
  //         console.log("mqtt sub success")
  //       }
  //   })
  // })

  // 接收到消息
  // client.on('message', function (topic, message, packet) {
  //   var payload = packet.payload.toString()
  //   console.log("mqtt on message:", payload)
  //   if (payload == 'server_cmd_send_test') {
  //     client.publish(topic, "send_test from minip");
  //   }
  // })

  return client;
}

module.exports = {
  connect2MQTT
}