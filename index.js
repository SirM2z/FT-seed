const os = require('os')
const fs = require('fs')
const puppeteer = require('puppeteer');
const program = require('commander');
const { data } = require('./creds');
const platform = os.platform();

// #region 签到
// 登录页
const LOGIN_URL = 'https://passport.futu5.com/?target=https%3A%2F%2Fwww.futunn.com%2F';
// 签到页
const SIGN_URL = 'https://www.futunn.com/';
// 个人中心页
const PERSONAL_SELECTOR = '#accountHeader > div:nth-child(1) > div.imgBox > a';
// 签到按钮
const SIGNIN_SELECTOR = '#creditsSignBox > div.sign-content > div.sign-foot > span';
// 签过到按钮
const SIGNED_SELECTOR = '#creditsSignBox > div.sign-content > div.sign-foot > a.sign-btn';
// 今日要闻
const NEWS_SELECTOR = 'body > div.wrap > div.homeHotBox > div.cBox01 > div > div.c01 > div > ul > li:nth-child(1) > a';
// 退出页
const LOGOUT = 'https://www.futunn.com/site/logout';
// #endregion

// #region login
// 需登录的种子页
const SEED_LOGIN_URL = 'https://passport.futu5.com/?target=https%3A%2F%2Fseed.futunn.com%2F';
// 种子页
const SEED_URL = 'https://seed.futunn.com/';
// 用户名
const USERNAME_SELECTOR = '#loginFormWrapper > form > ul > li.ui-input-wrapper.ui-content-email > input';
// 密码
const PASSWORD_SELECTOR = '#loginFormWrapper > form > ul > li:nth-child(3) > input';
// 登录
const BUTTON_SELECTOR = '#loginFormWrapper > form > input.ui-submit.ui-form-submit';
// #endregion

// #region xiaomi
// 小米登录
const XIAOMI_SELECTOR = 'body > div > div.m-form-wrapper.j-content-wrapper > div.u-oauth-login.j-oauth-login > div.open001 > div > a.xiaomi.iconfont';
// 小米用户名
const XIAOMI_USERNAME_SELECTOR = '#username';
// 小米密码
const XIAOMI_PASSWORD_SELECTOR = '#pwd';
// 小米登录
const XIAOMI_BUTTON_SELECTOR = '#login-button';
// #endregion

// #region Q
// qq登录
const Q_SELECTOR = 'body > div > div.m-form-wrapper.j-content-wrapper > div.u-oauth-login.j-oauth-login > div.open001 > div > a.qq.iconfont';
// qqiframe
const Q_FRAME_SELECTOR = '#ptlogin_iframe';
// qq账号密码登录
const Q_USERNAME_BTN_SELECTOR = '#switcher_plogin';
// qq用户名
const Q_USERNAME_SELECTOR = '#u';
// qq密码
const Q_PASSWORD_SELECTOR = '#p';
// qq登录
const Q_BUTTON_SELECTOR = '#login_button';
// #endregion

// #region fb
// fb登录
const FB_SELECTOR = 'body > div > div.m-form-wrapper.j-content-wrapper > div.u-oauth-login.j-oauth-login > div.open001 > div > a.fb.iconfont';
// fb用户名
const FB_USERNAME_SELECTOR = '#email';
// fb密码
const FB_PASSWORD_SELECTOR = '#pass';
// fb登录
const FB_BUTTON_SELECTOR = '#loginbutton';
// #endregion

// #region twittwe
// tw登录
const TW_SELECTOR = 'body > div > div.m-form-wrapper.j-content-wrapper > div.u-oauth-login.j-oauth-login > div.open001 > div > a.tw.iconfont';
// tw用户名
const TW_USERNAME_SELECTOR = '#username_or_email';
// tw密码
const TW_PASSWORD_SELECTOR = '#password';
// tw登录
const TW_BUTTON_SELECTOR = '#allow';
// #endregion

