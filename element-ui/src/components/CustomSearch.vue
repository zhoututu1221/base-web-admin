<!-- 自定义搜索框 -->
<template>
  <div class="search">
    <el-dropdown trigger="click" @command="selectDropItem">
      <el-input placeholder="请输入搜索内容" v-model="searchText">
        <i
          class="el-icon-search el-input__icon"
          slot="suffix"
          @click="handleSearch"
        >
        </i>
      </el-input>
      <el-dropdown-menu class="history" slot="dropdown">
        <div class="history-title">
          <label>搜索历史</label>
          <label class="history-title-button" @click="closeAllHistory"
            >清除全部</label
          >
        </div>
        <el-empty
          v-if="historyList.length == 0 || historyList.length == null"
          :image-size="80"
          description="搜索历史为空"
        ></el-empty>
        <el-dropdown-item
          class="history-item"
          v-for="(item, index) in historyList"
          :key="index"
          :command="item"
          >{{ item }}</el-dropdown-item
        >
        <div class="close">
          <i
            v-for="(item, index) in historyList"
            :key="index"
            @click="closeHistory(item)"
            class="el-icon-close close-history"
          ></i>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
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
      historyList: [],
      searchText: "",
      clientWidth: 0,
      clientHeight: 0,
      showSearchButton: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // 监控可视区域宽度
    clientWidth(val) {
      //   console.log(val);

      // 屏幕自适应操作
      if (val > 992) {
        // 电脑模式
      } else if (val > 768 && val < 992) {
        // 平板模式
      } else {
        // 手机模式
      }
    },
    clientHeight(val) {
      // console.log(val);
    },
    // 监控搜索历史的变动
    historyList(val) {
      // 最多保存六条记录
      val = val.slice(0, 6);

      let historyList = JSON.stringify(val);

      window.localStorage.setItem("SEARCH_HISTORY", historyList);
      this.$cookies.get("SEARCH_HISTORY", historyList);
    },
  },
  //方法集合
  methods: {
    // 加载历史
    loadAll() {
      let searchHistory = null;
      if (
        localStorage.getItem("SEARCH_HISTORY") ||
        this.$cookies.get("SEARCH_HISTORY")
      ) {
        localStorage.getItem("SEARCH_HISTORY")
          ? (searchHistory = JSON.parse(
              localStorage.getItem("SEARCH_HISTORY").toString()
            ))
          : "";
        this.$cookies.get("SEARCH_HISTORY")
          ? (searchHistory = JSON.parse(
              this.$cookies.get("SEARCH_HISTORY").toString()
            ))
          : "";
      }
      return searchHistory;
    },

    // 点击搜索按钮
    handleSearch() {
      if (this.searchText == "") {
        this.$message({
          message: "请先输入搜索内容",
          type: "warning",
        });
      } else {
        // 如果原来存在该搜索历史，则清除它
        this.historyList = this.historyList.filter(
          (item) => item != this.searchText
        );
        this.historyList.unshift(this.searchText);
        // 最多展示六条记录
        this.historyList = this.historyList.splice(0,6);
      }
    },

    // 下拉框选中某个选项
    selectDropItem(item) {
      this.searchText = item;
      console.log(item);
    },

    // 清除某个记录历史
    closeHistory(val) {
      this.historyList = this.historyList.filter((item) => item != val);
    },

    // 清除全部历史
    closeAllHistory() {
      this.historyList = [];
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.historyList = this.loadAll();

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
.search {
  overflow: hidden;
  width: 100%;
}
.el-dropdown {
  width: 100%;
}
.el-dropdown-menu {
  width: 300px;
}
.el-input__icon {
  font-size: 18px;
  margin-right: 5px;
  cursor: pointer;
}
.el-input__icon:hover {
  color: #409eff;
}

/* 下拉框 */
.history {
  position: relative;
  padding-bottom: 20px;
}
.history-item {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-right: 50px;
  margin: 1px 0px;
  color: rgba(0, 0, 0, 0.6);
}
.close {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 20px;
  margin-top: 40px;
}
.close-history {
  transition: 0.3s all;
  width: 20px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  font-size: 16px;
  cursor: pointer;
  margin-top: 1px;
}
.close-history:hover {
  color: #409eff;
}
.history-title {
  font-size: 12px;
  padding: 0px 15px;
  display: flex;
  margin-bottom: 15px;
}
.history-title label {
  color: rgba(0, 0, 0, 0.4);
  margin-right: auto;
}
.history-title-button {
  margin-right: 10px !important;
  color: #409eff !important;
  transition: 0.3s all;
  cursor: pointer;
}
.history-title-button:hover {
  opacity: 0.8;
}

/* 空状态 */
.el-empty {
  padding: 0;
}

/* 平板模式 */
@media (min-width: 768px) and (max-width: 992px) {
}

/* 手机模式 */
@media (max-width: 768px) {
  .el-dropdown-menu {
    width: 180px;
  }
  .history-item{
    line-height: 28px;
    font-size: 13px;
  }
  .close-history {
    height: 28px;
  }
}
</style>
