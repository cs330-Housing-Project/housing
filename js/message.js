let msgArr = [
  ["Hello", "Hi", "Are you looking for a roommate?", "Yes!", "For what address? How many people? What is the price?",
  "5 people at 1234 Sheridan Road. It's $1000", "I will let you know!"],

  ["Hey", "Hey what's up", "Nothing much. Just looking for a roommate", "Me too! where would you like to live",
  "preferably north campus under $1000", "Let's look into that!"],

  ["Hi", "Hi", "I am trying to sublet in the spring", "I can offer you a sublet for $600",
  "I'll get back to you soon", "Thank you!"],

  ["Hello", "Hi", "I'm looking for a subletter", "I can be your subletter in the suummer!",
  "Really, awesome. It's $900 per month", "I'll get back to you ASAP'"],

  ["Hey", "Hey", "We should contact the landlord soon", "I agree, we want to secure our lease", "Can you message her",
  "Sure, I will ASAP", "Sounds great"],

  ["Hello", "Hey", "I'm looking for  a roommate this fall", "I can be your roommate", "Really? cool!",
  "Yep! I'll send you the details soon", "Sounds good!"],

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
