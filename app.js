const cols = document.querySelectorAll ( ".col")

document.addEventListener("keydown", (event) => {  
    event.preventDefault () // отменить дефолтное поведение, что бы когда пробел нажимал не слетал замок  // keydown событие срабатывает когда нажата кнопка
if (event.code.toLowerCase() === "space") {
    setRandomColors()
}
})


document.addEventListener ("click", event => {
    const type = event.target.dataset.type // event.target.dataset.type датасет хранит объект всех дата атрибутов которые есть, то есть если мы кликаем туда где нету дата тайпов то пустое значени, а если на кнопку то получаем обект у которого есть тайп

    if (type === "lock") {
        const node = 
        event.target.tagName.toLowerCase() === "i"
            ? event.target
            : event.target.children[0]

        node.classList.toggle ("fa-lock-open")
        node.classList.toggle ("fa-lock")
    } else if (type === "copy") {
        copyToClickboard(event.target.textContent)
    }
}) 


function gerenerateRandomColor() {
    // RGB
    // ff0000 красный
    // 00ff00 зеленый 
    // 0000ff синий
    const hexCodes = "0123456789ABCDEF"
    let color = ""
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)] // math.floor округление к меньшему числу
    }
    return "#" + color
}

function copyToClickboard(text) {
    return navigator.clipboard.writeText (text)
}


function setRandomColors () {
    const colors = []
    cols.forEach((col) => {  //forEach выполняет функцию
        const isLocked = col.querySelector("i").classList.contains ("fa-lock") 
        const text =  col.querySelector ("h2")
        const button =  col.querySelector ("button")
        const color = gerenerateRandomColor () // я подключил в html chroma что то там, он автоматически делает рандомные цвета без функуции которую я создал выше
       
        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        colors.push(color)

        text.textContent = color
        col.style.background = color
        setTextColor(text, color)
        setTextColor(button, color)
    } )

updateColorsHash (colors)

}

function setTextColor (text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? "black" : "with" // если luminance больше 5и то черный, меньше то белый
}

function updateColorsHash (colors = []) {
    document.location.hash = colors.toString()
}

setRandomColors ()