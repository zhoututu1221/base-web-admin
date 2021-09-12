// 左侧菜单数据
const menu = [

  {
    menuId: 1,
    menuName: "视频管理",
    menuIcon: "el-icon-video-camera",
    menuRouter: "/video",
    subMenu: [
      {
        subMenuId: 1,
        subMenuName: "最新视频",
        subMenuIcon: "el-icon-magic-stick",
        subMenuRouter: "/video/new",
      },
      {
        subMenuId: 2,
        subMenuName: "热门视频",
        subMenuIcon: "el-icon-thumb",
        subMenuRouter: "/video/hot",
      },
      {
        subMenuId: 3,
        subMenuName: "相关度最高",
        subMenuIcon: "el-icon-connection",
        subMenuRouter: "/video/conn",
      },
    ]
  },
  {
    menuId: 2,
    menuName: "账户管理",
    menuIcon: "el-icon-user",
    menuRouter: "/user",
    subMenu: [
      {
        subMenuId: 1,
        subMenuName: "账户查找",
        subMenuIcon: "el-icon-user",
        subMenuRouter: "/user/search",
      },
      {
        subMenuId: 2,
        subMenuName: "账户分配",
        subMenuIcon: "el-icon-edit",
        subMenuRouter: "/user/setting",
      },
    ]
  },
  {
    menuId: 3,
    menuName: "实时监控",
    menuIcon: "el-icon-view",
    menuRouter: "/look",
    subMenu: []
  },
  {
    menuId: 4,
    menuName: "消息通知",
    menuIcon: "el-icon-bell",
    menuRouter: "/notice",
    subMenu: []
  },
  {
    menuId: 5,
    menuName: "文件管理",
    menuIcon: "el-icon-folder-opened",
    menuRouter: "/file",
    subMenu: []
  },

];

export default {
    menu,
};
