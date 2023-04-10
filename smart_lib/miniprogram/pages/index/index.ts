// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const mqttclient = require('../../mqttClient.js')

Page({
  data: {
    client: null
  },
  connectMQTT() {
    this.setData({
      client: mqttclient.connectMQTT()
    })
    console.log(this.data.client === null)
    
  },
  sendMessage() {
    this.data.client.publish('xfsystem', "1");
  },
  sendMessageb() {
    this.data.client.publish('xfsystem', "0");
  }
})
