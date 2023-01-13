const arr=[
    {id:7,
        name:'a'
    },
    {id:7,
        name:'a'
    },
    {id:9,
        name:'a'
    },
]
let b=[]
for(let i of arr){
    
    b.push((i.id));
    
}
console.log(Math.max(...b))