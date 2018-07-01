function findObj(list, val, attr) {
    if (!list || list.length <= 0 || !val) {
        return {}
    }
    for (var item of list) {
        if (item[attr] == val) {
            return item
        }
    }
}

var list = [{
    id: '10010',
    name: 'hhh'
},{
    id: '10011',
    name: 'hhh'
},{
    id: '10010',
    name: 'hhh'
},{
    id: '10010',
    name: 'hhh'
},{
    id: '10010',
    name: 'hhh'
},{
    id: '10010',
    name: 'hhh'
},{
    id: '10010',
    name: 'hhh'
}]

console.log(findObj(list, 'id', '100000'))