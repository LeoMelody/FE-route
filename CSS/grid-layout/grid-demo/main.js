const arr = [{
    label: 'a',
    value: 1
}, {
    label: 'b',
    value: 2
}, {
    label: 'c',
    value: 3
}, {
    label: 'd',
    value: 4
}, {
    label: 'e',
    value: 5
}, {
    label: 'f',
    value: 6
}, {
    label: 'g',
    value: 7
}, {
    label: 'h',
    value: 8
}, {
    label: 'i',
    value: 9
}, ]

var target = 9
var container = document.querySelector('#container')
container.addEventListener('click', function(e) {
    var id = e.target.dataset.id
    currentItem = findVL('label', id)
    var currentTag = document.querySelector('[data-id=' + id + ']') // 获取到当前的dom元素
    setArea(currentTag, id)
})

/**
 * 设置当前dom元素的area
 */
function setArea(currentTag, label) {
    var tagValue = findVL('label', label).value
    var diff = Math.abs(tagValue - target)
    if (diff == 1 || diff == 3) {
        var targetLabel = findVL('value', target).label
        currentTag.style.gridArea = targetLabel
        currentTag.dataset.id = targetLabel
        target = tagValue
        checkWin()
    } else {
        return 
    }
}   

function findVL(attr, value) {
    var target = {}
    arr.map(item=>{
        if (item[attr] == value) {
            target = item
        }
    })
    return target
}

function checkWin() {
    var list = document.querySelectorAll('.item')
    var num = 0
    while(num < 8 && (list[num].dataset.id == arr[num].label)) {
        num++
    }
    if (num >= 6) {
        console.log('成功啦')
    } else {
        console.log('继续努力')
    }
}

(function () {
    var list = document.querySelectorAll('.item')
    var copyArr = [...arr]
    arr.map((item, index)=> {
        if (index > 7) {
            return
        }
        var randomNum = Math.floor(Math.random()*(8-index))
        console.log(randomNum)
        list[index].dataset.id = copyArr[randomNum].label
        list[index].className = 'item item-' + copyArr[randomNum].label
        copyArr.splice(randomNum,1)
    })
})()
