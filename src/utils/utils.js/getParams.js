const getParams = (url = '') => {
    let ret = {}
    if (!typeof url === 'string' || !url.trim()) {
        return {}
    }
    let index = url.indexOf('?')
    let params = url.slice(index + 1)
    let paramsArr = params.split('&')
    for (let i = paramsArr.length ; i-- ; ) {
        let key = paramsArr[i].split('=')
        let value = key[1]
        key = key[0]
        if (ret[key] === undefined) {
            ret[key] = value
        } else {
            ret[key] = [].concat([ret[key], value])
        }
    }
    return ret   
}