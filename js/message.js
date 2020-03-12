let msgArr = [
  ["Hello", "Hi", "Are you looking for a roommate?", "Yes!", "For what address? How many people? What is the price?",
  "5 people at 1234 Sheridan Road. It's $1000", "I will let you know!"],

  ["Hey", "Hey what's up", "Are you looking for a roommate?", "Yes!", "For what address? How many people? What is the price?",
  "5 people at 1234 Sheridan Road. It's $1000", "I will let you know!"],

  ["Hello", "Hi", "Are you looking for a roommate?", "Yes!", "For what address? How many people? What is the price?",
  "5 people at 1234 Sheridan Road. It's $1000", "I will let you know!"],

  ["Hello", "Hi", "Are you looking for a roommate?", "Yes!", "For what address? How many people? What is the price?",
  "5 people at 1234 Sheridan Road. It's $1000", "I will let you know!"],

  ["Hello", "Hi", "Are you looking for a roommate?", "Yes!", "For what address? How many people? What is the price?",
  "5 people at 1234 Sheridan Road. It's $1000", "I will let you know!"],

  ["Hello", "Hi", "Are you looking for a roommate?", "Yes!", "For what address? How many people? What is the price?",
  "5 people at 1234 Sheridan Road. It's $1000", "I will let you know!"],

  ["Hello", "Hi", "Are you looking for a roommate?", "Yes!", "For what address? How many people? What is the price?",
  "5 people at 1234 Sheridan Road. It's $1000", "I will let you know!"]

]

function changeMsg(elem) {
  let innerText = ""
  msgArr[Number(elem.value)].forEach((item, i) => {
    if(!(i % 2)){
      innerText += `<div class="float-left sender">${item}</div><br><br>`
    }
    else {
      innerText += `<div class="float-right receiver">${item}</div><br><br>`
    }
  })
  document.getElementById("textMessages").innerHTML = innerText
}
