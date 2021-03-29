const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    doneList = document.querySelector(".js-doneList");

const TODOS_LS = 'toDos',
DONE_LS = 'done';

let toDos = [];
let done = [];


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode,
    parent = li.parentNode;
    parent.removeChild(li);
    const state = parent.querySelector('span').innerText;
    if (state === 'todo') {
        const cleanToDos = toDos.filter(function filterFn(toDo) {
            return toDo.id !== parseInt(li.id);
        });
        toDos = cleanToDos;;
    } else {
        const cleanDone = done.filter(function filterFn(done) {
            return done.id !== parseInt(li.id);
        });
        done = cleanDone;
    }
    saveToDos();
}

function doneToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const doneToDos = toDos.filter(function filterFn(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = doneToDos;
    const newId = done.length + 1,
    text = li.querySelector('span').innerText;
    // const doneObj = {
    //     'text': text,
    //     'id': newId
    // };
    // done.push(doneObj);

    paintToDo(text, 'done');
    saveToDos();
}

function returnToDo(event){
    const btn = event.target;
    const li = btn.parentNode,
        parent = li.parentNode;
    const text = li.querySelector('span').innerText;
    deleteToDo(event);
    paintToDo(text, 'toDo');
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(DONE_LS, JSON.stringify(done));
}

function paintToDo(text, toDoOrDone){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const returnBtn = document.createElement("button");

    delBtn.innerText = "😈";
    delBtn.style.border = "none";
    delBtn.style.backgroundColor = "inherit";
    delBtn.addEventListener("click", deleteToDo);
    doneBtn.innerText = "😇"
    doneBtn.style.border = "none";
    doneBtn.style.backgroundColor = "inherit";
    doneBtn.addEventListener("click", doneToDo);
    returnBtn.innerText = "⏪"
    returnBtn.style.border = "none";
    returnBtn.style.backgroundColor = "inherit";
    returnBtn.addEventListener("click", returnToDo);
    const span = document.createElement("span");
    span.innerText = text;
    const toDoNewId = toDos.length + 1,
    doneNewId = done.length + 1;
    if (toDoOrDone ==='toDo'){
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(doneBtn);
    li.id = toDoNewId;
    toDoList.appendChild(li);
    const toDoObj = {
        'text': text,
        'id': toDoNewId
    };
    toDos.push(toDoObj);
    } else {
        li.appendChild(span);
        li.appendChild(delBtn);
        li.appendChild(returnBtn);
        li.id = doneNewId;
        doneList.appendChild(li);
        const doneObj = {
            'text': text,
            'id': doneNewId
        }
        done.push(doneObj);
}
    saveToDos()
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue, 'toDo');
    toDoInput.value = "";

}


function loadToDos(){
    const loadedToDo = localStorage.getItem(TODOS_LS);
    const loadedDone = localStorage.getItem(DONE_LS);

    if (loadedToDo !== null){
        const parsedToDos = JSON.parse(loadedToDo);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text, 'toDo');
        })
    }
    if (loadedDone !== null){
        const parsedDone = JSON.parse(loadedDone);
        parsedDone.forEach(function (done){
            paintToDo(done.text, 'done')

        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();