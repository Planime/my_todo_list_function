import React from "react";


function Tabs(props) {
    return (
        <div onClick={props.onClickTabsHandler}
             className="tabs_wrapper">
            <button
                data-tab="all"
                className={props.currentTab === "all" ? "tab activeTav" : "tab"}
            >All
            </button>
            <button
                data-tab="completed"
                className={props.currentTab === "completed" ? "tab activeTav" : "tab"}
            >Completed
            </button>
            <button
                data-tab="uncompleted"
                className={props.currentTab === "uncompleted" ? "tab activeTav" : "tab"}
            >Uncompleted
            </button>
        </div>
    )
}

export default Tabs