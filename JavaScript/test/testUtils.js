const Utils = require('../niceCode/utils')

const util = new Utils()

var arr = [{
    name: 'wyh',
    id: '10010'
},{
    name: 'wyh2',
    id: '100102'
},{
    name: 'wyh3',
    id: '100103'
},{
    name: 'wyh4',
    id: '100104'
},{
    name: 'wyh5',
    id: '100105'
}]

console.log(util.findObj(arr, 'id', '10010'))