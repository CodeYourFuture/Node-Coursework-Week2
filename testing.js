const messages = [
    {
      id: 0,
      from: "Bart",
      text: "Welcome to CYF chat system!",
    },
    {
      id: 1,
      from: "Baz",
      text: "Testing Testing 123",
    }
]

// request object id is STRING
const req1 = {
    params : {
        id : "1",
    }
}

// request object id is NUMBER
const req2 = {
  params : {
      id : 1,
  }
}

const message1 = messages.find(element => element.id === req1.params.id);
console.log(message1);
// undefined
const message2 = messages.find(element => element.id === req2.params.id);
console.log(message2);
// { id: 1, from: 'Baz', text: 'Testing Testing 123' }

const indexOfMessageId1 = messages.findIndex(element => element.id === req1.params.id);
console.log(indexOfMessageId1);
// -1
const indexOfMessageId2 = messages.findIndex(element => element.id === req2.params.id);
console.log(indexOfMessageId2);
// 1