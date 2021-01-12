import React from "react"


function Task({
                  task,
                  editableTask,
                  onChangeEditableTask,
                  editableTaskText,

              }
) {

    return (

        <li
            data-id={task.id}
            className={`${task.completed ? "task_list done" : "task_list" }
                                         ${+editableTask === +task.id ? "editableTask" : "task_list"}`}
            >

            {+editableTask === +task.id
                ?
                <input
                    onChange={onChangeEditableTask}
                    type="text"
                    value={editableTaskText}/>
                :


                <p className="p_list_field">{task.description}</p>
            }

            <div className="buttons_wrapper">

                {+editableTask === +task.id
                    ?
                    <button data-btn="confirmEdit"
                            className="confirmEdit">Complete</button>
                    :
                    <>
                        <button data-btn="delete"
                                className="task_list_delete_btn">Delete
                        </button>
                        <button data-btn="done"
                                className="task_list_done_btn">
                            {task.completed ? "Undone" : "Done"}</button>
                        <button
                            data-btn="edit"
                            className={"task_list_edit_btn"}
                        >Edit
                        </button>
                    </>
                }

            </div>
        </li>
    )

}

export default Task


