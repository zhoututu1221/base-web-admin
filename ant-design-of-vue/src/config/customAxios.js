import axios from "axios"
import tools from "./tools"
import { message } from 'ant-design-vue'
import cookies from 'js-cookie'
import router from '../router'

const service = axios.create({
  // 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL。
  baseURL: tools.apiUrl,
  // 设置请求超时时间
  timeout: 3000
});

// 请求头配置
service.interceptors.request.use(
  (config) => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (localStorage.getItem("JWT_TOKEN") || cookies.get("JWT_TOKEN")) {
      console.log("有Token");
      if (localStorage.getItem("JWT_TOKEN")) {
        config.headers.token = localStorage.getItem("JWT_TOKEN");
      } else {
        config.headers.token = cookies.get("JWT_TOKEN");
      }
    } else {
      console.log("%c无Token","color: rgba(0,0,0,0.3);")
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应配置
service.interceptors.response.use(
  (response) => {
    //和后端token失效返回码约定403
    if (response.data.code == 403) {
      // 提示
      message.error(response.data.msg);
      //清除token
      localStorage.removeItem("JWT_TOKEN");
      cookies.remove("JWT_TOKEN");
      //跳转
      router.push({
        name: "Login",
      });
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
