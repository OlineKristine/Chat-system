/*
Keep track of connected users in the chat
  A user should have a unique identifier (e.g. email or a username), otherwise
  they should not be allowed to join
A user also needs to be able to leave
Keep a record of all the messages
Let users send a message to the chat
A message need to contain: A message, a send date and an author
Search within messages
By content and by author
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
//We might have to use the EventListener method
let messages = []
  module.writeMessage = function ChatMessage(message, user) {
        this.message = message
        this.user = users
        this.createdAt = new Date()
      }

      messages.push()

      console.log('Messages', messages)

//search within messages
  module.searchMessage = function ChatMessage (message, user) {
  let keyword = "World"
      let results = messages.filter(m => {
      // does this current message match what I'm looking for
      /* direct keyword:
        return m.message ==keyword
      */
        return m.message.indexOf(keyword) !== -1
      })
      console.log('Message results', results)
    }


return module
})();


/*
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Checking for words in messages</title>
    <script type="text/javascript">

      let messages = []
      function ChatMessage(message, user) {
        this.message = message
        this.user = users
        this.createdAt = new Date()
      }
      let newMessage1 = new ChatMessage('Hello World', 'Rina')
      let newMessage2 = new ChatMessage('Wazzup World', 'Rina')
      let newMessage3 = new ChatMessage('Goodbye World', 'Rina')
      let newMessage4 = new ChatMessage('2', 'Rina')
      messages.push(newMessage1)
      messages.push(newMessage2)
      messages.push(newMessage3)
      messages.push(newMessage4)
      console.log('All messages', messages)
      let keyword = "World"
      let results = messages.filter(m => {
      // does this current message match what O'm looking for
      /* direct keyword:
        return m.message ==keyword

        return m.message.indexOf(keyword) !== -1
      })
      console.log('Message results', results)
    </script>

  </head>
  <body>

  </body>
</html>



*/












/*different arrays for different functions,
 e.g. an array for chat messages, for usernames etc.
=======
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
    console.log ('User joined Chat: ', user)
  }
}
return module
})()

//module.joinChat('Rina')

different arrays for different functions,
 e.g. an array for chat messages, for usernames etc.
  arr.forEach(function(users)){
  if (!user == users){
        console.log('user joined chat', user);
        users.push(user)
      }
    }
  }
*/
