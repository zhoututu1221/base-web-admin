<!-- 自定义侧边栏菜单 -->
<template>
  <div class="sidebar">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-menu-item key="/" index="/" @click="goto('/')">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item
        v-for="item in noSubmenu"
        :key="item.menuRouter"
        :index="item.menuRouter"
        @click="selectMenu(item)"
      >
        <i :class="item.menuIcon"></i>
        <span slot="title">{{ item.menuName }}</span>
      </el-menu-item>
      <el-submenu
        v-for="item in hasSubmenu"
        :key="item.menuRouter"
        :index="item.menuRouter"
      >
        <template slot="title">
          <i :class="item.menuIcon"></i>
          <span slot="title">{{ item.menuName }}</span>
        </template>
        <el-menu-item
          v-for="subItem in item.subMenu"
          :key="subItem.subMenuRouter"
          :index="subItem.subMenuRouter"
          @click="selectMenu(item, subItem)"
          >{{ subItem.subMenuName }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
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
      menu: [],
      hasSubmenu: [],
      noSubmenu: [],
      defaultActive: "",
    };
  },
  // 父元素的属性
  props: [
    // 侧边栏收缩展开（true为收缩，否则为展开）
    "isCollapse",
  ],
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    //   监控菜单数据
    menu(val) {
      // 把菜单进行分类，分为有子菜单和无子菜单
      this.hasSubmenu = val.filter((item) => item.subMenu.length > 0);
      this.noSubmenu = val.filter((item) => item.subMenu.length == 0);
    },

    // 监控路由
    $route(val) {
      // console.log(val);

      // 更新store
      this.updateStore();
    },
  },
  //方法集合
  methods: {
    //   点击选中菜单项
    selectMenu(menu, subMenu) {
      // console.log(menu);

      let path = null;

      if (subMenu != undefined) {
        // console.log(subMenu);

        path = subMenu.subMenuRouter;
        this.$router.push({
          path: path,
        });

        // 如果满足以上条件，后面的代码就不会执行了
        return false;
      }

      path = menu.menuRouter;
      this.$router.push({
        path: path,
      });
    },

    // 通过路由path更新store
    updateStore() {
      let path = this.$route.path;

      // 指定菜单选中项
      this.defaultActive = path;

      // 将path转换成数组，并去除开头的空元素
      let pathArr = path.split("/").filter((item) => item != "");

      if (pathArr.length > 0) {
        // 根据path查询出菜单
        let currentMenu = this.menu.filter(
          (item) => item.menuRouter == "/" + pathArr[0]
        );

        let currentSubMenu = [];

        if (pathArr.length >= 2) {
          currentSubMenu = currentMenu[0].subMenu;
          currentSubMenu = currentSubMenu.filter(
            (item) => item.subMenuRouter == "/" + pathArr[0] + "/" + pathArr[1]
          );
        }

        currentMenu[0].currentSubMenu = currentSubMenu;

        // console.log(currentMenu);

        // 面包屑Store
        this.$store.commit("updateMenu", currentMenu);

        // 导航标签Store
        this.$store.commit("addMenu", currentMenu);

      }else{
        this.$store.commit("updateMenu", null);
      }
    },

    // 跳转
    goto(path) {
      this.$router.push({
        path: path,
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    var that = this;

    // // 访问接口示例
    // this.$http
    //   .get("/api/open/menu/listComplete")
    //   .then((res) => {
    // 
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //     that.$message.error("服务端异常");
    //   });

    //   加载本地测试数据
    this.menu = this.$testData.menu;

    // 刷新store
    this.updateStore();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
/* 解决菜单收回卡顿问题 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
}

.sidebar {
  width: 100%;
}
.el-menu {
  border: none;
}
</style>
