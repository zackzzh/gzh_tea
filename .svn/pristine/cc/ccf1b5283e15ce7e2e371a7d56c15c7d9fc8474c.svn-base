function setSession(key, val) {
    // console.log("setSession设置", key, val)
    var value = val
    if (typeof val !== "String") {
        value = JSON.stringify(val);
    }
    sessionStorage.setItem(key, value);
}

function getSession(key) {
    var value = sessionStorage.getItem(key)
    // console.log("查询", value)
    return JSON.parse(value);
}

function delSession(key) {
    // sessionStorage.removeItem(key);
    sessionStorage.removeItem(key)
    // console.log("删除");
}

function changeSession(key, val) {
    setSession(key, val)
}

function clearSession() {
    sessionStorage.clear()
}

function getStrSession(key) {
    // console.log("getStrSession获取", key)

    return sessionStorage.getItem(key)
}