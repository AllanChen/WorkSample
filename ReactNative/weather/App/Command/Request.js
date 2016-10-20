let Request = {
    /*
     * fetch简单封装
     * url: 请求的URL
     * successCallback: 请求成功回调
     * failCallback: 请求失败回调
     *
     * */
    get: (url, successCallback, failCallback) => {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch((err) => {
                failCallback(err);
            });
    },

    getForPromise:(url) => {
        return new Promise((resolve,reject) => {
            fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                resolve(JSON.parse(responseText));
            })
             .catch((err) => {
                reject(new Error(err));
                console.warn(err);
            }).done();
        });
    }
}

export default Request;
