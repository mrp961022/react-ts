let codeStr:string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export let getCodew = (num:number):string => {
    let str:string = "";
    for(let i = 0; i<num; i++){
        let ran:string = codeStr.charAt(Math.floor(Math.random()*(62 - 0) + 0));
        str += ran;
    }
    return str;
}