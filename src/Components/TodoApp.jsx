import React, {useEffect, useState} from "react";
import {TodoList} from "./TodoList";
import {Clock} from "./Clock";
import dayjs from "dayjs";

export const TodoApp = () => {
    const [todoList, setTodoList] = useState([
        {id: 1, text: 'Complete a Todo List task', desc: 'This is a description for the task. Lorem ipsum dolor sit amet.', deadline: '24.09.2861', isCompleted: true},
        {id: 2, text: 'Made by Ilya Korolev', desc: 'Description', deadline: '15.07.2023', isCompleted: false},
        {id: 3, text: 'Add a new task', desc: 'Description', deadline: dayjs().format('DD.MM.YYYY'), isCompleted: false},
        {id: 4, text: 'Tick an added task', desc: 'Wabba lubba dub dub', deadline: '13.12.2022', isCompleted: false},
        {id: 5, text: 'Untick an added task', desc: 'Description', deadline: '01.01.2023', isCompleted: false},
        {id: 6, text: 'Delete a task', desc: 'Description', deadline: dayjs().format('DD.MM.YYYY'), isCompleted: false}])

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [newTaskDesc, setNewTaskDesc] = useState('')
    const [newTaskDeadLine, setNewTaskDeadline] = useState('')

    const [showTodoBlock, setShowTodoBlock] = useState(false)

    useEffect(() => {
        JSON.parse(localStorage.getItem('todoList'))
            ? Math.abs(JSON.parse(localStorage.getItem('todoList')).length - todoList.length) <= 1
            ? localStorage.setItem('todoList', JSON.stringify(todoList))
            : console.log('No changes in length')
            : localStorage.setItem('todoList', JSON.stringify(todoList))
    }, [todoList])

    useEffect(() => {
        setTodoList(JSON.parse(localStorage.getItem('todoList')))
    }, [])

    const onChangeTodoTitle = (event) => {
        setNewTaskTitle(event.target.value)
    }

    const onChangeTodoDesc = (event) => {
        setNewTaskDesc(event.target.value)
    }

    const onChangeTodoDeadline = (event) => {
        let dl = dayjs(event.target.value)
        setNewTaskDeadline(dl.format('DD.MM.YYYY'))
    }

    const addTodo = () => {
        setTodoList([
            {id: Math.random(), text: newTaskTitle, desc: newTaskDesc, deadline: newTaskDeadLine, isCompleted: false},
            ...todoList,
        ])
        setNewTaskTitle('')
        setNewTaskDesc('')
        setNewTaskDeadline('')
    }

    const onShowAddTodoBlock = () => {
        setShowTodoBlock(!showTodoBlock)
    }

    return (
        <div className='container'>
            <div className="title-container">
                <div className='title'>Todoo</div>
                <div className='app-description'>Manage your tasks in a couple of clicks</div>
                <Clock/>
                <button className='add-todo-button' onClick={onShowAddTodoBlock}>+</button>
            </div>
            {showTodoBlock && <div className="add-todo-block">
                <div className='input-block'>
                    <div>
                        <input id='title-input' type="text" onChange={onChangeTodoTitle} value={newTaskTitle} placeholder='Title'/>
                        <input id='deadline-input' type="date" onChange={onChangeTodoDeadline} placeholder={dayjs().format('DD.MM.YYYY')}/>
                    </div>
                    <div><input id='desc-input' type="text" onChange={onChangeTodoDesc} value={newTaskDesc} placeholder='Description' /></div>
                </div>
                <div>
                    <button className='new-task-button' onClick={() => addTodo()}>Add</button>
                </div>
            </div>}
            <div className='todo-list'>
                <TodoList todoList={todoList} setTodoList={setTodoList}/>
            </div>
        </div>
    )
}