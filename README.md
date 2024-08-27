# 目录说明
- coco-cli: 脚手架功能; 生成.coco文件夹
- coco-mvc: 框架运行时
- coco-reconciler: 和react-reconciler保持同步
- coco-web: 和react-dom中的client保持同步
- demo: mvp项目
- shared: 和react-shared保持同步

# todo
[] 单元测试
[] 让demo项目接近真实使用库的样子
[] shared中部分函数移走
[] 组合注解
[] 添加router
[] ts支持
[] reconciler包依赖了mvc包，其实reconciler包的单测是不好做的，能不能剥离掉？
[] jsx中使用组件可能会有问题？如果不手动import的话
[] aop

# qa
q:如何实现开发和打包
a:选用webpack打包，因为没有通常web app项目中入口文件，或者配置文件，也不需要引入组件，
coco-mvc负责生成一个入口文件，入口文件引入用到的组件，供webpack启动或打包

q: 如何实现注解？
a: 通过装饰函数，把注解关联到类本身或者类的方法上，因为装饰器是可以带参数的，也就是说其实2个不同的类添加了一样的注解，但类关联了不同的注解实例。

q: 如何实现注解组合？
a: 装饰器只能定义在类上，所以注解上也可以添加注解，同样也是保存不同的注解的实例。

q: 会不会出现在一个类（或注解）上添加多个相同注解的情况？
a: 理论上不会存在，出现后再看
