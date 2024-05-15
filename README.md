### sugarchat
一个基于vue2、express、mysql的在线聊天网站。

[后台地址](https://github.com/sea-sugar/seachat.git)
###### 下载安装

```bash
## 克隆项目源码包
git clone https://github.com/sea-sugar/sugarchat.git

## 安装项目依赖扩展组件
npm install

# 启动本地开发环境
npm run dev

# 打包部署
npm run build:prod
docker build -t sugarchat .
docker run -d -it --name sugarchat -p 8080:80 sugarchat

```
#### 项目展示
![image](https://github.com/sea-sugar/sugarchat/blob/main/public/1.png)

#### 一、vue2 无法监测数组和对象的新增属性
对于新增加的属性，需要再手动初始化才能被 observe
	this.$set来解决吧

#### 二、vue2 导入的js工具函数，不能直接在模板中直接调用
	在methods中声明即可使用