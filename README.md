# ESP32连接连接阿里云MQTT服务器

## 说明

1. 测试使用的是ESP32板子
2. 在阿里云上面开通的服务是“微消息服务队列mqtt版”
3. 用户控制台是微信小程序
4. 使用vscode和platformio进行开发
5. 已提交到官方demo



## 使用



1. 将vscode项目直接拖入vscode中（确认已经安装好了platformio，不一定要在vscode上面用）
2. 修改`mqtt_client.cpp`文件里面的各种配置，包括但不限于：
   - wifi名称和密码
   - mqtt服务器地址，在 阿里云微消息服务队列mqtt版 服务中可以找到，一般是这种格式`实例ID.mqtt.aliyuncs.com`
   - topic，主题，需要在阿里云上面提前进行配置
   - client_id，设备id，根据阿里云的要求和推荐，格式一般是`GID_GrounpID@@@deviceId`，比如你想要给实验室里面的3台设备都连上mqtt服务，那么这三台设备（对应三个client）的名称可以分别是`GID_lib@@@001`、`GID_lib@@@d002`、`GID_lib@@@003`
   - instanceId，实例ID，指的是阿里云上面的示例id，如`mqtt-cn-zxu35xmkl08`
   - accessKey和secretKey，这个是阿里云用户的两个字段，可以自行搜索了解
3. 将miniprogram导入微信开发者工具当中，在`mqttClient.ts`下面进行配置，配置的内容与第二步差不多，但是要注意，微信小程序自己的clientId一定不要与esp32里面设置的clientId一样，因为同一个client只能在线一个地方。



# 微信小程序截图

![简单demo](https://raw.githubusercontent.com/quarkape/ali-mqtt-esp32/main/mp_screenshot.jpg)