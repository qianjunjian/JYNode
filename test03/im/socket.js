const net = require("net");
const chatServer = net.createServer();

const clientList = [];

chatServer.on("connection", client => {
    client.write('Hi!\n');
    clientList.push(client);

    client.on("data", data => {
        console.log("receiveData:", data.toString())
        clientList.forEach(v => {
            client.write('\n');
            v.write(data.toString())
        })
    })
})

chatServer.listen(9000, () => {
    console.log("启动成功！")
})

// 测试：启动服务后，telnet localhost 9000