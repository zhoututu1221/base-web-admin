<!-- 自定义登录 -->
<template>
  <div class="login">
    <div class="login-logo"></div>
    <a-tabs class="login-board-tabs" default-active-key="1" tabPosition="top">
      <a-tab-pane key="1" tab="扫码登录" tabPosition>
        <img class="login-qrcode" :src="QRcode" alt="二维码加载失败" />
        <a-input
          class="login-input"
          ref="userNameInput"
          v-model="loginCode"
          placeholder="请输入登录码"
        >
          <!-- <a-icon slot="prefix" type="unlock" /> -->
          <a-tooltip slot="suffix" title="进入公众号，点一键登录获取登录码">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-button class="login-button" type="primary" @click="submitLoginCode"
          >提交</a-button
        >
      </a-tab-pane>
      <a-tab-pane key="2" tab="账号密码登录" tabPosition>
        <a-input
          class="login-input"
          v-model="username"
          style="margin-top: 10px;"
          placeholder="用户ID/邮箱号"
          allow-clear
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
        <a-input-password
          class="login-input"
          v-model="password"
          style="margin-top: 10px;"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" />
        </a-input-password>
        <div
          class="login-input"
          style="margin-top: 10px;display: flex;align-items: center;"
        >
          <a-input v-model="vcode" placeholder="验证码" allow-clear>
            <a-icon slot="prefix" type="safety-certificate" />
          </a-input>
          <img class="vcode-img" :src="vcodeImg" alt="验证码加载失败" />
        </div>
        <a-button
          style="margin-top: 20px;"
          class="login-button"
          type="primary"
          @click="submitUP"
          >登录</a-button
        >
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      clientWidth: 0,
      clientHeight: 0,
      QRcode: require("../assets/QRCode.jpg"),
      loginCode: "",
      username: "",
      password: "",
      vcode: "",
      vcodeImg: require("../assets/vcode.jpg"),
    };
  },
  // 父元素的属性
  props: [],
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    clientWidth(val) {
      // console.log(val);

      // 屏幕自适应显示隐藏菜单
      if (val > 992) {
        // console.log(val);
      } else if (val > 768 && val < 992) {
        // console.log(val);
      } else {
        // console.log(val);
      }
    },
    clientHeight(val) {
      // console.log(val);
    },
  },
  //方法集合
  methods: {
    // 使用登录码登录
    submitLoginCode() {
      console.log("登录码：" + this.loginCode);
    },

    // 使用账号密码登录
    submitUP() {
      console.log(
        "账号：" +
          this.username +
          "/密码：" +
          this.password +
          "/验证码：" +
          this.vcode
      );
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var that = this;

    that.clientWidth = document.documentElement.clientWidth;
    that.clientHeight = document.documentElement.clientHeight;

    // 实时获取屏幕宽高
    window.addEventListener("resize", () => {
      that.clientWidth = document.documentElement.clientWidth;
      that.clientHeight = document.documentElement.clientHeight;
    });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.login {
  width: 100%;
}

.login-logo {
  width: 200px;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.1);
}
.login-board-tabs {
  width: 235px;
  margin-top: 20px;
}

/* 登录二维码 */
.login-qrcode {
  width: 200px;
  height: 200px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: block;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
/* 登录输入框 */
.login-input {
  width: 86%;
  display: block;
  margin: auto;
  margin-top: 20px;
}
/* 登录按钮 */
.login-button {
  width: 86%;
  display: block;
  margin: auto;
  margin-top: 10px;
}
/* 验证码图片 */
.vcode-img {
  width: 120px;
  height: 32px;
  margin-left: 5px;
}

/* 平板模式 */
@media (min-width: 768px) and (max-width: 992px) {
}

/* 手机模式 */
@media (max-width: 768px) {
  .login-qrcode {
    width: 180px;
    height: 180px;
  }
  .login-board {
    justify-content: start;
  }
  .login-logo {
    margin-top: 20px;
  }
}
</style>
