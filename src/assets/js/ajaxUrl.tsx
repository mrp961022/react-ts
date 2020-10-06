// 普通接口入参
interface Config {
    type?: string;
    url: string;
    data?: DataObj | FormData;
    dataType?: string;
    contentType?: string;
    timeOut?: number | string;
}
// 下载接口入参
interface DownloadConfig {
    url: string;
    data?: DataObj | FormData;
}
// 接口数据规范
interface DataObj {
    [index: string]: number | string | Array<string | number>
}
// 返回值状态
enum StatusAll {
    success = 200,
    notFind = 404,
    serverError = 500
}

export function ajax(config: Config) {
    return new Promise((resolve:(value: string)=>void, reject:(value: string)=>void)=>{
        let data = config.data || {}, timeOut = Number(config.timeOut);
        let type = (config.type || 'get').toLocaleLowerCase();
        let urlData: string = Object.entries(data).map(([key, value])=>`${key}=${value}`).join('&');
        let xhr = new XMLHttpRequest();
        // 如果是get请求且有入参 入参在接口?后
        if(type === 'get' && urlData) {
            xhr.open(type, `${config.url}?${urlData}`, true);
        } else {
            xhr.open(type, config.url, true);
        }
        // 设置请求头 如果设置请求头的话
        if(config.contentType) {
            xhr.setRequestHeader("Content-Type", config.contentType);
            xhr.send(urlData);
        } else {
            xhr.send(data instanceof FormData ? data : (type === 'get' ? null : JSON.stringify(data)))
        }
        xhr.timeout = (timeOut || 6) * 1000;
        xhr.ontimeout = ()=>{
            alert('请求超时！');
        }
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(xhr.status === StatusAll.success) {
                    // 接口返回的状态码 可根据需要修改
                    let resErrorCode = JSON.parse(xhr.responseText).errorCode || "0000";
                    if(resErrorCode === '0001'){
                        reject("登录超时")
                    }
                    // let reponseText = xhr.responseText.split('(')[1].split(')')[0]
                    resolve(xhr.responseText);
                    // resolve(reponseText)
                } else {
                    // 返回值不是200 则请求失败
                    reject(`${type.toLocaleUpperCase()} ${xhr.responseURL} ${xhr.status} (${xhr.responseText})`)
                    if(xhr.statusText){
                        // 有状态值 请求失败 否则是断网
                        alert(xhr.status)
                    } else {
                        alert("断网")
                    }
                }
            }
        }
    })
}

export function download(config: DownloadConfig) {
    /**
     * @description 下载本地文件 不跨域
     * @description location.href有些文件会打开 不会下载 例如 json、图片、txt文件
     * @description download属性决定下载文件的文件名以及类型
     */
    // let a: any = document.createElement("a");
    // a.download = (urlData ? `${urlStr}?${urlData}` : urlStr).split('/').reverse()[0];
    // a.href = urlData ? `${urlStr}?${urlData}` : urlStr;
    // document.getElementsByTagName("body")[0].append(a); // 修复firefox中无法触发click
    // a.click();
    // a.remove();
    return new Promise((resolve:(value: string)=>void, reject:(value: string)=>void)=>{
        /**
         * @description 跨域下载 需要解决跨域
         */
        let data = config.data || {}, urlStr = `${config.url}`;
        let type = 'post';
        let urlData: string = Object.entries(data).map(([key, value])=>`${key}=${value}`).join('&');
        let xhr = new XMLHttpRequest();
        xhr.open(type, config.url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhr.send(urlData);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if (xhr.status === StatusAll.success) {// 成功
                    let blob = xhr.response;
                    let reader = new FileReader();
                    reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
                    reader.onload = function (e: any) {
                      // 转换完成，创建一个a标签用于下载
                      let a: any = document.createElement("a");
                      a.download = (urlData ? `${urlStr}?${urlData}` : urlStr).split('/').reverse()[0];
                      a.href = urlData ? `${urlStr}?${urlData}` : urlStr;
                      document.getElementsByTagName('body')[0].append(a)
                      a.click();
                      resolve('下载成功')
                      a.remove();
                    };
                }
            }
        }
    })
}