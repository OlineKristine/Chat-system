// Include Express module
const express = require('express')
const session = require('express-session')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('sqlite:./database.sqlite', {
    logging: console.log
})

// Create an instance of Express
const app = express()

// Handle JSON requests
app.use(express.json())

// Serve static files from public folder
app.use(express.static('public'))

//setting up express session
app.use(session({
    secret: 'idk something random'
}))

const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.json({
            message: 'You need to be authenticated'
        })
    }
    next()
}
// Simple in-memory storage
// Note: Will be lost when script is terminated

// let messages = []

//message model
const ChatMessage = sequelize.define('message', {
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//user model
// const User = sequelize.define('user', {
//     username: {
//         type: Sequelize.STRING,
//         allowNull: false
//     } , 
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })

// User.hasMany(ChatMessage)
// ChatMessage.belongsTo(User)


// GET /api/messages endpoint
// Returns all messages
app.get('/api/messages', (req, res) => {
    ChatMessage.findAll()
        .then(messages => {
            // Return a JSON response to the GET request
            res.json(messages)
        })
})

// GET /api/messages/:id endpoint
// Returns a specific message 
app.get('/api/messages/:id', (req, res) => {
    // Find first message that matches the ID from the route
    // Documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    let query = {
        where: {
            id: req.params.id
        }
    }

    Message.findOne(query)
        .then(chatMessage => {

            // If a message is found, display it
            // Otherwise return a 404 with a not found message
            if (!chatMessage) {
                res.status(404).json({
                    message: 'Message not found!'
                })
            }
            res.json(chatMessage)
        })
})

// POST /api/messages endpoint
// Creates a new message
app.post('/api/messages', (req, res) => {
    // Simple validation for text property
    if (!req.body.text) {
        // "return" ends the script here
        // with the JSON response
        return res.json({
            message: 'Missing text data'
        })
    }

    // // Construct a simple message object
    // let message = {
    //     id: messages.length + 1,
    //     text: req.body.text,
    //     createdAt: new Date()
    // }

    // // Push the message object into the messages array
    // messages.push(message)

    // Return a status 201 (created) response
    res.status(201).json({
        status: 'OK'
    })
})

// PUT /api/messages/:id endpoint
// Updates a message
app.put('/api/messages/:id', (req, res) => {
    // Have the message been updated?
    let updated = false

    // Go through the messages
    // and update the specific message with the ID
    // from the route parameter
    messages.map(m => {
        if (m.id == req.params.id) {
            m.text = req.body.text
            updated = true
        }
    })

    // Different responses depending on whether
    // or not the message was updated
    if (updated) {
        res.json({
            message: 'Message updated'
        })
    } else {
        res.status(400).json({
            message: 'Error updating message'
        })
    }
})

// DELETE /api/messages/:id
// Deletes a message from the array
app.delete('/api/messages/:id', (req, res) => {
    // Keep all messages except the one specified
    // in the route parameter
    messages = messages.filter(m => m != req.params.id)

    res.json({
        message: 'OK'
    })
})

// Start the server on port 3000
// Access API through: http://localhost:3000 or http://127.0.0.1:3000
sequelize.sync({
    force: true
}).then(() => {
    app.listen(3000, () => {
        console.log('Server is running')
    })
})