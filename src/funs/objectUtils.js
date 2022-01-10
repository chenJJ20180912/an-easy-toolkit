const objectUtils = {
    getObjType: obj => {
        let toString = Object.prototype.toString;
        let map = {
            "[object Boolean]": "boolean",
            "[object Number]": "number",
            "[object String]": "string",
            "[object Function]": "function",
            "[object Array]": "array",
            "[object Date]": "date",
            "[object RegExp]": "regExp",
            "[object Undefined]": "undefined",
            "[object Null]": "null",
            "[object Object]": "object"
        };
        if (obj instanceof Element) {
            return "element";
        }
        return map[toString.call(obj)];
    },
    deepClone: data => {
        let type = objectUtils.getObjType(data);
        let obj;
        if (type === "array") {
            obj = [];
        } else if (type === "object") {
            obj = {};
        } else {
            // 不再具有下一层次
            return data;
        }
        if (type === "array") {
            for (let i = 0, len = data.length; i < len; i++) {
                data[i] = (() => {
                    if (data[i] === 0) {
                        return data[i];
                    }
                    return data[i];
                })();
                if (data[i]) {
                    delete data[i].$parent;
                }
                obj.push(objectUtils.deepClone(data[i]));
            }
        } else if (type === "object") {
            for (let key in data) {
                if (data) {
                    delete data.$parent;
                }
                obj[key] = objectUtils.deepClone(data[key]);
            }
        }
        return obj;
    }
}


export default objectUtils