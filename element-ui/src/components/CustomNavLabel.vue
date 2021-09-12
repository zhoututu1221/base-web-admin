<!-- 自定义导航标签 -->
<template>
  <div class="nav">
    <el-tabs
      v-model="currentTab"
      type="card"
      @tab-remove="removeTab"
      @tab-click="clickTab"
    >
      <el-tab-pane name="/" label="首页">
        <!-- {{ item.content }} -->
      </el-tab-pane>
      <el-tab-pane
        v-for="(item, index) in menuList"
        :key="
          JSON.parse(item)[0].currentSubMenu.length != 0
            ? JSON.parse(item)[0].currentSubMenu[0].subMenuRouter
            : JSON.parse(item)[0].menuRouter
        "
        :name="
          JSON.parse(item)[0].currentSubMenu.length != 0
            ? JSON.parse(item)[0].currentSubMenu[0].subMenuRouter
            : JSON.parse(item)[0].menuRouter
        "
        :label="
          JSON.parse(item)[0].currentSubMenu.length != 0
            ? JSON.parse(item)[0].currentSubMenu[0].subMenuName
            : JSON.parse(item)[0].menuName
        "
        closable
      >
        <!-- {{ item.content }} -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapState } from "vuex";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      currentTab: null,
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState({
      menuList: (state) => state.navLabel.menuList,
      currentMenu: (state) => state.navLabel.currentMenu,
    }),
  },
  //监控data中的数据变化
  watch: {
    // 监控导航标签列表
    menuList(val) {
      // console.log(val);
    },
    // 监控当前选中的导航标签
    currentMenu(val) {
      // console.log(val);
      this.currentTab =
        val[0].currentSubMenu.length != 0
          ? val[0].currentSubMenu[0].subMenuRouter
          : val[0].menuRouter;
    },
    // 监控路由
    $route(val) {
      let path = val.path;

      // 当访问主页时，刷新导航标签选中项为"/"
      if (path == "/") {
        this.currentTab = "/";
      }
    },
  },
  //方法集合
  methods: {
    // 移除标签
    removeTab(targetName) {
      let path = targetName;

      // 将path转换成数组，并去除开头的空元素
      let pathArr = path.split("/").filter((item) => item != "");

      if (pathArr.length > 0) {
        let index = null;
        // 获取要删除的导航的位置
        if (pathArr.length == 1) {
          index = this.menuList.findIndex(
            (item) => JSON.parse(item)[0].menuRouter == "/" + pathArr[0]
          );
        } else {
          let i = 0;
          for (i; i < this.menuList.length; i++) {
            let menu = JSON.parse(this.menuList[i])[0];
            if (menu.currentSubMenu.length != 0) {
              if (
                menu.currentSubMenu[0].subMenuRouter ==
                "/" + pathArr[0] + "/" + pathArr[1]
              ) {
                break;
              }
            }
          }
          index = i;
        }

        // 移除Store中menuList中的某个元素
        index != null ? this.$store.commit("removeMenu", index) : "";

        // 删除该导航标签后跳转页面
        let gotoPath = "/";
        let menulength = this.menuList.length;
        if (menulength > 0) {
          let menu = JSON.parse(this.menuList[menulength - 1])[0];
          if (menu.currentSubMenu.length > 0) {
            gotoPath = menu.currentSubMenu[0].subMenuRouter;
          } else {
            gotoPath = menu.menuRouter;
          }
        }

        this.$router.push({
          path: gotoPath,
        });
      }
    },

    // 点击导航标签
    clickTab(val) {
      this.$router.push({
        path: val.name,
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 初次进入页面-》刷新选中导航标签
    let val = this.currentMenu;
    if (val != null) {
      this.currentTab =
        val[0].currentSubMenu.length != 0
          ? val[0].currentSubMenu[0].subMenuRouter
          : val[0].menuRouter;
    } else {
      this.currentTab = "/";
    }
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
.nav {
  background-color: rgba(255, 255, 255, 0.7);
  width: 100%;
}
</style>
