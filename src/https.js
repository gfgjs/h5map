const HOST = 'https://mv.loopyun.com'
const TOKEN_URL = 'http://192.168.4.241:8100/cmccr-server/oauth/token'
const TOKEN_DATA = 'grant_type=password&username=room&password=123456&client_id=cmccr-h5&client_secret=cmccr-h5'
const post = (api, msg, url, headers) => {
    const {responseType = 'json'} = msg || {}
    headers = headers || {}
    if (typeof msg === 'object') {
        msg = JSON.stringify(msg)
    }

    return fetch(url ? (url + api) : (HOST + api), {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: msg
    }).then(res => res[responseType]()).catch(err => console.log(err))
}
const get = (api, msg, url, headers) => {
    const {responseType = 'json'} = msg || {}
    //传入对象
    if (typeof msg === 'object') {
        api += '?'
        for (let key in msg) {
            api += (key + '=' + msg[key] + '&')
        }
        api = api.slice(0, api.length - 1)
    } else if (msg) {
        //传入字符串
        api += ('/' + msg)
    }
    return fetch(url ? (url + api) : (HOST + api), {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    }).then(res => res[responseType]()).catch(err => console.log(err))
}

export const SET_TOKEN = oauth => {
    oauth.timestamp = Date.now()
    localStorage.setItem('OAUTH', JSON.stringify(oauth))
}
export const UPDATE_TOKEN = async () => {

    const oauth = await post('', TOKEN_DATA, TOKEN_URL, {'Content-Type': 'application/x-www-form-urlencoded'})
    SET_TOKEN(oauth)
    return new Promise(resolve => {
        resolve(oauth.access_token)
    })
}
export const CHECK_TOKEN = () => {
    return new Promise(async resolve => {
        let oauth = localStorage.getItem('OAUTH')
        if (!oauth) {
            resolve(await UPDATE_TOKEN())
        } else {
            try {
                oauth = JSON.parse(oauth)
                const currTime = Date.now()
                if (currTime - oauth.timestamp >= oauth.expires_in * 1000) {
                    resolve(await UPDATE_TOKEN())
                } else {
                    resolve(oauth.access_token)
                }
            } catch (e) {
                resolve(await UPDATE_TOKEN())
            }
        }
    })
}

export const GET_WITH_TOKEN = async (api, msg, url, headers) => {
    headers = headers || {}
    headers['Authorization'] = 'Bearer ' + await CHECK_TOKEN()
    return get(api, msg, url, headers)
}

export const POST_WITH_TOKEN = async (api, msg, url, headers) => {
    headers = headers || {}
    headers['Authorization'] = 'Bearer ' + await CHECK_TOKEN()
    return post(api, msg, url, headers)
}

export const getList = msg => {
    return post('/go/v1/poi/list', msg)
}
export const getRecommend = msg => {
    return GET_WITH_TOKEN('/freeClassRoom/v2/get/default', msg)
}
export const condition = msg => {
    return GET_WITH_TOKEN('/freeClassRoom/v2/get/condition', msg)
}
export const countFreeRoom = msg => {
    return GET_WITH_TOKEN('/freeClassRoom/v2/get/countFreeRoom', msg)
}
