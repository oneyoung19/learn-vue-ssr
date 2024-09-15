# Vue SSR

本项目是基于 `Vue2 + Webpack` 实现的 `Vue SSR` 样例。

[Vue2.0 SSR官方文档](https://v2.ssr.vuejs.org/)

## 1.基于 `JQuery + template` 实现 `SSR`

![](https://raw.githubusercontent.com/oneyoung19/vuepress-blog-img/Not-Count-Contribution/img/SSR-Template.png)

## 2.基于 `Vue2 + Webpack` 实现 `SSR`

![](https://raw.githubusercontent.com/oneyoung19/vuepress-blog-img/Not-Count-Contribution/img/SSR-Vue.png)

### 2-1.`Webpack` 打包

![](https://raw.githubusercontent.com/oneyoung19/vuepress-blog-img/Not-Count-Contribution/img/20240902175441.png)

## 3.基于 `Vue2 + Webpack` 实现 `SSG`


笔者调研了两类插件，可以根据 `webpack` 版本自行选择：

- `webpack@4`: [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)
- `webpack@5`: [@prerenderer/webpack-plugin](https://www.npmjs.com/package/@prerenderer/webpack-plugin)
