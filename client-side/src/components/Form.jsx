import { useState } from "react";
import Button from "react-bootstrap/Button";

function MessageForms() {
  const [message, setMessage] = useState({
    from: "",
    text: "",
  });

  const handleChange = (e) => {
    //const { fieldName, value } = e.target;
    const fieldName = e.target.name;
    const value = e.target.value;
    setMessage((prev) => {
      return { ...prev, [fieldName]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:4500/allMessages", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json)
      .then((data) => data);
  };

  return (
    <form className="container">
      <fieldset>
        <h3 className="">Messages App</h3>
        <div>
          <label>Name </label>
          <input
            onChange={handleChange}
            type="text"
            name="from"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label>Message</label>
          <input
            onChange={handleChange}
            type="text"
            name="text"
            placeholder="Your Message"
          />
        </div>
        <Button onClick={handleSubmit} className="btn-secondary ">
          Send
        </Button>
      </fieldset>
    </form>
  );
}

export default MessageForms;
