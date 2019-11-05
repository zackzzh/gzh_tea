function $go(val) {
    let pathName = val.path
    // if (val.query) {
    //     window.location.href = dotsSum + pathName + ".html?data=" + JSON.stringify(val.query)
    // } else {
    //     window.location.href = dotsSum + pathName + ".html"
    // }
    if (val.query) {
        let pathData = JSON.stringify(val.query)
        sessionStorage.setItem("pathData", pathData);
    }
    window.location.href = dotsSum + pathName + ".html"
}

function $back() {
    window.history.go(-1);
}