// #region weibo
// wb登录
const WB_SELECTOR = 'body > div > div.m-form-wrapper.j-content-wrapper > div.u-oauth-login.j-oauth-login > div.open001 > div > a.sina.mr0.iconfont';
// wb用户名
const WB_USERNAME_SELECTOR = '#userId';
// wb密码
const WB_PASSWORD_SELECTOR = '#passwd';
// wb登录
const WB_BUTTON_SELECTOR = '#outer > div > div.WB_panel.oauth_main > form > div > div.oauth_login_box01.clearfix > div > p > a.WB_btn_login.formbtn_01';
// #endregion

// #region main
// 底部 footer
const FOOTER_SELECTOR = 'body > div.seedWrap01 > div > div.commsendFootBtnBar';
// 收种子
const GET_SELECTOR = '#useCanvas';
// 使用种子
const USE_SELECTOR = 'body > div.floatBox01.seedDetailBox > div > div.btnBar01.ng-scope > a:nth-child(2)';
// 关闭种子使用 弹出框
const CLOSE_SELECTOR = 'body > div:nth-child(13) > div > div.btnBar01 > a';
// 给自己浇水
const SELF_SELECTOR = '#waterCanvas';
// 活动
const HUDONG_SELECTOR = 'body > div.seedWrap01 > div > div.commsendFootBtnBar > ul > li:nth-child(3) > a';
// 可施肥
const CANSHIFEI_SELECTOR = 'body > div.seedWrap01 > div > div.friends > div.friend-list-container > div.friend-filter > div > span';
// 可施肥 为空
const EMPTY_SELECTOR = 'body > div.seedWrap01 > div > div.friends > div.friend-list-container > div.friend-empty';
// 第一个好友
const FIRSTFRIENDS_SELECTOR = 'body > div.seedWrap01 > div > div.friends > div.friend-list-container > ol > li:nth-child(1) > a';
// 浇水
const JIAOSHUI_SELECTOR = 'body > div.fertMainArea > div:nth-child(4) > div > i';
const TEST = 'body > div.fertMainArea > div:nth-child(4)';
// 回农场
const BACKFAMER_SELECTOR = 'body > a.back-home';
// #endregion

// #region 批量关注相关
// 最近的按钮
const RECENT_SELECTOR = 'body > div.seedWrap01 > div > div.friends > div.friends-tab > a:nth-child(2)';
// 第一个已关注按钮
const FOLLOWED_SELECTOR = 'body > div.seedWrap01 > div > div.friends > div.friends-timeline-container > ul > li:nth-child(1) > div.follow.followed';
// 第一个未关注按钮
const FOLLOW_SELECTOR = 'body > div.seedWrap01 > div > div.friends > div.friends-timeline-container > ul > li:nth-child(1) > div.follow';
// #endregion

// #region 种子包相关
const SEED_PACKAGE_CONTENT = `
时间： date
分享包路径： package_src
`
// #endregion

const getHtml = async (page, selector) => {
  const bodyHandle = await page.$(selector);
  if (bodyHandle) {
    const html = await page.evaluate(body => body.innerHTML, bodyHandle);
    // console.log(html);
    await bodyHandle.dispose();
    return html;
  } else {
    return '';
  }
};

// 延迟
const delay = (t) => {
  return new Promise((resolve) => {
    setTimeout(resolve, t)
  })
};

