<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 解决搜索框清除单个记录文字与按钮重叠问题 */
.ant-select-dropdown-menu-item{
  display: flex !important;
}
.ant-select-dropdown-menu-item font{
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 滚动条美化 */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  /* background: white; */
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
</style>
