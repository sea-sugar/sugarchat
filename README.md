### sugarchat

###### 下载安装

```bash
## 克隆项目源码包
git clone 

## 安装项目依赖扩展组件
npm install

# 启动本地开发环境
npm run dev

```

#### 一、vue2 无法监测数组和对象的新增属性
对于新增加的属性，需要再手动初始化才能被 observe
	this.$set来解决吧

#### 二、vue2 导入的js工具函数，不能直接在模板中直接调用
	在methods中声明即可使用