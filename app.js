const options = document.querySelector(".options")
const addButton = document.querySelector(".input_add > button")
const input = document.querySelector("#input")
const clearButton = document.querySelector(".clear_btn")

// add task
addButton.addEventListener("click",()=>{
    if(input.value == "")return

    localStorage.setItem(`${input.value}`,"add")

    adding(input.value)

    input.value = ""
})

options.addEventListener("click",(e)=>{
    // delete one of task
    if(e.target.classList.contains("fa-circle-xmark") == true){
        localStorage.removeItem(`${e.target.parentNode.previousSibling.textContent}`)
        e.target.parentNode.parentNode.remove()
    }

    //edit task 
    if(e.target.classList.contains("fa-edit") == true){
        let previousFocusValue
        let afterFocusValue
        const p =e.target.parentNode.parentNode.firstChild
        e.target.parentNode.parentNode.firstChild.focus()
        const lip = document.querySelectorAll("ul>li>p")

        console.log(lip);
        previousFocusValue = e.target.parentNode.previousSibling.textContent 
        p.addEventListener("blur",()=>{
            console.log(previousFocusValue,"before");
            afterFocusValue = p.textContent
            console.log(afterFocusValue,"afterr");

            if(previousFocusValue != afterFocusValue) {
            localStorage.removeItem(`${previousFocusValue}`) 
            localStorage.setItem(`${afterFocusValue}`,"add")}
            })
            
    }
    
    // check task
    if(e.target.classList.contains("fa-circle-check") == true){
        localStorage.getItem(`${e.target.parentNode.previousSibling.textContent}`) == "check"? localStorage.setItem(`${e.target.parentNode.previousSibling.textContent}`,"add"):
        localStorage.setItem(`${e.target.parentNode.previousSibling.textContent}`,"check")
        e.target.parentNode.parentNode.firstChild.classList.toggle('clicked')
        e.target.classList.toggle('check')
    }
    
})

// delete all task
clearButton.addEventListener("click",()=>{
    localStorage.clear()
    options.innerHTML = ""
})

//when refresh page 
onload = ()=>{
    if(localStorage){
        for(item in localStorage)
            switch (localStorage.getItem(item)) {
                case "add":
                    adding(item)
                    break;
            
                case "check":
                    adding(item,"clicked","check")
                    break;
                default:
                    return
            }
    }
}

//adding to todo function
function adding(value ,clicked = "" ,check = "" ){
    const divIcons = document.createElement('div')
    const li = document.createElement('li')
    const p = document.createElement('p')
    const checkIcon = document.createElement('i')
    const editIcon = document.createElement('i')
    const closeIcon = document.createElement('i')
    p.innerHTML = value
    p.setAttribute("contenteditable","true")
    p.classList = clicked

    check ? checkIcon.classList.add("fa-regular","fa-circle-check",check):checkIcon.classList.add("fa-regular","fa-circle-check")
    editIcon.classList.add("fa","fa-edit")
    closeIcon.classList.add("fa-regular","fa-circle-xmark")

    divIcons.classList.add("icons")
    divIcons.append(checkIcon,editIcon,closeIcon)
    li.append(p,divIcons)
    options.append(li)

    
}
