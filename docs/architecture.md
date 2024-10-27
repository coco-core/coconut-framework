# 基本思路
es只有装饰器，没有注解，所以通过装饰器+元数据达到类似注解的效果。
具体讲装饰器是一个函数，元数据是一个对象，装饰器在运行时将被装饰的类或方法和元数据关联起来
框架收集全部的元信息，提供接口给具体的业务来实现不同的功能。
上面提到元数据是一个对象，实际上是类的实例，通过类来定义元数据具体可用的数据，默认值等等

# pkg说明
- coco-cli: 脚手架功能; 生成.coco文件夹
- coco-ioc-container: IOC容器，提供业务无关的功能（创建实例，注入依赖）
- coco-mvc: 基于ioc-container的mvc相关功能
- coco-reconciler: 调和包。和react-reconciler保持同步
- coco-web: dom操作包。和react-dom中的client保持同步
- shared: 和react-shared保持同步，还包含其他包公共依赖的部分
- test: 测试

# 各个pkg之间的依赖关系