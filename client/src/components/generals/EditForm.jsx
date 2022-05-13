import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import "../../style/editForm.css";

const EditForm = () => {
  const context = useContext(UserContext);
  return (
    <article className="edit_form">
      <section className="edit_form_cont">
        <form className="form" onSubmit={(e) => context.formHandler(e, "edit")}>
          <div>
            <input
              className="form_input"
              placeholder="Name..."
              onChange={(event) => context.inputHandler(event, 20, "edit")}
              onPaste={(e) => e.preventDefault()}
              value={context.editInput}
            ></input>
            <span style={{ color: "red" }}>{context.nameErrorMessage}</span>
          </div>

          <textarea
            className="form_input textarea"
            placeholder="Message..."
            rows={6}
            onChange={(event) => context.inputHandler(event, 100, "edit")}
            value={context.editText}
          ></textarea>
          <span style={{ color: "red" }}>{context.textErrorMessage}</span>
          <button className="form_btn" type="submit">
            Submit
          </button>
        </form>
        <button
          className="search_btn cancel_btn"
          onClick={() => {
            context.resetHandler();
            context.setShowEdit((prev) => !prev);
          }}
        >
          Cancel
        </button>
      </section>
    </article>
  );
};

export default EditForm;
