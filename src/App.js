import React, {useState, Fragment, useEffect} from "react"
import './App.css';
import Form from "./Components/Form"
import List from "./Components/List"
import Tabs from "./Components/Tabs"




function App() {






    // Declare state variables
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('taskList')) || []);
    const [currentTab, setCurrentTab] = useState("all");
    const [inputText, setInputText] = useState('');
    const [editableTask, setEditableTask] = useState('');
    const [editableTaskText, setEditableTaskText] = useState('');



    useEffect(()=>{
        window.addEventListener("unload", handleUnload);
        return () => {
            window.removeEventListener("unload", handleUnload)
        }
    });


    function onclickTaskContainerHandler(e) {

        let btnAttr = e.target.dataset.btn;
        if (!btnAttr) {
            return
        }

        let taskId = e.target.closest("[data-id]").dataset.id;

        switch (btnAttr) {
            case "edit":
                setEditableTaskText(taskList.find(task => +task.id === +taskId).inputText);
                setEditableTask(taskId);
                break;
            case "confirmEdit":
                taskList.find(task => +task.id === +taskId).inputText = editableTaskText;
                setEditableTask(null);
                break;

            case "delete":
                setTaskList(taskList.filter((task) => {
                    return task.id !== +taskId
                }));
                break;
            case "done":
                const newList = taskList.map(({id, completed, inputText}) => {
                    return {
                        inputText,
                        id,
                        completed: id === +taskId ? !completed : completed
                    }

                });
                setTaskList(newList);
                break;
        }

    }

    function onChangeEditableTask(e) {
        setEditableTaskText(e.target.value)
    }


    function onClickTabsHandler(e) {
        let attr = e.target.dataset.tab;


        if (attr === "all") {
            setCurrentTab("all")
        }

        if (attr === "completed") {
            setCurrentTab("completed")
        }

        if (attr === "uncompleted") {
            setCurrentTab("uncompleted")
        }

    }


    function handleUnload () {
        console.log("function unloaded shit")
        localStorage.setItem("taskList", JSON.stringify(taskList))
    };



    return (
        <Fragment>
            <Form
                taskList={taskList}
                setTaskList={setTaskList}
                inputText={inputText}
                setInputText={setInputText}/>
            <Tabs
                currentTab={currentTab}
                onClickTabsHandler={onClickTabsHandler}/>
            <List
                onChangeEditableTask={onChangeEditableTask}
                editableTaskText={editableTaskText}
                setEditableTask={setEditableTask}
                editableTask={editableTask}
                taskList={taskList}
                currentTab={currentTab}
                onclickTaskContainerHandler={onclickTaskContainerHandler}
            />
        </Fragment>
    );
}

export default App;
