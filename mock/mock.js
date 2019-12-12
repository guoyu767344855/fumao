import Mock from 'mockjs'; //es6语法引入mock模块

Mock.mock('/login', { //输出数据
    'name |1-10': '@name', //随机生成姓名
    //还可以自定义其他数据
});
Mock.mock('/list', { //输出数据
    //随机取1个数
  "arr1|1":[1,2,3,4,5,6,7],
  //按序生成一个list
  "arr2|4":[{
    "name|+1":["gs","zk","lili"]
  }],
  //生成一个1-4个项的数组
  "arr3|1-4":["green"]
});