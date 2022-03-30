// 缓存控件
import objectUtils from "../funs/objectUtils";

const cacheSpace = {
    storeTime: -1, // 定时备份数据的间隔,负数代表不备份
    storageProvider: sessionStorage,// 存储数据的介质
    storageProviderMap: {},// 数据存储介质 颗粒度比storageProvider更细
    storageInterval: null,
    data: {},
    cacheListeners: {},// 缓存监听器
    /**
     * 获取缓存区域的数据存储支撑对象
     * @param region 缓存区域
     * @returns {Storage}
     */
    getStorageProvider(region) {
        let storageProvider = this.storageProvider
        if (this.storageProviderMap) {
            storageProvider = this.storageProviderMap[region]
        }
        return storageProvider || this.storageProvider
    },
    /**
     * 获取缓存区域内的所有的值
     * @param region 缓存区域
     * @param clone 是否clone对象
     * @returns {*|{}}
     */
    getRegion(region = "", clone = true) {
        if (cacheSpace.storeTime && cacheSpace.storageInterval !== null) {
            // 开启定时备份
            this.startStorageInterval()
        }
        let cacheData = this.data[region];
        if (cacheData === undefined) {
            const regionJson = this.getStorageProvider(region).getItem(region);
            if (regionJson) {
                cacheData = JSON.parse(regionJson);
            } else {
                cacheData = {};
            }
            this.data[region] = cacheData;
        }
        if (!clone) {
            cacheData = objectUtils.deepClone(cacheData)
        }
        // 对 cacheData 进行一个深克隆,避免外面的数据和缓存的数据是同一个对象
        return cacheData
    },
    /**
     * 获取缓存的值
     * @param region
     * @param key
     * @returns {*}
     */
    getCache(region = "", key = "") {
        return this.getRegion(region, false)[key];
    },
    /**
     * 放置缓存
     * @param region
     * @param key
     * @param value
     */
    putCache(region = "", key = "", value = {}) {
        const cacheData = this.getRegion(region, false);
        cacheData[key] = value;
        this.getStorageProvider(region).setItem(region, JSON.stringify(cacheData));
        // 通知事件监听机制
        (this.cacheListeners[region] || []).forEach(cacheListener => cacheListener.onUpdat && cacheListener.onUpdate(region, key, value))
    },
    /**
     * 初始化缓存区域
     * @param region
     * @param data
     */
    initCacheRegion(region = "", data = {}) {
        this.data[region] = data;
        this.getStorageProvider(region).setItem(region, JSON.stringify(data));
    },
    /**
     * 开启定时器备份
     */
    startStorageInterval() {
        // 每隔一段时间 就持久化一次内存里面的缓存到sessionStorage 中，避免因为刷新导致缓存丢失的问题
        cacheSpace.storageInterval = setInterval(() => {
            cacheSpace.doStorage()
        }, cacheSpace.storeTime);
    },
    /**
     * 停止定时器备份
     */
    stopStorageInterval() {
        if (cacheSpace.storageInterval) {
            clearInterval(cacheSpace.storageInterval)
            cacheSpace.storageInterval = null
        }
    },
    /**
     * 执行持久化
     */
    doStorage() {
        const cacheData = this.data || {};
        Object.keys(cacheData).forEach(key => {
            this.getStorageProvider(key).setItem(key, JSON.stringify(cacheData[key]));
        });
    },
    /**
     * 添加一个缓存监听器
     * @param region 监听的缓存区域
     * @param cacheListener 监听器对象
     */
    addCacheListener(region, cacheListener) {
        if (!this.cacheListeners[region]) {
            this.cacheListeners[region] = []
        }
        this.cacheListeners[region].push(cacheListener)
    }
};


export default cacheSpace
