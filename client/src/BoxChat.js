import React, {useState, useEffect} from 'react'

function BoxChat(props) {
 const [names, setNames] = useState([]);
 const [refresh, setRefresh] =useState(null)
 
 // const [ids, setIds] = useState([]);
 useEffect(() => {
   fetch("http://localhost:4002/")
     .then((res) => res.json())
     .then((data) => {
      console.log(data)
      setNames(data);
      // setMessage(() => data.map((ele) => ele.text));
      // setId(() => data.map((ele) => ele.id));
     });
 }, [props.count, refresh]);
 const deleteMessageButton = (id) => {
  // fetch(`http://localhost:4002/messages/${id}`, {
  //  method: "DELETE",
  //  body: JSON.stringify({
  //   id: id
  //  }),
  //  headers: {
  //   "Content-Type": "application/json"
  //  }
  // });
  
  fetch(`http://localhost:4002/messages/${id}`,{method:"DELETE"}).then(res=>res.json()).then(console.log)
  setRefresh(() => id)
 } 
 return (
   <div >
     {
      names.map((name, index) => {
       return (
         <div className="box-chat">
           <p>
             {name.id}:{name.from}: <br />
             Message: {name.text}
           </p>
           
           <button>EDIT</button>
           <br />
           <button onClick={() => deleteMessageButton(name.id)}>X</button>
         </div>
       );
       
      })
     }
   </div>
 );
}

export default BoxChat
