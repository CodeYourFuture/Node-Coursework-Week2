import { useState } from "react"
import SinglaMessage from "./SingleMessage"


const FormToSend = ({ allData, setAllData }) => {
    const [text, setText] = useState("")
    const [id, setId] = useState("")
    const [from, setFrom] = useState("")

    const fetchingData = () => {
        fetch("https://olha-danylevska-chat-server.onrender.com/messages")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setAllData(data)
                console.log({ allData })
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newMessage = { text, from }
        fetch("https://olha-danylevska-chat-server.onrender.com/messages", {
            method: "POST",
            headers: { "Content-Type": "aplication/json" },
            body: JSON.stringify(newMessage)
        })
            .then(() => {
                fetchingData()
                console.log(newMessage)
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="text">Text Message</label>
                    <input name="text" id="text" value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="from">From</label>
                    <input name="from" id="from" value={from} onChange={(e) => setFrom(e.target.value)} />
                </div>
                <div>
                    <button >Send my message</button>
                </div>
            </form>
            <SinglaMessage allData={allData} setAllData={setAllData} from={from} id={id} text={text} />
        </div>

    )
}

export default FormToSend