<!-- 侧边菜单 -->
<template>
  <div class="slider-menu" style="width: 100%;">
    <a-menu
      :selectedKeys="selectedKeys"
      :open-keys.sync="openKeys"
      mode="inline"
      :inline-collapsed="menuCollapsed"
      @click="handleClick"
    >
      <a-menu-item
        v-for="(item, index) in noTags"
        :key="item.menuId.toString()"
      >
        <a-icon :type="item.menuIcon" />
        <span>{{ item.menuName }}</span>
      </a-menu-item>
      <a-sub-menu
        v-for="(item, index) in hasTags"
        :key="item.menuId.toString()"
      >
        <span slot="title">
          <a-icon :type="item.menuIcon" /><span>{{ item.menuName }}</span>
        </span>
        <a-menu-item
          v-for="(subItem, subIndex) in item.tags"
          :key="item.menuId.toString() + '-' + subItem.tagsId.toString()"
        >
          {{ subItem.tagsName }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
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
      openKeys: [],
      menu: [],
      hasTags: [],
      noTags: [],
      selectedKeys: [],
      menuCollapsed: null,
    };
  },
  // 父元素的属性
  props: [
    // 侧边栏收缩展开（true为收缩，否则为展开）
    "collapsed",
  ],
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // 监控收缩展开
    collapsed(val) {
      // 解决收缩还展示子菜单问题
      this.openKeys = null;

      let path = this.$route.path;
      if(path == "/" || path == "/list"){
        this.sliderControl();
      }
    },

    // 监听地址栏变化
    $route(val) {
      let path = val.path;

      // 侧边栏控制
      if(path == "/" || path == "/list"){
        this.sliderControl();
      }else{
        this.selectedKeys = [];
      }

      // 面包屑导航控制
      this.refreshBreadcrumb();

      // 添加导航标签
      if(val.path == "/list"){
        this.addMenu();
      }

    },
  },
  //方法集合
  methods: {
    // 点击侧边栏菜单事件
    handleClick(e) {
      var open = "";
      var select = "";

      if (e.keyPath[1] != undefined) open = e.keyPath[1].toString();
      if (e.keyPath[0] != undefined) select = e.keyPath[0].toString();

      this.openKeys = [open];
      this.selectedKeys = [select];

      // 点击后跳转
      this.$router.push({
        path: "/list",
        query: { open: open, select: select },
      });

    },
    
    // 添加导航标签
    addMenu() {
      var menuId = null;
      var tagsId = null;
      if (this.$route.query.select != undefined && this.$route.query.select != "") {
        if (this.$route.query.select.toString().split("-")[0] != undefined)
          menuId = this.$route.query.select.toString().split("-")[0];
        if (this.$route.query.select.toString().split("-")[1] != undefined)
          tagsId = this.$route.query.select.toString().split("-")[1];
      }

      var menuTemp = this.menu;
      var currentMenu = null;

      if (menuId == null) {
        currentMenu = null;
      } else {
        currentMenu = menuTemp.filter((item) => item.menuId == menuId)[0];
        var tags = currentMenu.tags;
        var currentTags = tags.filter((item) => item.tagsId == tagsId);
        currentMenu.nowTags = currentTags;
      }
      if(currentMenu != null){
        this.$store.commit("addMenu", currentMenu);
      }
    },

    // 侧边栏菜单相关操作
    sliderControl() {
      // 获取状态栏的参数
      var query = this.$route.query;
      var open = query.open;
      var select = query.select;

      // 侧边栏菜单展开收起操作
      if (this.collapsed) {
        // 侧边栏收缩
        this.menuCollapsed = false;
        // 解决收缩还展示子菜单问题
        if (select != undefined) {
          this.selectedKeys = [select];
        }else{
          this.selectedKeys = [];
        }
      } else {
        // 侧边栏展开
        this.menuCollapsed = true;
        // 根据url参数设置菜单打开项和选中项
        if (open != undefined && select != undefined) {
          this.openKeys = [open];
          this.selectedKeys = [select];
        }else{
          this.selectedKeys = [];
        }
      }
    },

    // 根据URL参数刷新面包屑
    refreshBreadcrumb() {
      var menuId = null;
      var tagsId = null;
      if (
        this.$route.query.select != undefined &&
        this.$route.query.select != ""
      ) {
        if (this.$route.query.select.toString().split("-")[0] != undefined)
          menuId = this.$route.query.select.toString().split("-")[0];
        if (this.$route.query.select.toString().split("-")[1] != undefined)
          tagsId = this.$route.query.select.toString().split("-")[1];
      }

      var menuTemp = this.menu;
      var currentMenu = null;

      if (menuId == null) {
        // 如果状态栏中没有相关参数就不展示面包屑
        currentMenu = { nowTags: [] };
      } else {
        currentMenu = menuTemp.filter((item) => item.menuId == menuId)[0];
        var tags = currentMenu.tags;
        var currentTags = tags.filter((item) => item.tagsId == tagsId);
        currentMenu.nowTags = currentTags;
      }
      this.setCurrentMenu(currentMenu);
    },

    //结合vuex实施更新面包屑导航
    setCurrentMenu(item) {
      this.$store.commit("changeBreadcrumb", item);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    var that = this;
    // 通过接口获取菜单信息
    // this.$http
    //   .get("/api/open/menu/listComplete")
    //   .then((res) => {
    //     var data = res.data.data;
    //     that.menu = data;
    //     // 数据过滤，将有子菜单的和没有子菜单的分开
    //     that.hasTags = data.filter((item) => item.tags.length != 0);
    //     that.noTags = data.filter((item) => item.tags.length == 0);
    //     // console.log(that.hasTags);
    //     // console.log(that.noTags);
    //     // 根据URL刷新面包屑
    //     this.refreshBreadcrumb();
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //     that.$message.error("服务端异常");
    //   });

    // 本地模式获取数据 
    that.menu = that.$testData.menu;
    that.hasTags = that.menu.filter((item) => item.tags.length != 0);
    that.noTags = that.menu.filter((item) => item.tags.length == 0);
    // 根据URL刷新面包屑
    this.refreshBreadcrumb();
    // 根据URL添加导航标签
    if(this.$route.path == "/list"){
      this.addMenu();
    }

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var that = this;
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
.slider-menu{
  height: auto;
}

.ant-menu{
  /* 去除菜单栏边框线 */
  border-right-width: 0px !important;
}

.menu {
  height: 100%;
}

.anticon {
  font-size: 16px;
}

/* 滚动条美化 */
::-webkit-scrollbar-track {
  background: white;
  border-radius: 0;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 5px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  transition: color 0.2s ease;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

@media (min-width: 768px) and (max-width: 992px) {
}
</style>
