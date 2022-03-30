const splitter = '$'

/**
 * 常用的业务键构建器
 * @param item 元素
 * @param keys 键
 * @returns {string}
 */
const generalKeyBuilder = (item, keys) => {
    let pkey = ''
    if (Object.keys(item).length) {
        if (Array.isArray(keys)) {
            keys.forEach((itemKey, idx) => {
                pkey += item[itemKey] + splitter + idx
            })
        } else {
            pkey = item[keys];
        }
    } else {
        // 如果传入的直接是字符串 或者日期 或者。。。。。
        pkey = item
    }
    return pkey
}


const arrayUtils = {

    /**
     * 将一个数组转换成为一棵树
     * @param data  源数据数组
     * @param idKey  对象的唯一主键
     * @param parentKey 父节点的主键
     * @param childKey 子数据在父对象中的属性名
     * @param defaultParentIdId 为数据上parentId为空的数据设置默认的parentId
     */
    arrayToTree(data = [],
                idKey = "id",
                parentKey = "parentId",
                childKey = "children",
                defaultParentIdId='_root') {
        // 根节点数组
        const parentIds = new Set();
        const existParentIds = new Set();
        const dataMap = {};
        data.forEach(item => {
            const id = item[idKey];
            // 处理当前节点
            let cur = dataMap[id];
            item[childKey] = cur ? cur[childKey] : [];
            dataMap[id] = item;
            // 处理父亲节点
            const parentId = item[parentKey] || defaultParentIdId;
            if (parentId) {
                if (!existParentIds.has(parentId)) {
                    // 收集父节点的id
                    parentIds.add(parentId);
                    existParentIds.add(parentId);
                }
                let parent = dataMap[parentId];
                if (!parent) {
                    dataMap[parentId] = parent = {};
                    parent[childKey] = [];
                    parent[idKey] = parentId;
                }
                parentIds.delete(id);
                existParentIds.add(id);
                parent[childKey].push(item);
            }
        });
        const root = [];
        parentIds.forEach(pid => {
            root.push(dataMap[pid]);
        });
        if(dataMap[defaultParentIdId]){
            root.push(...dataMap[defaultParentIdId])
        }
        return root;
    },
    /**
     * 对数组进行去重
     * @param data 源数据
     * @param key 属性
     * @param keyBuilder 唯一键的构建器
     */
    distinctArray(data = [], key = "", keyBuilder = generalKeyBuilder) {
        const keyLst = new Set();
        const distinctLst = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            let pkey = keyBuilder(item, key)
            if (!keyLst.has(pkey)) {
                keyLst.add(pkey);
                distinctLst.push(item);
            }
        }
        return distinctLst;
    },
    /**
     * 通过keys 获取Labels
     *      * @param data 数据集合
     * @param keys 关键字
     * @param labelKey 显示的label属性名
     * @param valueKey 值的属性名
     * @returns {*[]|*[]|[]}
     */
    getNamesByKeys(data = [], keys = [], labelKey = 'label', valueKey = 'value') {
        if (!keys || !keys.length) {
            return keys || []
        }
        if (typeof keys === 'string') {
            keys = keys.split(",")
        }
        // 将数组转换成为map
        const dataMap = this.toMap(data, valueKey, labelKey)
        const labels = []
        keys.forEach(item => {
            const label = dataMap[item]
            labels.push(label)
        })
        return labels;
    },
    /**
     * 将数据进行分组
     * @param data 数据
     * @param keyBuilder 键构建器
     * @param valueBuilder 值构建器
     * @returns {*[]|*[]|{}}
     */
    groupBy(data = [], keyBuilder, valueBuilder) {
        const map = {}
        if (typeof keyBuilder === 'string') {
            const key = keyBuilder
            keyBuilder = (item) => {
                return item[key]
            }
        }
        if (!valueBuilder) {
            valueBuilder = (item) => {
                return item
            }
        } else if (typeof valueBuilder === 'string') {
            const key = valueBuilder
            valueBuilder = (item) => {
                return item[key]
            }
        }
        data.forEach(item => {
            const pkey = keyBuilder(item)
            let arr = map[pkey]
            if (!arr) {
                map[pkey] = arr = []
            }
            const value = valueBuilder(item)
            arr.push(value)
        })
        return map
    },
    /**
     * 将数组转换成为对象
     * @param data 数据
     * @param keyBuilder 键构建器
     * @param valueBuilder 值构建器
     * @returns {{}}
     */
    toMap(data = [], keyBuilder, valueBuilder) {
        const map = {}
        if (typeof keyBuilder === 'string') {
            const key = keyBuilder
            keyBuilder = (item) => {
                return item[key]
            }
        }
        if (!valueBuilder) {
            valueBuilder = (item) => {
                return item
            }
        } else if (typeof valueBuilder === 'string') {
            const key = valueBuilder
            valueBuilder = (item) => {
                return item[key]
            }
        }
        data.forEach(item => {
            const pkey = keyBuilder(item)
            map[pkey] = valueBuilder(item)
        })
        return map
    }
}

export default arrayUtils

