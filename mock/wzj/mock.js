import mockjs from 'mockjs';
export default {
  'GET /api/getwechatUser': mockjs.mock({
    'users|20-30': [{
     no:'@integer',  nickName:'这是一个名字',headimg:'这是一个头像地址', gender: '@integer(0, 2)', address:'@county(true)',create:'@datetime()',subscribe:'@integer(1, 2)',receive:'@integer(1, 2)',
      event_key:'@guid()'
    }]
  }),
  'GET /api/QRcodeManagement': mockjs.mock({
    'QRcodes|20-30' :[{
      no:'@integer',
      wechat:{
        name:'@name',
        title:'@ctitle',
        appid:'@id',
      },
      notice:'@cparagraph',
      key:'@first',
      status:1
    }]
  })
}