
import { useEffect } from "react"

const SinglaMessage = ({ allData, setAllData, text, id, from }) => {
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

    useEffect(() => {
        fetchingData()
    }, [text, id, from])

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