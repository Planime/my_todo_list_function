import React, {useState, useEffect} from "react"
import './App.css';
import Form from "./Components/Form"
import List from "./Components/List"
import Tabs from "./Components/Tabs"


function App() {


    // Declare state variables
    const [taskList, setTaskList] = useState([]);
    const [currentTab, setCurrentTab] = useState("all");
    const [description, setDescription] = useState('');
    const [editableTask, setEditableTask] = useState('');
    const [editableTaskText, setEditableTaskText] = useState('');


    useEffect(() => {
        fetch("https://5fec128e573752001730b0f1.mockapi.io/todo")
            .then(response => response.json())
            .then(tasks => setTaskList(tasks))
            .catch((error => console.error(error)))
    }, []);


    function onclickTaskContainerHandler(e) {

        let btnAttr = e.target.dataset.btn;
        if (!btnAttr) {
            return
        }

        let taskId = e.target.closest("[data-id]").dataset.id;

        switch (btnAttr) {
            case "edit":
                setEditableTaskText(taskList.find(task => task.id === taskId).description);
                setEditableTask(taskId);
                break;
            case "confirmEdit":
                const specs = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        description: editableTaskText
                    })
                };

                fetch(`https://5fec128e573752001730b0f1.mockapi.io/todo/${taskId}`, specs)
                    .then(response => response.json())
                    .then(response => setTaskList(taskList.map(task => task.id === response.id ?
                        {
                            ...task, description: response.description
                        } : task)))
                    .then(() => {
                        setEditableTask(null)
                        setEditableTaskText("")
                    });

                break;

            case "delete":
                fetch(`https://5fec128e573752001730b0f1.mockapi.io/todo/${taskId}`, {method: "DELETE"})
                    .then(response => response.json())
                    .then(response => setTaskList(taskList.filter(task => task.id !== response.id)));
                break;

            case "done":
                const completed = taskList.find(task => task.id === taskId).completed;
                const options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        completed: !completed
                    })

                };
                fetch(`https://5fec128e573752001730b0f1.mockapi.io/todo/${taskId}`, options)
                    .then(response => response.json())
                    .then(response => setTaskList(taskList.map(task => task.id === response.id ?
                        {
                            ...task, completed: response.completed
                        } : task)))

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


    return (
        <>
            <Form
                taskList={taskList}
                setTaskList={setTaskList}
                description={description}
                setDescription={setDescription}/>
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
        </>
    );
}

export default App;
