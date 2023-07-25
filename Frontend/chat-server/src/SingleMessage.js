


const SinglaMessage = ({ allData, setAllData }) => {

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