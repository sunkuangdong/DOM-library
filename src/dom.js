window.dom = {};
// 增加节点的操作
dom.create = (string) => {
    const container = document.createElement('tempalte');
    container.innerHTML = string.trim();
    return container.firstChild;
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
    node.remove() || node.parentNode.removeChild(node)
    return node;
}