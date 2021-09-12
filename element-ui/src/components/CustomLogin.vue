<!-- 自定义登录 -->
<template>
  <div class="login">
    <div class="login-logo"></div>
    <el-tabs class="login-tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="扫码登录" name="first">
        <img class="login-qrcode" :src="QRcode" alt="二维码加载失败" />
        <el-input
          class="login-input"
          size="small"
          v-model="loginCode"
          placeholder="请输入登录码"
        >
          <el-tooltip
            slot="suffix"
            class="item"
            effect="dark"
            content="进入公众号，点一键登录获取登录码"
            placement="top-end"
          >
            <i class="el-icon-warning-outline el-input__icon"> </i>
          </el-tooltip>
        </el-input>
        <el-button
          size="small"
          class="login-button"
          type="primary"
          @click="submitLoginCode"
          >提&nbsp;交</el-button
        >
      </el-tab-pane>
      <el-tab-pane label="账号密码登录" name="second">
        <el-input
          class="login-input"
          size="small"
          v-model="username"
          prefix-icon="el-icon-user"
          placeholder="用户ID/邮箱号"
        >
        </el-input>
        <el-input
          class="login-input"
          show-password
          size="small"
          v-model="password"
          prefix-icon="el-icon-lock"
          placeholder="密码"
        >
        </el-input>
        <div class="login-input" style="display: flex;">
          <el-input
            style="flex: 1;"
            size="small"
            v-model="vcode"
            prefix-icon="el-icon-key"
            placeholder="验证码"
          >
          </el-input>
          <img class="vcode-img" :src="vcodeImg" alt="验证码加载失败" />
        </div>
        <el-button
          size="small"
          class="login-button"
          type="primary"
          @click="submitUP"
          style="margin-top: 20px;"
          >登&nbsp;录</el-button
        >
      </el-tab-pane>
    </el-tabs>
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
      activeName: "first",
      QRcode: require("../assets/QRCode.jpg"),
      vcodeImg: require("../assets/vcode.jpg"),
      loginCode: "",
      username: "",
      password: "",
      vcode: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    clientWidth(val) {
      //   console.log(val);

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
    // 标签页点击
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    // 提交登录码
    submitLoginCode() {
      console.log("登录码：" + this.loginCode);
    },

    // 提交账号密码
    submitUP() {
      console.log("账号：" + this.username);
      console.log("密码：" + this.password);
      console.log("验证码：" + this.vcode);
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../assets/background.svg");
}
.login-logo {
  width: 200px;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-top: -20px;
}

/* 标签页 */
.login-tabs {
  margin-top: 40px;
  width: 240px;
}
.el-tabs ::v-deep .el-tabs__nav {
  width: 100%;
  display: flex;
}
.el-tabs ::v-deep .el-tabs__item {
  flex: 1;
  text-align: center;
}

/* 登录二维码 */
.login-qrcode {
  width: 200px;
  height: 200px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: block;
  margin: auto auto;
  margin-top: 10px;
  margin-bottom: 20px;
}

/* 登录输入框 */
.login-input {
  width: 90%;
  display: block;
  margin: auto;
  margin-top: 10px;
}
/* 输入框小图标 */
.el-input__icon {
  font-size: 18px;
}

/* 登录按钮 */
.login-button {
  font-size: 14px;
  width: 90%;
  display: block;
  margin: auto;
  margin-top: 10px;
}

/* 验证码图片 */
.vcode-img {
  width: 100px;
  height: 32px;
  margin-left: 5px;
}

/* 平板模式 */
@media (min-width: 768px) and (max-width: 992px) {
}

/* 手机模式 */
@media (max-width: 768px) {
  .login-tabs {
    margin-top: 40px;
    width: 200px;
  }
  .login-logo {
    width: 200px;
    height: 64px;
    background-color: rgba(0, 0, 0, 0.1);
  }
  /* 登录二维码 */
  .login-qrcode {
    width: 160px;
    height: 160px;
    margin-top: 0px;
    margin-bottom: 20px;
  }
  /* 标签页 */
  .login-tabs {
    margin-top: 20px;
    width: 240px;
  }
}
</style>
