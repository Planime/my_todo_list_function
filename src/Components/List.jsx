import React, {Fragment} from "react";
import Task from "./Task"


function List(props) {

    return (
        <ul className="task_container"
            onClick={props.onclickTaskContainerHandler}>

            {/*[{task1}, {task2}, {...}] -> <li>task1<li>, <li>task2<li>*/}
            {props.taskList.filter((task) => {
                if (props.currentTab === "all") return true;
                if (props.currentTab === "completed") return task.completed;
                return !task.completed
            })
                .map((task) => {

                    return (
                        <Task key={task.id}
                              task={task}
                              editableTask={props.editableTask}
                              editableTaskText={props.editableTaskText}
                              onChangeEditableTask={props.onChangeEditableTask}
                        />
                    )

                })
            }
        </ul>
    )
}

export default List