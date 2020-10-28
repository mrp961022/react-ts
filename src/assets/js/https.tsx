import { ajax } from './ajaxUrl'
// 接口统一管理
interface Config {
    type?: string;
    data?: DataObj | FormData;
    dataType?: string;
    contentType?: string;
    timeOut?: number | string;
}
interface DataObj {
    [index: string]: number | string | Array<string | number>
}
export default {
    yqCharts(data?:DataObj) {
        return ajax({
            url: "http://localhost:8080/api/newsdata",
            data: data
        })
    },
    jiekou(data?:DataObj){
        return ajax({
            type:'post',
            contentType: "application/json",
            url: "http://localhost:8080/api/something",
            data: data
        })
    }
}