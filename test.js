// const arr=[
//     {id:7,
//         name:'a'
//     },
//     {id:7,
//         name:'a'
//     },
//     {id:9,
//         name:'a'
//     },
// ]
// let b=[]
// for(let i of arr){
    
//     b.push((i.id));
    
// }
// console.log(Math.max(...b))


const arr=[1,2,2,4,5,6,7,8.10,19,19,80,0]
console.log(arr.slice(Math.max(arr.length - 10, 1)))
console.log(arr.slice(-10))
