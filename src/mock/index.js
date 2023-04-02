// 引入mockjs
import Mock from 'mockjs';

// 获取 mock.Random 对象
const Random = Mock.Random;

// 使用mockjs模拟数据
const tableList = [
  {
    id: '5ffa80aD-9CF4-0C77-eBFC-f6612BfAcF4F',
    account: 'admin',
    password: 'admin',
    address: '36918166@qq.com'
  },
  {
    id: '4FcC922C-C72c-95c3-Ef92-FbFAc24cc831',
    account: 'ebHoL6',
    password: 'i320Hu74fbn2Gi',
    address: '48165263@qq.com'
  }
];
// 随机生成
// for (let i = 0; i < 20; i++) {
//   let newObject = {
//     id: Random.guid(), // 获取全局唯一标识符
//     account: /^[a-zA-Z0-9]{4,6}$/,
//     password: /^[a-zA-Z]\w{5,17}$/,
//     address: /[1-9]\d{7,10}@qq\.com/,
//   };
//   tableList.push(newObject);
// }
/** get请求
 * 获取用户列表
 */

/** 注册接口 */
Mock.mock('/api/register', 'post', (params) => {
  const newData = JSON.parse(params.body);
  // 生成随机的id
  newData.id = Random.guid();
  // 添加用户到数据表
  tableList.push(newData);
  return {
    status: 0,
    msg: 'success',
    token: Random.guid(),
    data: tableList
  };
});
/** 登录接口 */
Mock.mock('/api/login', 'post', (params) => {
  const newData = JSON.parse(params.body);
  console.log(newData.account, newData.password);
  let flag = tableList.filter((item) => {
    return (
      item.account == newData.account &&
      item.password == newData.password
    );
  });
  if (!flag.length == 0) {
    return {
      status: 0,
      msg: 'success',
      token: Random.guid(),
      type: 'green'
    };
  } else {
    return {
      status: 2,
      msg: '账号密码错误',
      token: Random.guid(),
      type: 'red'
    };
  }
});
