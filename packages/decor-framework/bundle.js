'use strict';

// 自定义组件基类
var VDomType;
(function (VDomType) {
    VDomType[VDomType["Host"] = 0] = "Host";
    VDomType[VDomType["Component"] = 1] = "Component";
})(VDomType || (VDomType = {}));
// 构建一个虚拟dom对象，类似于react中createElement
var createVirtualDom = function (component, props) {
    var tag = typeof component === "string" ? component : undefined;
    var constructor = typeof component === 'function' ? component : undefined;
    return {
        type: tag ? VDomType.Host : VDomType.Component,
        tag: tag,
        cons: constructor,
        props: props,
    };
};

var createElement = function (vd) {
    var tag = vd.tag, props = vd.props;
    var innerText = props.innerText;
    var onClick = props.onClick;
    var element = document.createElement(tag);
    if (innerText) {
        element.innerText = innerText;
    }
    if (onClick) {
        // todo removeEventListener
        // @ts-ignore
        element.addEventListener('click', onClick);
    }
    return element;
};
function updateElement(old, newVd) {
    var innerText = old.props.innerText;
    var newInnerText = newVd.props.innerText;
    if (innerText !== newInnerText) {
        old.elm.innerText = newInnerText;
    }
}
function appendChild(parent, child) {
    parent.appendChild(child);
}

function createComponent(vd, parentElm) {
    var Constructor = vd.cons;
    vd.instance = new Constructor();
    var child = vd.instance.render();
    vd.props.children = [child];
    return doCreate(child, parentElm);
}
function updateComponent(old, vd) {
    var newChild = old.instance.render();
    return reconcileChildren(old.props.children, [newChild]);
}
function doCreate(vd, parentElm) {
    var _a;
    switch (vd.type) {
        case VDomType.Host:
            var elm = vd.elm = createElement(vd);
            var children = (_a = vd.props.children) !== null && _a !== void 0 ? _a : [];
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                doCreate(child, elm);
            }
            appendChild(parentElm, elm);
            return elm;
        case VDomType.Component:
            return createComponent(vd, parentElm);
        default:
            throw new Error("\u4E0D\u77E5\u9053\u7684\u865A\u62DFdom\u7C7B\u578B: ".concat(vd.type));
    }
}
function reconcileChildren(olds, news) {
    var len = Math.max(olds.length, news.length);
    for (var idx = 0; idx < len; idx++) {
        reconcile(olds[idx], news[idx], olds[idx].elm);
    }
    // todo 处理长度不一致的情况
}
/*
 * 新老vd进行比较
 */
function reconcile(old, vd, parentElm) {
    var _a, _b;
    if (old === null && vd === null) {
        // todo dev下输出错误
        return;
    }
    else if (old === null) {
        doCreate(vd, parentElm);
    }
    else if (vd === null) ;
    else {
        if (vd.type === old.type && vd.tag === old.tag && vd.cons === old.cons) {
            // update
            switch (old.type) {
                case VDomType.Host:
                    updateElement(old, vd);
                    if (((_a = old.props.children) === null || _a === void 0 ? void 0 : _a.length) && ((_b = vd.props.children) === null || _b === void 0 ? void 0 : _b.length)) {
                        reconcileChildren(old.props.children, vd.props.children);
                    }
                    break;
                case VDomType.Component:
                    updateComponent(old);
                    break;
            }
        }
    }
}
// todo先放在这里，后续删除
var _root;
var _app;
// 初始化渲染
function initRender(root, app) {
    _root = root;
    _app = app;
    reconcile(null, app, root.elm);
    root.vdom = app;
}
// 更新渲染
function updateRender() {
    reconcile(_root.vdom, _app, _root.elm);
}

var createContainer = function (elm) {
    var container = {
        elm: elm,
        render: function (vd) {
            initRender(container, vd);
        }
    };
    return container;
};

var Button = /** @class */ (function () {
    function Button() {
        var _this = this;
        this.count = 22;
        this.handleClick = function () {
            _this.count++;
            console.log('=======handle click===========', _this.count);
            updateRender();
        };
        this.render = function () {
            return createVirtualDom('div', {
                children: [
                    createVirtualDom('span', { innerText: "hello decor!! ".concat(_this.count) })
                ],
                onClick: _this.handleClick
            });
        };
    }
    return Button;
}());

var container = createContainer(document.getElementById("root"));
var App = createVirtualDom(Button, {});
container.render(App);
