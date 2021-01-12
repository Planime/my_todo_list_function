import React from "react";


function Form({setDescription, setTaskList, taskList, description}) {


    function onchangeInputHandler(event) {
        setDescription(event.target.value)

    }

    function onSubmitHandler(e) {
        e.preventDefault();

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                completed: false,
                description: description || "empty task"
            })
        };

        fetch("https://5fec128e573752001730b0f1.mockapi.io/todo", options)
            .then(response => response.json())
            .then(response => {
                setTaskList([response, ...taskList])
                setDescription('')
            })
            .catch(error => console.error(error))

}


return (
    <form
        onSubmit={onSubmitHandler}
        className="form_main">
        <h2 className="form_title">To Do List</h2>
        <input
            value={description}
            onChange={onchangeInputHandler}
            className="form_input" type="text"/>
        <button
            className="form_submit">Submit
        </button>
    </form>
)
}


export default Form