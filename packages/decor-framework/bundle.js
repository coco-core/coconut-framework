'use strict';

var Component = /** @class */ (function () {
    function Component() {
    }
    return Component;
}());
// 构建一个虚拟dom对象，类似于react中createElement
var createVirtualDom = function (component, props) {
    var tag = typeof component === "string" ? component : undefined;
    var constructor = typeof component === 'function' ? component : undefined;
    return {
        tag: tag,
        constructor: constructor,
        props: props,
    };
};

var createHtmlElement = function (tag, children) {
    var element = document.createElement(tag);
    if (typeof children === 'string') {
        element.innerText = children;
    }
    return element;
};
var createClassElement = function (vd) {
    var _a;
    var constructor = vd.constructor;
    var instance = new constructor();
    var childVD = instance.render();
    vd.instance = instance;
    return createHtmlElement(childVD.tag, (_a = childVD.props) === null || _a === void 0 ? void 0 : _a.children);
};
var createChild = function (elm, vd) {
    var tag = vd.tag, constructor = vd.constructor, props = vd.props;
    var child;
    if (typeof tag === 'string') {
        child = createHtmlElement(tag, props.children);
    }
    else if (typeof constructor === 'function') {
        child = createClassElement(vd);
    }
    elm.appendChild(child);
};

var reconciler = function (root, newElement) {
    // if (oldElement !== null) {
    //   // delete
    //   deleteChildren(rootElement);
    // }
    // 创建
    createChild(root.elm, newElement);
};

var createRoot = function (elm) {
    var root = {
        elm: elm,
        render: function (vd) {
            reconciler(root, vd);
        }
    };
    return root;
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.render = function () {
            return createVirtualDom('div', { children: "hello decor!!" });
        };
        return _this;
    }
    return Button;
}(Component));

var root = createRoot(document.getElementById("root"));
var App = createVirtualDom(Button, {});
root.render(App);
