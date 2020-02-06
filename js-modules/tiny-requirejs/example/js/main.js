console.log('main script invoke');

require(['common','log'], function (common, log) {
    common.show("common module");
    log.info("nice log");
})