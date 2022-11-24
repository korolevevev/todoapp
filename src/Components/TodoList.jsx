import React from "react";
import dayjs from "dayjs";

export const TodoList = ({todoList, setTodoList}) => {
    const lineThroughTodo = (id) => {
        setTodoList(todoList.map((task) => {
            if (task.id === id){
                return {...task, isCompleted: !task.isCompleted}
            }
            return task
        }))
    }

    const deleteTodo = (id) => {
        setTodoList(todoList.filter((task) => {
            return task.id !== id
        }))
    }

    return (
        <div>
            {todoList.map((task, index) => {
                const tickImagePath = task.isCompleted ? '/tick-yellow.png' : '/tick-button.png'
                const statusCSS = task.isCompleted ? ' task-done' : task.deadline === dayjs().format('DD.MM.YYYY') ? ' task-expired' : ''

                return (
                    <div className={'task-container' + statusCSS} key={task.id}>
                            <div>
                                <div className='task-title'>
                                    {task.text}
                                </div>
                                <div className="task-description">
                                    {task.desc}
                                </div>
                            </div>
                            <div className="deadline">
                                Deadline: {task.deadline}
                            </div>
                            <div className="task-actions">
                                <button className='file-button'>
                                    <img src="/file-icon.svg" alt="" onClick={() => alert('Attaching files is not avaliable yet')}/>
                                </button>
                                <button className='done-button' onClick={() => lineThroughTodo(task.id)}>
                                    <img src={tickImagePath} alt=""/>
                                </button>
                                <button className='delete-button' onClick={() => deleteTodo(task.id)}>
                                    <img src="/delete-button.png" alt=""/>
                                </button>
                            </div>
                    </div>
                )
            })}
        </div>
    )

}


