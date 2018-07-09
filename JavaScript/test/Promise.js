function getSession(call) {
 // callxxx
 var session = '123456'
 call(session)
}

function getInfo(session, call) {
  console.log(session)
  // session xxx
  var info = {
    name: 'xxx',
    id: '10010'
  }
  call(info)
}

function getList(info, call) {
  console.log(info)
  // xxxx
  var list = [1, 2, 3, 4]
  call(list)
}

getSession(function(session) {
  // xxxxx
  getInfo(session, function(info) {
    // xxxx
    getList(info, function(list) {
      console.log(list)
    })
  })
})

getSession().then(function() {
  
})