// 登录功能
const login = async (page, type, userindex, user) => {
  console.log(`------开始登录当前角色-${type}-${userindex}-----`);
  if (type === 'self') {
    await page.evaluate((username, password, button, name, pwd) => {
      document.querySelector(username).value = name;
      document.querySelector(password).value = pwd;
      document.querySelector(button).click();
    }, USERNAME_SELECTOR, PASSWORD_SELECTOR, BUTTON_SELECTOR, user.name, user.pwd);
    await page.waitForNavigation();
  } else if (type === 'xiaomi') {
    await page.click(XIAOMI_SELECTOR);
    await page.waitForSelector(XIAOMI_USERNAME_SELECTOR, {visible: true});
    await page.evaluate((username, password, button, name, pwd) => {
      document.querySelector(username).value = name;
      document.querySelector(password).value = pwd;
      document.querySelector(button).click();
    }, XIAOMI_USERNAME_SELECTOR, XIAOMI_PASSWORD_SELECTOR, XIAOMI_BUTTON_SELECTOR, user.name, user.pwd);
    await page.waitForNavigation();
  } else if (type === 'Q') {
    await page.click(Q_SELECTOR);
    await page.waitForSelector(Q_FRAME_SELECTOR, {visible: true});
    const loginFrame = page.mainFrame().childFrames()[0];
    await loginFrame.waitForSelector(Q_USERNAME_BTN_SELECTOR, {visible: true});
    await loginFrame.click(Q_USERNAME_BTN_SELECTOR);
    if (userindex !== 0) {
      await loginFrame.evaluate((username) => {
        document.querySelector(username).value = '';
      }, Q_USERNAME_SELECTOR);
    }
    await loginFrame.type(Q_USERNAME_SELECTOR, user.name);
    await loginFrame.type(Q_PASSWORD_SELECTOR, user.pwd);
    await loginFrame.click(Q_BUTTON_SELECTOR);
    await page.waitForNavigation();
  } else if (type === 'fb') {
    await page.click(FB_SELECTOR);
    await page.waitForSelector(FB_USERNAME_SELECTOR, {visible: true});
    await page.evaluate((username, password, button, name, pwd) => {
      document.querySelector(username).value = name;
      document.querySelector(password).value = pwd;
      document.querySelector(button).click();
    }, FB_USERNAME_SELECTOR, FB_PASSWORD_SELECTOR, FB_BUTTON_SELECTOR, user.name, user.pwd);
    await page.waitForNavigation();
  } else if (type === 'tw') {
    await page.click(TW_SELECTOR);
    await page.waitForSelector(TW_USERNAME_SELECTOR, {visible: true});
    await page.evaluate((username, password, button, name, pwd) => {
      document.querySelector(username).value = name;
      document.querySelector(password).value = pwd;
      document.querySelector(button).click();
    }, TW_USERNAME_SELECTOR, TW_PASSWORD_SELECTOR, TW_BUTTON_SELECTOR, user.name, user.pwd);
    await page.waitForNavigation();
    await delay(3000);
  } else if (type === 'wb') {
    await page.click(WB_SELECTOR);
    await page.waitForSelector(WB_USERNAME_SELECTOR, {visible: true});
    await page.type(WB_USERNAME_SELECTOR, user.name);
    await page.type(WB_PASSWORD_SELECTOR, user.pwd);
    await page.click(WB_BUTTON_SELECTOR);
    await page.waitForNavigation();
  }
  console.log(`------结束登录当前角色-${type}-${userindex}-----`);
};

// 签到功能
const sign = async (browser, page) => {
  await page.goto(SIGN_URL, {waitUntil: 'load'});
  console.log(`------开始签到------`);
  let judgeIsSign = await Promise.race([
    page.waitForSelector(SIGNIN_SELECTOR, {visible: true}).then(_ => 1),
    page.waitForSelector(SIGNED_SELECTOR, {visible: true}).then(_ => 2)
  ]);
  if (judgeIsSign === 1) {
    console.log(`      成功签到`);
    await page.click(SIGNIN_SELECTOR);
  } else {
    console.log(`     今天已签到`);
  }
  const newPagePromise = new Promise(resolve => browser.once('targetcreated', target => resolve(target.page())));
  console.log(`    阅读新闻成功`);
  await page.click(NEWS_SELECTOR);
  const newPage = await newPagePromise;
  await delay(2000);
  await newPage.close();
  console.log(`------签到结束------`);
};

