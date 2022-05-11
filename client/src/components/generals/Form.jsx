import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import "../../style/form.css";
const Form = () => {
  const context = useContext(UserContext);

  return (
    <>
      <article className="form_main">
        <section className="form_cont">
          <form className="form" onSubmit={(e) => context.formHandler(e)}>
            <div>
              <input
                className="form_input"
                placeholder="Name..."
                onChange={(event) => context.inputHandler(event, 20)}
                onPaste={(e) => e.preventDefault()}
                value={context.nameInput}
              ></input>
              <span style={{ color: "red" }}>{context.nameErrorMessage}</span>
            </div>

            <textarea
              className="form_input textarea"
              placeholder="Message..."
              rows={6}
              onChange={(event) => context.inputHandler(event, 100)}
              value={context.textInput}
            ></textarea>
            <span style={{ color: "red" }}>{context.textErrorMessage}</span>
            <button className="form_btn" type="submit">
              Submit
            </button>
          </form>
        </section>

        <section className="search_cont">
          <div className="search_div">
            <input
              type="text"
              className="search_input"
              placeholder="Search by ID..."
              value={context.nameSearch}
              onChange={(e) => context.setnameSearch(e.target.value)}
            />
            <button className="search_btn" onClick={context.nameHandler}>
              Search Name
            </button>
            <button
              className="search_btn cancel_btn"
              onClick={() => {
                context.setMessages(context.data);
                context.setSearchErrorMessage("");
                context.resetHandler();
              }}
            >
              Cancel
            </button>
          </div>
        </section>
        <span style={{ color: "red" }}>{context.searchErrorMessage}</span>
      </article>
    </>
  );
};

export default Form;
