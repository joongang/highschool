const ques=document.querySelector(".ques");
const toDoInput=ques.querySelector("input");
const adList=document.querySelector(".doList");

const doList_LS="dos";
let dos=[];

function saveDos(){
    localStorage.setItem(doList_LS,JSON.stringify(dos));
}

function paintList(text){
    const li=document.createElement("li")
    const del=document.createElement("button");
    del.innerText="X";
    del.addEventListener("dblclick",delList);
    const span=document.createElement("span");
    const ListId=dos.length+1;
    li.id=ListId;
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(del);
    adList.appendChild(li);
    const dosObj={
        text : text,
        id : ListId
    }
    dos.push(dosObj);
    saveDos();
}

function handleList(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintList(currentValue);
    toDoInput.value="";
}

function doListLoad(){
    const toDoList=localStorage.getItem(doList_LS);
    if(toDoList !== null){
        const parsedDos=JSON.parse(toDoList);
        parsedDos.forEach(function(toDo){
            console.log(toDo.text);
            paintList(toDo.text);
        })
    }
}

function delList(event){
    const btn=event.target;
    const li=btn.parentNode;
    adList.removeChild(li);
    const cleanDos=dos.filter(function(toDo){
        return toDo.id !==parseInt(li.id);
    });
    console.log(cleanDos);
    dos=cleanDos;
    saveDos();
}

function init(){
    doListLoad();
    ques.addEventListener("submit", handleList);
}
init();