// 批量关注功能
const floow = async (page) => {
  let index = 0
  await page.waitForSelector(FOOTER_SELECTOR, {visible: true})
  await page.click(HUDONG_SELECTOR);
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url() === 'https://seed.futunn.com/main/follow') {
      console.log(' ');
      console.log('-------------------------');
      console.log('request 请求拦截');
      console.log({'url': interceptedRequest.url()});
      console.log({'postData': interceptedRequest.postData()});
      console.log(`正在重定向关注 ${niuniu[index]}`);
      interceptedRequest.continue({
        postData: `follow_id=${niuniu[index]}&action=0`,
      });
      index++;
      console.log('-------------------------');
      console.log(' ');
    } else {
      interceptedRequest.continue();
    }
  });
  await page.waitForSelector(RECENT_SELECTOR, {visible: true});
  await page.click(RECENT_SELECTOR);
  for(let i = 0; i < niuniu.length; i++) {
    let judgeIsFirstFloow = await Promise.race([
      page.waitForSelector(FOLLOWED_SELECTOR, {visible: true}).then(_ => 1),
      page.waitForSelector(FOLLOW_SELECTOR, {visible: true}).then(_ => 2)
    ]);
    if (judgeIsFirstFloow === 1) {
      await page.waitForSelector(FOLLOWED_SELECTOR, {visible: true});
      await page.click(FOLLOWED_SELECTOR);
    } else {
      await page.waitForSelector(FOLLOW_SELECTOR, {visible: true});
      await page.click(FOLLOW_SELECTOR);
    }
    await delay(2000);
  }
};

// 浇水功能
const water = async (page, type, userindex, nums) => {
  // 浇水人数
  let water_nums = 0;
  await page.waitForSelector(FOOTER_SELECTOR, {visible: true})
  console.log(`------浇水开始！-${type}-${userindex}-----`);
  const judgeIsGet = await Promise.race([
    page.waitForSelector(GET_SELECTOR, {visible: true}).then(_ => 1),
    page.waitForSelector(SELF_SELECTOR, {visible: true}).then(_ => 2)
  ]);
  if (judgeIsGet === 1) {
    console.log(`使用种子`);
    await page.click(GET_SELECTOR);
    await page.waitForSelector(USE_SELECTOR, {visible: true});
    await page.click(USE_SELECTOR);
    await page.waitForSelector(CLOSE_SELECTOR, {visible: true});
    await page.click(CLOSE_SELECTOR);
  }
  console.log(`开始自我浇水`);
  await page.click(SELF_SELECTOR);
  console.log(`点击互动页`);
  await page.click(HUDONG_SELECTOR);
  if (nums === 0) {
    console.log(`点击可浇水按钮`);
    await page.waitForSelector(CANSHIFEI_SELECTOR, {visible: true});
    await page.click(CANSHIFEI_SELECTOR);
  }
  for (let i = 0; ; i++) {
    console.log(`------判断是否有人待浇水------`);
    let judgeIsEnd = 1;
    let friendlistTimeout = 3000;
    if (platform === 'linux') {
      friendlistTimeout = 10000;
      await delay(1000);
    }
    try {
      await page.waitForSelector(FIRSTFRIENDS_SELECTOR, {visible: true, timeout: friendlistTimeout});
    } catch (error) {
      judgeIsEnd = 2;
    }
    if (judgeIsEnd === 2) {
      console.log(`------浇水结束！-${type}-${userindex}-----`);
      return;
    }
    console.log(`         第${++water_nums}人---浇水`);
    await page.click(FIRSTFRIENDS_SELECTOR);
    console.log('          来到浇水页');
    await page.waitForSelector(TEST, {visible: true});
    await page.click(TEST);
    console.log(`         第${water_nums}人---浇完`);
    await page.waitForSelector(BACKFAMER_SELECTOR, {visible: true});
    await page.click(BACKFAMER_SELECTOR);
  }
}

