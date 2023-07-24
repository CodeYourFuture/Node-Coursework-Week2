
import { useEffect, useState } from "react"

const SinglaMessage = () => {
    const [allData, setAllData] = useState([])
    const fetchingData = () => {
        fetch("https://olha-danylevska-chat-server.onrender.com/messages/0")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setAllData(data)
                console.log({ allData })
            })
    }

    useEffect(() => {
        fetchingData()
    }, [])

    return (
        <div className="message-wrapper">
            {allData.length > 0 && allData.map(message => {
                return (<div key={message.id}>
                    <p>{message.from}</p>
                    <p>{message.text}</p>
                </div>)
            })}
        </div>
    )
}

export default SinglaMessage