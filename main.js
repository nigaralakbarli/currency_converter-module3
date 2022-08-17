const group1btns = document.querySelectorAll(".group1 button");
const group2btns = document.querySelectorAll(".group2 button");

const inputs = document.querySelectorAll("input");

let clicked1 = null;
let clicked2 = null;

let input1 = document.querySelector(".first");
let input2 = document.querySelector(".second");

const p1 = document.querySelector(".first + p");
const p2 = document.querySelector(".second + p");

function currentValyuta(data, btn) {
    const value = data.rates[clicked2];
    if (btn == "from") {
        input1.value = Number(input2.value.replace(",", ".")) * value;
    }
    else if (btn == "to") {
        input2.value = Number(input1.value.replace(",", ".")) / value;
    }

    inputs.forEach(input => {
        input.addEventListener("input", (e) => {
            if (e.target.classList.contains("first")) {
                const inp1Val = e.target.value;
                input2.value = Number(inp1Val.replace(",", ".")) * value;
            }
            else if (e.target.classList.contains("second")) {
                const inp2Val = e.target.value;
                input1.value = Number(inp2Val.replace(",", ".")) / value;
            }
        })
    })
    p1.innerText = `1 ${clicked1} = ${value} ${clicked2}`;
    p2.innerText = `1 ${clicked2} = ${1 / value} ${clicked1}`;
    
}
function sendRequest(btn) {
    clicked1 = document.querySelector(".group1 .default").innerText;
    clicked2 = document.querySelector(".group2 .default").innerText;
    //console.log(clicked1, clicked2);
    if (clicked1 == clicked2) {
        input2.value = input1.value;
        p1.innerText = `1 ${clicked1} = 1 ${clicked2}`;
        p2.innerText = `1 ${clicked1} = 1 ${clicked2}`;
        return;
    }

    fetch(`https://api.exchangerate.host/latest?base=${clicked1}&symbols=${clicked2}`)
        .then(response => response.json())
        .then(data => {
            currentValyuta(data, btn);
        })
        .catch(err => {
            console.log(err)
            alert("Something went wrong :(");
        })
}

group1btns.forEach(btn1 => {
    btn1.addEventListener("click", (e) => {
        group1btns.forEach(btn1 => {
            btn1.classList.remove("default");
        })
        e.target.classList.add("default");
        sendRequest("from");
    })
})

group2btns.forEach(btn2 => {
    btn2.addEventListener("click", (e) => {
        group2btns.forEach(btn2 => {
            btn2.classList.remove("default");
        })
        e.target.classList.add("default");
        sendRequest("to");
    })
})
sendRequest();