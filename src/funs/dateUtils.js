/**
 * 日期工具类
 */
const dateUtils = {
    /**格式为yyyy-MM-dd HH:mm:ss*/
    // 年月日 时分秒
    date_formatter_long: "yyyy-MM-dd HH:mm:ss",
    /**格式为yyyy-MM-dd*/
    // 年月日
    date_formatter_short: "yyyy-MM-dd",
    /**
     * 获取时间
     * @param date
     * @returns {*}
     */
    getDate(date) {
        if (date == null) date = undefined;
        if (typeof date === "string") {
            date = dateUtils.stringToDate(date);
        }
        return date;
    },
    /**
     * 日期转字符串
     * @param fmt
     * @param date
     * @returns {*}
     */
    dateToString(date, fmt) {
        let ret;
        if (!date) {
            return "";
        }
        if (!fmt) {
            fmt = "yyyy-MM-dd";
        }
        date = this.getDate(date);
        const opt = {
            "y+": date.getFullYear().toString(), // 年
            "M+": (date.getMonth() + 1).toString(), // 月
            "d+": date.getDate().toString(), // 日
            "H+": date.getHours().toString(), // 时
            "m+": date.getMinutes().toString(), // 分
            "s+": date.getSeconds().toString() // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : this.padStart(opt[k], ret[1].length, "0"));
            }
        }
        return fmt;
    },
    /**
     * 字符串转日期 yyyy-MM-dd HH:mm:ss
     * @param str 时间字符串
     * @param format 时间格式
     */
    stringToDate(str, format) {
        if (format) {
            // 先设置默认的年月日时分秒
            let year = '1970', month = '01', day = '01', hour = '00', minute = '00', second = '00'
            let idx = format.indexOf("yyyy")
            if (idx > -1) {
                year = str.substring(idx, idx + 4)
            }
            idx = format.indexOf("MM")
            if (idx > -1) {
                month = str.substring(idx, idx + 2)
            }
            idx = format.indexOf("dd")
            if (idx > -1) {
                day = str.substring(idx, idx + 2)
            }
            // 不考虑12小时 即hh
            idx = format.indexOf("HH")
            if (idx > -1) {
                hour = str.substring(idx, idx + 2)
            }
            idx = format.indexOf("mm")
            if (idx > -1) {
                minute = str.substring(idx, idx + 2)
            }
            idx = format.indexOf("ss")
            if (idx > -1) {
                second = str.substring(idx, idx + 2)
            }
            // 重新组装字符串
            str = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
        }
        let date;
        if (str) {
            date = new Date(str.replace(/-/g, "/"));
        }
        return date;
    },

    /**
     * 源串左侧补字符
     * @param source 源串
     * @param length 补全之后的长度
     * @param char
     */
    padStart(source, length, char) {
        // 补全后的结果
        let result = "";
        // 需要补全的长度
        let len = 0;
        // 根据source是否为空对数据进行处理
        source ? (len = length - source.length) : (source = "");
        for (let i = 0; i < len; i++) {
            result += char;
        }
        return result + source;
    },
    /**
     * 日期加减
     * @param date
     * @param num
     * @returns {Date}
     */
    addDay(date, num) {
        if (!date) {
            return null;
        }
        date = this.getDate(date);
        let newDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        );
        newDate.setDate(newDate.getDate() + num);
        return newDate;
    },
    /**
     * 月份加减
     * @param date
     * @param num
     */
    addMonth(date, num) {
        if (!date) {
            return null;
        }
        date = this.getDate(date);
        let newDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        );
        newDate.setMonth(newDate.getMonth() + num);
        return newDate;
    },
    /**
     * 年份加减
     * @param date
     * @param num
     */
    addYear(date, num) {
        if (!date) {
            return null;
        }
        date = this.getDate(date);
        let newDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        );
        newDate.setFullYear(newDate.getFullYear() + num);
        return newDate;
    },
    /**
     * 获取日期是周几
     * @param date
     * @param weeks
     * @returns {string}
     */
    getWeekDate(date, weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]) {
        if (!date) {
            return "";
        }
        let day = this.getDate(date).getDay();
        return weeks[day];
    },
    /**
     * 计算两个日期之间的天数差
     * @param firstDate
     * @param secondDate
     * @returns {string}
     */
    subDay(firstDate, secondDate) {
        const begainDate = this.getDate(firstDate);
        const endingDate = this.getDate(secondDate);
        const diff = Math.abs(begainDate.getTime() - endingDate.getTime());
        return parseInt(String(diff / (1000 * 60 * 60 * 24)));
    },
    /**
     * 计算两个日期之间的月份差
     * date1，date2
     */
    subMonth(date1, date2) {
        date1 = this.dateToString(date1, "yyyy-MM-dd");
        date2 = this.dateToString(date2, "yyyy-MM-dd");
        //用-分成数组
        date1 = date1.split("-");
        date2 = date2.split("-");
        //获取年,月数
        const year1 = parseInt(date1[0]),
            year2 = parseInt(date2[0]),
            month1 = parseInt(date1[1]),
            month2 = parseInt(date2[1]);
        return Math.abs((year2 - year1) * 12 + (month2 - month1) + 1);
    },
    /**
     * 计算两个日期之间的年份差
     * date1，date2
     */
    subYear(date1, date2) {
        date1 = this.dateToString(date1, "yyyy-MM-dd");
        date2 = this.dateToString(date2, "yyyy-MM-dd");
        //用-分成数组
        date1 = date1.split("-");
        date2 = date2.split("-");
        //获取年,月数
        const year1 = parseInt(date1[0]),
            year2 = parseInt(date2[0]);
        return Math.abs((year2 - year1));
    },
    /**
     * 计算某一月份有多少天，如果用户不传date,则默认查找当前月份
     */
    getDaysOfMonths(date) {
        let curDate;
        if (!date) {
            curDate = new Date();
        } else {
            curDate = this.stringToDate(date);
        }
        /* 获取当前月份 */
        const curMonth = curDate.getMonth();
        /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        curDate.setMonth(curMonth + 1);
        /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        curDate.setDate(0);
        /* 返回当月的天数 */
        return curDate.getDate();
    },
    /**
     * 获取区间内的所有日期
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param returnDate 返回日期类型
     */
    getDatesInRange(startDate, endDate, returnDate = true) {
        const date_all = [];
        let i = 0;
        let startDateStr = this.dateToString(startDate, this.date_formatter_short);
        // 复制一份开始日期
        const endDateStr = this.dateToString(endDate, this.date_formatter_short);
        let startDateClone = this.stringToDate(startDateStr)
        do {
            if (returnDate) {
                date_all[i] = this.stringToDate(startDateStr)
            } else {
                date_all[i] = startDateStr
            }
            startDateClone.setDate(startDateClone.getDate() + 1);
            startDateStr = this.dateToString(startDateClone, this.date_formatter_short);
            i++;
        } while (endDateStr.localeCompare(startDateStr) !== -1);
        return date_all;
    },
    /**
     * 计算两个年份之间所有的年份
     */
    getYearArr(startYear, endYear) {
        //如果不传初始时间和结束时间，则设置一个默认的开始时间和结束时间
        if (!startYear) {
            startYear = 1990;
        }
        if (!endYear) {
            endYear = 2050;
        }
        const yearArr = [],
            prDate = new Date(),
            presentYear = prDate.getFullYear();//当前年份
        if (!endYear) { //为空为当前年份
            endYear = presentYear;
        }
        if (!startYear) { //为空为当前年前5年
            startYear = presentYear - 5;
        }
        for (let i = startYear; i <= endYear; i++) {
            yearArr.push(i);
        }
        return yearArr;
    }
};

export default dateUtils
