# 富途种子相关 自动化脚本

## 涵盖功能

- 自主浇水
- 互相浇水
- 签到
- 发布牛牛圈

## 使用方法

### 第一步 下载项目

```shell
git clone https://github.com/SirM2z/FT-seed.git
```

### 第二步 安装依赖

```shell
npm i
```

or

```shell
yarn
```

### 第三步 查看脚本功能

```shell
node index.js -h
```

会看到如下功能

![功能介绍](https://raw.githubusercontent.com/SirM2z/assets/master/image/seedhelp.png)

### 第四步 新建 `creds.js` 写入账号密码

格式如下
```js
module.exports = {
  // 富途账号登录
  user: {
    name: '',
    pwd: '',
  },
  // 下方为第三方登录账号 若不填写 则不能使用 -a 功能
  // 小米登录
  xiaomi: {
    name: '',
    pwd: '',
  },
  // qq登录
  Q: {
    Q1: {
      name: '',
      pwd: '',
    },
    Q2: {
      name: '',
      pwd: '.',
    },
    Q3: {
      name: '',
      pwd: '',
    },
    Q4: {
      name: '',
      pwd: '',
    },
    Q5: {
      name: '',
      pwd: '',
    }
    // TODO: 待优化
    // 少于 5 个的话 去除 index.js 中 主函数里的调用即可
    // 再添加的话 代码内需要增加 相应的调用
  },
  // facebook 登录
  fb: {
    name: '',
    pwd: '',
  },
  // twitter 登录
  tw: {
    name: '',
    pwd: '',
  },
  // 微博登录
  wb: {
    name: '',
    pwd: '',
  }
};
```

### 运行

```shell
node index.js
```