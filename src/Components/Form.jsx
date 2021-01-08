import React from "react";


function Form({setInputText, setTaskList, taskList, inputText}) {

    function onchangeInputHandler(event) {
        setInputText(event.target.value)

    }

    function onSubmitHandler(e) {
        e.preventDefault();
        setTaskList([
            {
                id: Math.random(),
                completed: false,
                inputText: inputText || "empty task",
                isEdit: false
            },
            ...taskList
        ]);
        setInputText('')
    }


    return (
        <form
            onSubmit={onSubmitHandler}
            className="form_main">
            <h2 className="form_title">To Do List</h2>
            <input
                value={inputText}
                onChange={onchangeInputHandler}
                className="form_input" type="text"/>
            <button
                className="form_submit">Submit
            </button>
        </form>
    )
}


export default Form