


const SinglaMessage = ({ allData }) => {

    return (
        <div className="message-wrapper">
            <div className="top-line"></div>
            <h2>Message history</h2>
            {allData.length > 0 && allData.map(message => {
                return (<div key={message.id} className="message-holder">
                    <div className="tex-holder">
                        <p>{message.text}</p>
                    </div>
                    <div className="from-holder">
                        <p className="lable-from">from</p>
                        <div className="from-wrapper">
                            <p className="from">{message.from}</p>

                        </div>
                    </div>
                    <p className="time">{message.timeSent && message.timeSent}</p>
                </div>)
            })}
        </div>
    )
}

export default SinglaMessage