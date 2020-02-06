define(['log'],function (log) {
    log.info('我是 common module');
    return {
        show: function (msg) {
            document.body.innerHTML = msg;
        }
    }
})