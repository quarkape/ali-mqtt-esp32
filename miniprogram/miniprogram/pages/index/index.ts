// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const mqttclient = require('../../mqttClient.js')

Page({
  data: {
    client: null,
    connectStatus: false,
    LEDStatus: 0,
    sentMessages: [],
    receivedMessages: [],
    subscribeStatus: false,
    topic: 'xfsystem'
  },
  connectMQTT() {
    const _this = this;
    this.setData({
      client: mqttclient.connect2MQTT()
    })
    this.data.client.on('connect', (e: object) => {
      console.log(`mqtt on connect: ${e}`);
      wx.showToast({
        title: '连接成功',
        icon: 'success',
        duration: 2000
      })
      _this.setData({
        connectStatus: true
      })
    })
    this.data.client.on('error', (err: object) => {
      console.log(`mqtt on error: ${err}`);
    })
    this.data.client.on('disconnect', (e: object) => {
      console.log(`mqtt on disconnect: ${e}`);
      _this.setData({
        connectStatus: false
      })
      wx.showToast({
        title: '断开连接',
        icon: 'error',
        duration: 2000
      })
    })
  },

  subscribeTopic() {
    const _this = this;
    this.data.client.subscribe(_this.data.topic, { qos: 0 }, function (err: object) {
      if (!err) {
        console.log("mqtt sub success");
        _this.setData({
          subscribeStatus: true
        })
        _this.receivedMessage()
      }
    })
  },

  openLED() {
    if (this.data.client !== null) {
      this.data.client.publish(this.data.topic, "1");
      let arr = this.data.sentMessages;
      arr.push(`${this.data.topic}==>1`);
      this.setData({
        sentMessages: arr,
        LEDStatus: true
      })
    } else {
      wx.showToast({
        title: '尚未连接',
        icon: 'error',
        duration: 2000
      })
    }
    
  },

  closeLED() {
    if (this.data.client !== null) {
      this.data.client.publish(this.data.topic, "0");
      let arr = this.data.sentMessages;
      arr.push(`${this.data.topic}==>0`);
      this.setData({
        sentMessages: arr,
        LEDStatus: false
      })
    } else {
      wx.showToast({
        title: '尚未连接',
        icon: 'error',
        duration: 2000
      })
    }
  },
  receivedMessage() {
    const _this = this;
    this.data.client.on('message', function (topic, message, packet) {
      var payload = packet.payload.toString();
      console.log("mqtt on message:", payload);
      _this.data.receivedMessages.push(payload);
      if (payload == 'server_cmd_send_test') {
        _this.data.client.publish(_this.data.topic, "send_test from minip");
      }
    })
  }
})
