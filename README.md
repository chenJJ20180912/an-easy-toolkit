## 封装一些方便使用的工具类和方法

### 注意

插件可以通过src/index.js 进行统一引用，然后通过挂载的对象统一调用

#### vue2 挂载方式

> Vue.prototype.$anEasyToolkit = anEasyToolkit;

#### vue3 挂载方式

> app.config.globalProperties.$anEasyToolkit = anEasyToolkit;

### 日期工具类

调用对象 anEasyToolkit.dateUtils

#### 常用方法:

| 方法名       | 描述         | 参数                           |
| ------------ | ------------ | ------------------------------ |
| dateToString | 日期转字符串 | date(日期对象), fmt(格式串)    |
| stringToDate | 字符串转日期 | str,[format(字符串日期格式)]                            |
| addDay       | 天数加减             | date(日期对象),num(天数偏移量) |
| addMonth     | 月份加减             | date(日期对象),num(天数偏移量) |
| addYear      | 年份加减             | date(日期对象),num(天数偏移量) |
| getWeekDate  | 获取日期是周几        | date(日期对象),weeks(周几的别名) |
| subDay       |  计算两个日期之间的天数差| date1(开始日期),date2(结束日期) |
| subMonth       | 计算两个日期之间的月份差| date1(开始日期),date2(结束日期) |
| subYear       | 计算两个日期之间的年份差| date1(开始日期),date2(结束日期) |
| getDaysOfMonths| 计算某一月份有多少天| [date(日期对象，默认当月)]|

### 数组工具类

调用对象 anEasyToolkit.arrayUtils

#### 常用方法:

| 方法名       | 描述         | 参数                           |
| ------------ | ------------ | ------------------------------ |
| arrayToTree | 数组转成树 | data(数据), [idKey(id属性名)], [parentKey(父节点id属性名)],[childKey(子元素集合属性名)]   |
| distinctArray | 对数组进行去重 | data(数据),key(去重的属性名),[splitter(分隔符)]                            |
| getNamesByKeys| 根据值从数组中找出文本属性| data(数据),keys(值集合),[labelKey(文本属性名)],[valueKey(值属性名)] |
| groupBy| 对数组中的数据进行分组| data(数据),[keyBuilder(键构建器)],[valueBuilder(值构建器)] |
| toMap| 将数组转换成为map对象| data(数据),[keyBuilder(键构建器)],[valueBuilder(值构建器)]|

### 缓存工具类

调用对象 anEasyToolkit.cacheUtils

#### 相关配置

// 定时备份数据的间隔,负数代表不备份 </br>
cacheSpace.storeTime </br>
//存储数据的介质,可以通过注入此对象实现自定义存储,默认为sessionStorage</br>
cacheSpace.storageProvider: sessionStorage</br>
// 数据存储介质,颗粒度比storageProvider更细,可以根据region 来自定义数据存储区域 cacheSpace.storageProviderMap:{}</br>

#### 常用方法:

| 方法名       | 描述         | 参数                           |
| ------------ | ------------ | ------------------------------ |
| initCache | 初始化缓存区域 | region(缓存区域名称),[data(数据)]  |
| getCache | 获取缓存中的值 |region(缓存区域名称),key(缓存的键)|
| putCache| 设置缓存| region(缓存区域名称),key(缓存的键),value(缓存的值) |
| getRegion| 获取缓存区域| region(缓存区域名称) |
| stopStorageInterval| 取消定时刷新缓存到storageProvider| |

### 对象工具类

调用对象 anEasyToolkit.objectUtils

#### 常用方法:

| 方法名       | 描述         | 参数                           |
| ------------ | ------------ | ------------------------------ |
| deepClone | 深克隆对象 | data(数据) |