 import React from 'react'
 
 const AddMessage = () => {
   return (
     <div>
       <from className="send-text">
         <div className="send-input">
           <label>From</label>
           <input type="text"></input>
           <div className="text-area">
             <label>Text</label>
             <input type="text"></input>
           </div>
         </div>
         <button type="submit">Send</button>
       </from>
     </div>
   );
 }
 
 export default AddMessage
 