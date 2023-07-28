


const SinglaMessage = ({ allData, setAllData }) => {
    const handleDeleteClick = (id) => {
        fetch(`https://olha-danylevska-chat-server.onrender.com/messages/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => setAllData(data))
            .catch(error => console.error(error));
    }

    const handleLatestClick = () => {
        fetch(`https://olha-danylevska-chat-server.onrender.com/messages/latest`)
            .then(res => res.json())
            .then(data => setAllData(data))
            .catch(error => console.error(error))
    }
    return (
        <div className="message-wrapper">
            <div className="top-line"></div>
            <h2>Message history</h2>
            <button onClick={handleLatestClick} className="latest-button">Show Latest 10 Messages</button>
            {allData.length > 0 && allData.map(message => {
                return (<div key={message.id} className="message-holder">
                    <div className="tex-holder">
                        <p>{message.text}</p>
                    </div>
                    <div className="from-holder">
                        <p className="lable-from">from</p>
                        <p className="from">{message.from}</p>
                    </div>
                    <p className="time">{message.timeSent && message.timeSent}</p>
                    <button className="delete" onClick={() => { handleDeleteClick(message.id) }}>Delete Message</button>
                </div>)
            })}
        </div>
    )
}

export default SinglaMessage