'use strict';

// 构建一个虚拟dom对象，类似于react中createElement
var createVirtualDom = function (tag, props) {
    return {
        tag: tag,
        props: props,
    };
};

var deleteChildren = function (elm) {
    var children = elm.children;
    for (var idx = children.length - 1; idx >= 0; idx--) {
        elm.removeChild(children[idx]);
    }
};
var createChild = function (elm, vd) {
    var tag = vd.tag, props = vd.props;
    var element = document.createElement(tag);
    if (typeof props.children === 'string') {
        element.innerText = props.children;
    }
    elm.appendChild(element);
};

var reconciler = function (oldElement, newElement, rootElement) {
    if (oldElement !== null) {
        // delete
        deleteChildren(rootElement);
    }
    // 创建
    createChild(rootElement, newElement);
};

var root = document.getElementById("root");
var App = createVirtualDom('div', { children: "hello decor!" });
reconciler(null, App, root);
