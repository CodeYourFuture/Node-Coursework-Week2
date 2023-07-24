
import { useEffect, useState } from "react"

const SinglaMessage = () => {
    const [allData, setAllData] = useState([])
    useEffect(() => {
        fetch("https://dashboard.render.com/web/srv-civcu7c07sptttj4r9ag/logs/messages")
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                return setAllData(data)
            })
    })

    return (
        <div className="message-wrapper">
            {allData.map(message => {
                return (<div>
                    <p>{message.from}</p>
                    <p>{message.text}</p>
                </div>)
            })}
        </div>
    )
}

export default SinglaMessage