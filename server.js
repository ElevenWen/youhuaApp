var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var  fs=  require('fs');



//httpServer设置
app.get('/', function(req, res){
  console.log(req);
  function recall(data){
    res.send(data.toString());
  }
  fs.readFile('./src/view/customerService.vue', function(err,  data)  {
    if  (err)  {
      console.log("bbbbb:"+err);
      recall('文件不存在');
    }else{
      console.log("123")
      console.log(data.toString());
      recall(data);
    }
  });
});

//websocket设置
var onlineUsers = {};
var i=0;

io.on('connection', function(socket){
  i++;
  console.log(i+'有人连上来了');
  socket.emit('ttt',i)
  //监听新用户加入
  socket.on('login', function(sign,obj) {
    //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
    socket.name = obj.userid;
    onlineUsers[socket.name] = socket;
    if(i==3){
      socket.join('group2');
    }else {
      socket.join('group1');
    }
  })



  //监听用户发布聊天内容
  socket.on('message', function(sign,msg){
    //向所有客户端广播发布的消息
    // socket.send(msg)
    //聊天记录存入数据库
    var mess = {
      username:msg.userid,
      msg:msg.content,
      time:msg.time
    };
    //var message = new Message(mess);
    //message.save(function (err, mess) {
    //  if (err) {
    //    console.log(err)
    //  }
      //db.disconnect();
    //});

    //向相应房间发送消息
    io.sockets.in('group'+sign).emit('event_name', msg);
  });

  //监听用户退出
  socket.on('disconnect', function(){
    console.log(i+'有人退出');
    delete onlineUsers[socket.name];
  });







//连接数据库
//var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;// 用于异步回调(不写报错)
//var db = mongoose.connect('mongodb://localhost/vuechat');
//var Message = require('./models/message');

//添加数据
// user.save(function (err,rs) {
//   console.log(err);
//   console.log(rs);
//   db.disconnect();//关闭连接
// });
//查询(多条)
// User.find({pwd:'bb'},function (err,rs) {
//   console.log(rs);
//   db.disconnect();//关闭连接
// })
//查询（一条）
// User.findOne({pwd:'bb'},function (err,rs) {
//   console.log(rs);
//   db.disconnect();//关闭连接
// })
//修改数据(一条)
// User.update({_id:2},{$set:{name:'李四'}},function (err,rs) {
//   console.log(rs);
//   db.disconnect();//关闭连接
// })
//修改数据(多条)
// User.update({name:'李四'},{$set:{name:'张三'}},{multi:true},function (err,rs) {
//   console.log(rs);
//   db.disconnect();//关闭连接
// })
//删除(得用主键删除)
// User.remove({_id:1},function (err,rs) {
//   console.log(rs);
//   db.disconnect();
// })




});

http.listen(9000, function(){
  console.log('listening on *:9000');
});