// 写入种子包
const wt = (content) => {
  return new Promise((resolve, reject) => {
    fs.open('seedpackage.txt', 'a', (e, fd) => {
      if (e) {reject(); throw e;}
      fs.appendFile(fd, content, 'utf8', (e) => {
        if (e) {reject(); throw e;}
        fs.closeSync(fd)
        resolve()
      })
    })
  }).catch(err => {console.log(err);});
};

const main = async (browser, page, type, userindex, user, nums) => {
  let main_finished = false; // 应用是否执行完毕
  let requestfinished_event = false; // 响应事件触发完毕
  // 监听页面 请求完成事件
  page.on('requestfinished', async interceptedRequest => {
    if (interceptedRequest.url().includes('https://seed.futunn.com/main/culture-room')) {
      let response = interceptedRequest.response();
      let bodydata = await response.json();
      let id = bodydata.data.seed.seed_id;
      let key = bodydata.data.seed_package.key;
      let url = `https://seed.futunn.com/package?key=${key}`;
      let content = SEED_PACKAGE_CONTENT.replace('date', new Date().toLocaleString()).replace('package_src', url);
      if (key) {
        await wt(content);
      }
      requestfinished_event = true;
      if (main_finished) {
        await page.goto(LOGOUT);
        return;
      }
    }
  });
  await page.goto(SEED_LOGIN_URL, {waitUntil: 'load'});
  await page.setDefaultNavigationTimeout(60 * 1000);
  // 登录
  await login(page, type, userindex, user);
  // 是否签到
  if (program.sign === true) {
    await sign(browser, page);
    await page.goto(SEED_URL, {waitUntil: 'load'});
  }
  // 是否开启浇水功能
  if (program.water === true) {
    await water(page, type, userindex, nums);
  } else {
    await page.goto(LOGOUT);
    return;
  }
  main_finished = true;
  if (requestfinished_event) {
    await page.goto(LOGOUT);
    return;
  }
}

(async () => {
  program
    .version('0.0.2')
    .option('-w, --water [type]', '浇水+施肥功能，默认开启，0 or false 关闭', true)
    .option('-a, --all', '浇水+施肥功能，是否所有账号开启登录，默认只登主账号')
    .option('-s, --sign', '签到+阅读新闻功能')
    .option('-o, --open', '显示无头浏览器')
    .parse(process.argv);
  
  // 启动
  const width = 1200;
  const height = 950;
  let args = [];
  args.push(`--window-size=${width},${height}`);
  if (platform === 'linux') {
    args.push(`--no-sandbox`);
  }
  let browser = ''
  // 是否开启浇水功能
  if (program.open === true) {
    // 显示无头浏览器
    browser = await puppeteer.launch({headless: false, slowMo: 200, args});
  } else {
    browser = await puppeteer.launch({slowMo: 200});
  }
  
  // 控制是否点击 可施肥 按钮
  let nums = 0;
  // 控制执行逻辑
  if (program.all) {
    // 副号 走一波
    for (let i = 0, ilen = data.length; i < ilen; i++) {
      for (let j = 0, jlen = data[i].list.length; j < jlen; j++) {
        if (data[i].type === 'self' && j === 0) continue;
        const page = await browser.newPage();
        // 去除 页面内部自定义宽高 导致 滚动条出现
        await page._client.send('Emulation.clearDeviceMetricsOverride');
        const pages = await browser.pages();
        for (let x = 0; x < pages.length - 1; x++) {
          await pages[x].close();
        }
        try {
          console.log(' ');
          await main(browser, page, data[i].type, j, data[i].list[j], nums);
          nums++;
        } catch (error) {
          // console.log(error);
          console.log(`${data[i].type}--${j}--出错`);
        }
      }
    }
  } else {
    const pages = await browser.pages();
    const page = pages[0];
    // 去除 页面内部自定义宽高 导致 滚动条出现
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    try {
      // 主号 走一波
      await main(browser, page, 'self', 0, data[0].list[0], nums);
    } catch (error) {
      console.log(`主号--出错`);
    }
  }
  await browser.close();
})();
