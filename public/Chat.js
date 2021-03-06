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
      //ADD EVENTLISTENER-THING TO MAKE A LIST OF CONNECTED USERS HERE!
      console.log('User joined Chat: ', user)
  }
}

module.displayUsers = function(user){
  
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

//Messages

let messages = []
//censoring messages before posting

let censoredWords = ["fuck", "bastard"]
let censoredMessages = []

module.postMessage = function (chatMessage){

  let messageCensored = false
  for(let i=0; i < censoredWords.length; i++ ){
    if (chatMessage.message.indexOf(censoredWords[i]) !== -1){
        messageCensored = true
      }
    }

    if (messageCensored){

        console.log('Message was censored: ', chatMessage)
    } else {
        messages.push(chatMessage)
        let newListElement = document.createElement('li')
        newListElement.innerHTML = chatMessage.message
        let messageList = document.querySelector('#message-list')
        messageList.appendChild(newListElement)

        console.log('You wrote: ', chatMessage)

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
      let searchResultsDisplay = document.querySelector('#result-list')
      let html = ''
      results.forEach(result => {
        html += `<li>${result.message}</li>`
      })
      searchResultsDisplay.innerHTML = html
    }

   



return module
})();


function chatMessage (message, user){
    this.message = message
    this.user = user
    this.date = new Date()
}

let form = document.querySelector('#message-form')
form.addEventListener('submit', function(event){
  event.preventDefault()

  let input = document.querySelector('#post-new-message')
  if (input.value != ''){
    Chat.postMessage(new chatMessage(input.value, 'testingUser'))

}

  input.value=''

})

let searchForm = document.querySelector('#search-message-form')
searchForm.addEventListener('submit', function(searchEvent){
  searchEvent.preventDefault()
  
  let searchInput = document.querySelector('#search-messages')
  if (searchInput.value != ''){
    Chat.searchMessage(searchInput.value)
  }
  searchInput.value = ''
})
