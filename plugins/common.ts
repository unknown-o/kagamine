import { Md5 } from 'ts-md5'
import axios from 'axios'

export const requestApi = (
    apiPath: string,
    auth: any,
    method: string,
    query: any,
    data: any,
    callbackSuccess: (rdata: any) => {},
    callbackFail: (rdata: any) => {}
) => {
    let timestamp = Date.now()
    let key = Md5.hashStr("Kagamine Yes!" + timestamp.toString())
    let appid = ''

    if (auth) {
        key = auth.token
        timestamp = auth.timestamp
        appid = import.meta.env.VITE_APP_UCAPTCHA_APPID as string
    }
    auth = btoa(timestamp.toString() + '__' + key)
    axios({
        method: method,
        params: query,
        headers: {
            'Authorization': "Basic " + auth,
            'X-UCaptcha-APPID': appid
        },
        data: data,
        url: import.meta.env.VITE_APP_API_PATH + apiPath,
        responseType: 'json'
    }).then(function (response) {
        callbackSuccess(response)
    }).catch(function (error) {
        try {
            if (error.response.data.msg) {
                callbackSuccess(error.response)
            } else {
                callbackFail(error)
            }
        } catch {
            callbackFail(error)
        }
    })
}

export const formatDate = (value: number) => {
    let date = new Date(value);//这个是纳秒的，想要毫秒的可以不用除以1000000
    let y: any = date.getFullYear();
    let MM: any = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d: any = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h: any = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m: any = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s: any = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

export default defineNuxtPlugin(() => { })