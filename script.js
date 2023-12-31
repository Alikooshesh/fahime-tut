const todoListWrapper = document.getElementById("todoList-wrapper")
const todoInp = document.getElementById("todo-inp")
const listAction = document.getElementById("listAction-btn")

let todoList = []

let editTodoStatus = false
let editTodoId = null

function addNewTodo(todoText){
    const newTodoObj = {
        id : Date.now(),
        text : todoText
    }

    todoList.push(newTodoObj)
    render()
}

function deleteTodo(todoId){
    todoList = todoList.filter(item => item.id !== todoId)
    render()
}

function updateTodo(todoId , newText){
    // let tempTodoList = []

    // todoList.forEach(item =>{
    //     if(item.id !== todoId){
    //         tempTodoList.push(item)
    //     }else{
    //         item.text = newText
    //         tempTodoList.push(item)
    //     }
        
    // })

    // todoList = tempTodoList
    // render()

    todoList = todoList.map(item => {
        if(item.id !== todoId){
            return item
        }else{
            item.text = newText
            return item
        }
    })

    render()

    editTodoStatus = false
    changeSubmitBtnStatus()

}

//// Dom

function addBtnClickHandler(){
    addNewTodo(todoInp.value)
    todoInp.value = ""
}

function deleteBtnClickHandler(todoId){
    deleteTodo(todoId)
}

function editBtnClickHandler(todoId){
    // let newTodoText = prompt(`edit todo id : ${todoId}`)
    // updateTodo(todoId , newTodoText)

    editTodoStatus = true
    editTodoId = todoId
    changeSubmitBtnStatus()
}

function render(){
    let temp = ""

    todoList.forEach(item => {
        temp += `
        <div class="flex items-center justify-between gap-2 border">
                <p>${item.text}</p>
                <div class="flex items-center gap-1">
                    <button onclick="deleteBtnClickHandler(${item.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                          </svg>
                    </button>
    
                    <button onclick="editBtnClickHandler(${item.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg>
                    </button>
                </div>
            </div>
            `
    })

    todoListWrapper.innerHTML = temp
}

function changeSubmitBtnStatus(){

    if(editTodoStatus){
        listAction.innerHTML = "Update todo"
    }else{
        listAction.innerHTML = "Add todo"
    }

}

listAction.addEventListener('click',()=>{
    if(editTodoStatus){
        console.log("edit handled")
        updateTodo(editTodoId,todoInp.value)
    }else{
        console.log("add handled")
        addBtnClickHandler()
    }
})


changeSubmitBtnStatus()