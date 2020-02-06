var require, define;
var context = {};
var modules = {};
var head = document.head;
var jsSuffixReg = /\.js$/;
var globalQueue = [];
var curModule = 0;
var interactiveScript;
var currentlyAddingScript;
/**
 * 事件订阅发布器
 * 用来管理依赖加载同步
 */
function Emitter () {
    this.queue = [];
}

Emitter.prototype.on = function (type, callback) {
    // 优先处理后添加的事件
    this.queue.unshift({
        type: type,
        callback: callback,
    })
}
Emitter.prototype.trigger = function (type) {
    for(let i = 0; i < this.queue.length; i++) {
        let queueItem = this.queue[i];

        if(queueItem.type == type) {
            queueItem.callback();
        }
    }
}
Emitter.prototype.off = function (type) {
    for(let i = 0; i < this.queue.length; i++) {
        let queueItem = this.queue[i];

        if(queueItem.type == type) {
            this.queue.splice(i, 1);
        }
    }
}


var emitter = new Emitter();

var config = {
    baseUrl: "./js/"
}

require = function (deps, callback) {
    let id = getCurrentScriptId();
    context[id] = {
        id,
        deps,
        callback,
        loaded: 0
    }
    if(deps.length) {
        // 遍历依赖 加载
        deps.forEach(dep => {
            // 添加依赖到emitter中
            emitter.on(dep, function() {
                checkLoaded(id);
            })
            load(dep, getUrl(dep), id);
        });
    } else {
        callback();
    }
    
}

define = function (deps, callback) {
    let id = getCurrentScriptId();
    // console.log(deps, id, '<----module');
    if (!Array.isArray(deps)) {
        callback = deps;
        deps = [];
    }
    context[id] = {
        id,
        deps,
        callback,
        loaded: 0,
    }
    if (deps.length) {
        deps.forEach(dep => {
            // 添加依赖到emitter中
            emitter.on(dep, function() {
                checkLoaded(id);
            })
            load(dep, getUrl(dep), id);
        });
    } else {
        context[id].exports = callback();
    }


}


function init() {
    var scripts = document.getElementsByTagName('script');
    var mainScript;
    for (let i = 0; i < scripts.length; i++) {
        let item = scripts[i];
        if (item.getAttribute('data-main')) {
            mainScript = item.getAttribute('data-main');
            break;
        }
    }

    // init
    require([mainScript]);
}



/**
 * 加载脚本 
 * @param module 依赖的模块
 * @param url  依赖模块的url地址
 * @param id    依赖module的模块id
 * */
function load(module, url, id) {
    // TODO: 缺少脚本加载中的处理
    if (context[module] && context[module].isLoaded) {
        emitter.trigger(module);
    } else {
        var script = document.createElement("script");
        script.onload = function (e) {
            // 添加模块
            // console.log(e.target.getAttribute('data-module'));
            var moduleName = e.target.getAttribute('data-module');
            context[moduleName].isLoaded = true;
            // 当前模块的依赖是否加载完成
            emitter.trigger(module);
        }
        script.src = url;
        script.async = true;
        // 设置相关属性 方便在加载完成之后进行check
        script.setAttribute('data-module', module);
        head.appendChild(script);
    }

}

function getUrl(dep) {
    if (jsSuffixReg.test(dep)) {
        return config.baseUrl + dep;
    } else {
        return config.baseUrl + dep + ".js";
    }
}

/**
 * 根据依赖的模块获取到 模块对象
 */
function getDepModules(deps) {
    var ret = [];
    for (let i = 0; i < deps.length; i++) {
        // 没有检测是否加载完成
        if (context[deps[i]] && context[deps[i]].isLoaded && context[deps[i]].exports) {
            ret.push(context[deps[i]].exports);
        }

    }
    // console.log(deps, ret);
    return ret;
}

function checkLoaded(id) {
    let module = context[id];
    module.loaded++;
    let depsModules = getDepModules(module.deps);
    // console.log(module, depsModules, 'che   ckload------>');
    if (module.deps.length === module.loaded && module.deps.length === depsModules.length && module.callback) {
        context[id].exports = module.callback.apply(null, depsModules);
    }
}

function getCurrentScriptId() {
    var script = getCurrentScript();
    return script.getAttribute('data-module') || "@";
}

function getCurrentScript() {
    if (document.currentScript) {
        return document.currentScript;
    }

    if (currentlyAddingScript) {
        return currentlyAddingScript;
    }

    if (interactiveScript && interactiveScript.readyState === 'interactive') {
        return interactiveScript;
    }
    // For IE6-9 browsers, the script onload event may not fire right
    // after the script is evaluated. Kris Zyp found that it
    // could query the script nodes and the one that is in "interactive"
    // mode indicates the current script
    // ref: http://goo.gl/JHfFW
    var scripts = document.getElementsByTagName('script');

    each(scripts, function (script) {
        if (script.readyState === 'interactive') {
            interactiveScript = script;
            return false;
        }
    });
    return interactiveScript;
}


init();