# 富途种子相关 自动化脚本

## 涵盖功能

- 自主浇水
- 互相浇水
- 签到
- 阅读新闻
- 导出种子包

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
  // list 为账号数组
  data: [
    {
      type: 'user', // 富途账号登录 (第一个账号默认为主账号)
      list: [
        {
          name: "name",
          pwd: "pwd"
        }
      ]
    },
    {
      type: 'xiaomi', // 小米登录
      list: [
        {
          name: "name",
          pwd: "pwd"
        }
      ]
    },
    {
      type: 'Q', // qq登录
      list: [
        {
          name: "name",
          pwd: "pwd"
        }
      ],
    },
    {
      type: 'fb', // facebook 登录
      list: [
        {
          name: "name",
          pwd: "pwd"
        }
      ]
    },
    {
      type: 'tw', // twitter 登录
      list: [
        {
          name: "name",
          pwd: "pwd"
        }
      ]
    },
    {
      type: 'wb', // 微博登录
      list: [
        {
          name: "name",
          pwd: "pwd"
        }
      ]
    }
  ]
};
```

### 运行

```shell
node index.js
```