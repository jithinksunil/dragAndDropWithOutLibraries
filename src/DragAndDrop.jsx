import React, {useState} from 'react'
import './App.css'

function DragAndDrop() {

    const [tasks,setTasks] = useState({
        wip: [
        
            {
                id: 1,
                name: "Learn Angular",
                category: "wip",
                bgcolor: "yellow"
            }, {
                id: 2,
                name: "React",
                category: "wip",
                bgcolor: "pink"
            }, {
                id: 3,
                name: "Vue",
                category: "wip",
                bgcolor: "skyblue"
            },
            {
                id: 4,
                name: "Vudsfsfsde",
                category: "wip",
                bgcolor: "red"
            }
        ],
        completed: []
    })
    

    let dragStartIndex=undefined
    let dragEnterIndex=undefined

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const onDragStart = (e,index, startColumn) => {
        e.dataTransfer.setData("startColumn", startColumn)
        dragStartIndex=index
        console.log(index,startColumn);
    }
    
    const onDragEnter = (e, index) => {
        e.preventDefault()
        dragEnterIndex=index
        console.log(index);
    }

    const onDrop = (e, endColumn) => {
        e.preventDefault()
        let startColumn=e.dataTransfer.getData("startColumn")
        console.log(startColumn);
        let task=tasks[startColumn][dragStartIndex]
        console.log(startColumn,endColumn,dragStartIndex,dragEnterIndex);
        
        if(startColumn===endColumn){
            if(dragEnterIndex===undefined){
                dragEnterIndex=tasks[endColumn].length-1
                console.log(dragEnterIndex);
            }
            
            if(dragEnterIndex>=dragStartIndex){
                tasks[endColumn].splice(dragEnterIndex+1,0,task)
                tasks[startColumn].splice(dragStartIndex,1)
            }
            else{
                tasks[endColumn].splice(dragEnterIndex,0,task)
                tasks[startColumn].splice(dragStartIndex+1,1)
            }
        }
        else{
            if(dragEnterIndex===undefined){
                dragEnterIndex=tasks[endColumn].length
                console.log(dragEnterIndex);
            }
            task.category=endColumn
            tasks[endColumn].splice(dragEnterIndex,0,task)
            tasks[startColumn].splice(dragStartIndex,1)
        }
        setTasks({...tasks})
        
    }
    

    return (
        <div className="container-drag">
            <div className='wip'
                onDragOver={onDragOver}
                onDrop={
                    (e) => {
                        onDrop(e, "wip")
                    }
            }>
                <span className='task-header'>WIP</span>
                {
                tasks.wip.map((task, index) => {
                    return (
                        <div key={index}
                            draggable
                            onDragStart={
                                (e) => {
                                    onDragStart(e, index, "wip")
                                }
                            }
                            onDragEnter={(e)=>{onDragEnter(e,index)}}
                            onDragLeave={(e)=>{ dragEnterIndex=undefined ;console.log('exit');}}
                            className="draggable"
                            style={
                                {backgroundColor: task.bgcolor}
                        }>
                            {
                            task.name
                        }</div>
                    )
                })
            }
            </div>
            <div className='droppable'
                onDragOver={onDragOver}
                onDrop={
                    (e) => {
                        onDrop(e, "completed")
                    }
            }>
                <span className='task-header'>Completed</span>
                {
                    
                tasks.completed.map((task, index) => {
                    return (
                        <div key={index}
                            draggable
                            onDragStart={
                                (e) => {
                                    onDragStart(e, index, "completed")
                                }
                            }
                            onDragEnter={(e)=>{onDragEnter(e,index)}}
                            onDragLeave={(e)=>{ dragEnterIndex=undefined;console.log('exit');}}
                            className="draggable"
                            style={
                                {backgroundColor: task.bgcolor}
                        }>
                            {
                            task.name
                        }</div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default DragAndDrop


    
    
    

    

    