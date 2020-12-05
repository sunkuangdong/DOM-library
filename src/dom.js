window.dom = {};
// 增加节点的操作
dom.create = (string) => {
    const container = document.createElement('template');
    container.innerHTML = string.trim();
    return container.content.firstChild;
}
dom.after = (node, node2) => {
    const insertedNode = node.parentNode.insertBefore(node2, node.nextSibling)
    return insertedNode
}
dom.before = (node, node2) => {
    const insertedNode = node.parentNode.insertBefore(node2, node)
    return insertedNode
}
dom.append = (parent, node) => {
    const insertedNode = parent.appendChild(node)
    return insertedNode
}
dom.wrap = (node, parent) => {
    dom.before(node, parent)
    dom.append(parent, node)
}
// 删除节点操作
dom.removed = (node) => {
    node.remove()
    return node;
}
dom.empty = (node) => {
    let array = []
    let x = node.firstChild
    while (x) {
        array.push(dom.removed(node.firstChild))
        x = node.firstChild
    }
    return array;
}
// 修改节点操作
dom.attr = function (node, name, value) {
    console.log(arguments.length);
    if (arguments.length === 3) {
        node.setAttribute(name, value)
    } else if (arguments.length === 2) {
        return node.getAttribute(name)
    }
}
dom.text = function (node, text) {
    if (arguments.length === 2) {
        if ('innerText' in node) {
            node.innerText = text
        } else {
            node.textContent = text
        }
    } else if (arguments.length === 1) {
        if ('innerText' in node) {
            return node.innerText
        } else {
            return node.textContent
        }
    }
}
dom.html = function (node, string) {
    if (arguments.length === 2) {
        node.innerHTML = string
    } else if (arguments.length === 1) {
        return node.innerHTML
    }
}
dom.style = function (node, object, value) {
    if (arguments.length === 3) {
        node.style[arguments[1]] = value
        return node;
    } else if (arguments.length === 2) {
        if (typeof object === 'string') {
            return node.style[object]
        } else {
            for (let key in object) {
                node.style[key] = object[key]
            }
        }
    }
}
dom.class = {
    add(node, className) {
        node.classList.add(className)
    },
    remove(node, className) {
        node.classList.remove(className)
    },
    has(node, className) {
        return node.classList.contains(className)
    }
}
dom.on = function (node, event, fn) {
    node.addEventListener(event, fn)
}
dom.off = function (node, event, fn) {
    node.removeEventListener(event, fn)
}
// 查询节点操作
dom.find = function (idString, scope) {
    return (scope || document).querySelectorAll(idString)[0]
}
dom.parent = (node) => {
    return node.parentNode
}
dom.children = (node) => {
    return node.children
}
dom.siblings = (node) => {
    return Array.from(node.parentNode.children)
        .filter(item => item !== node)
}
dom.next = (node) => {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
        x = x.nextSibling
    }
    return x;
    // return node.nextElementSibling
}
dom.previous = (node) => {
    let x = node.previousSibling
    while (x && x.nodeType) {
        x = x.previousSibling
    }
    return x;
    // return node.previousElementSibling
}
dom.each = (nodeList, fn) => {
    for (let i = 0; i < nodeList.length; i++) {
        fn.call(null, nodeList[i])
    }
}
dom.index = (node) => {
    const list = dom.children(node.parentNode)
    for (let i = 0; i < list.length; i++) {
        if (list[i] === node) {
            return i;
        }
    }
}