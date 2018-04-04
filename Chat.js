/*
Keep track of connected users in the chat
  A user should have a unique identifier (e.g. email or a username), otherwise
  they should not be allowed to join
A user also needs to be able to leave
Keep a record of all the messages
Let users send a message to the chat
A message need to contain: A message, a send date and an author
Search within messages by content and by author
Censor messages containing certain words
Censored should still be saved

*/
var Chat = (function () {
 // Users
let users = []

let module = {}
module.joinChat = function (user) {
  console.log('User is trying to join: ', user)
  let userAlreadyConnected = false

  for(let i = 0; i < users.length; i++) {
    //Check if the user who is joining already is connected
    if (users[i] == user) {
      userAlreadyConnected = true
    }
  }
    if (userAlreadyConnected) {
      console.log('User already connnected: ', user)
  } else {
  //Add user to connected users
      users.push(user)
      console.log('User joined Chat: ', user)
  }
}

// how to delete user
module.leaveChat = function (user) {
  console.log('User is trying to leave: ' , user)

  let userAlreadyConnected = false
  for(let i = 0; i < users.length; i++){
    if (users[i] = user){
      userAlreadyConnected = true
    }
  }
    if (userAlreadyConnected){
      console.log('User left chat: ', user)
      users.splice(user)
    }
  }

//Write messages

// let messages = []
// function ChatMessage (message, user, date){
//     this.message = message
//     this.user = user
//     this.date = new Date()
//   }
//  messages.push(ChatMessage)
//  console.log('You wrote', ChatMessage)
//
// }
let messages = []
function ChatMessage (message, user, date){
    this.message = message
    this.user = user
    this.date = new Date()
  }

//censoring messages before posting
let censoredWords = ["fuck", "bastard"]
let censoredMessages = []
module.postMessage = function (ChatMessage){

  let messageCensored = false
  for(let i=0; i < censoredWords.length; i++ ){
    if (ChatMessage.indexOf(censoredWords[i]) !== -1){
        messageCensored = true
      }
    }

    if (messageCensored){
        censoredMessages.push (ChatMessage)
        console.log('Message was censored: ', ChatMessage)
    } else {
        messages.push(ChatMessage)
        console.log('You wrote: ', ChatMessage)

  }
}


//search in messages

//let keyword = []
    module.searchMessage = function (searchMessage) {
      let results = messages.filter(theMessage => {


      // does this current message match what O'm looking for
      /* direct keyword:
        return m.message ==keyword
      */

        return theMessage.message.indexOf(searchMessage) !== -1
      })
      console.log('Message results = ', results)
    }



return module
})();

//so maybe if we divided the censoring and the posting of messages into to and then said in this one,
//if it contains censored words it is Chat.censorMessage() and if not it is Chat.postMessage() (as the last part is now)??
let form = document.querySelector('#message-form')
form.addEventListener('submit', function(event){
  event.preventDefault()

  let input = document.querySelector('#post-new-message')
  if (input.value != ''){
    Chat.postMessage(input.value)
    let newListElement = document.createElement('li')
    newListElement.innerHTML = input.value
    let messageList = document.querySelector('#message-list')
    messageList.appendChild(newListElement)
}

  input.value=''

})

