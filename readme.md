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

# or

yarn
```

安装系统依赖

```shell
# centos
#依赖库
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y
#字体
yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y

#ubuntu 待补充
```

### 第三步 查看脚本功能

```shell
node index.js -h
```

会看到如下功能

```
Usage: index [options]

Options:

  -V, --version       output the version number
  -w, --water [type]  浇水+施肥功能，默认开启，0 or false 关闭 (default: true)
  -a, --all           浇水+施肥功能，是否所有账号开启登录，默认只登主账号
  -s, --sign          签到+阅读新闻功能
  -h, --help          output usage information
```

### 第四步 新建 `creds.js` 写入账号密码

格式如下
```js
module.exports = {
  // list 为账号数组
  data: [
    {
      type: 'self', // 富途账号登录 (第一个账号默认为主账号)
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