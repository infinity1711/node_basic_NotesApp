const fs = require('fs')
const chalk = require('chalk')

const getNotes = function getNotes() {
    return 'My Notes';
}

const addNotes = (title, body) => {
    const notes = loadNotes()

    //const duplicateNotes = notes.filter(note => note.title === title)
    const duplicateNote = notes.find(note => note.title === title)
    if (!duplicateNote) {
        notes.push({
            'title': title,
            'body': body
        })
        saveNotes(notes)
        console.log(chalk.green('New Note Successfully saved'))
    }
    else {
        console.log(chalk.red('Note title already taken'))
    }

}

function saveNotes(notes) {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

function loadNotes() {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        const data = JSON.parse(dataJson)
        return data
    }
    catch{
        return []
    }

}

const removeNotes = (title) => {

    const notes = loadNotes()

    const updatedNotes = notes.filter(note => note.title !== title)

    if (updatedNotes.length < notes.length) {
        saveNotes(updatedNotes)
        console.log(chalk.green.inverse('Note successfully removed'))
    }
    else {
        console.log(chalk.red.inverse('No notes found'))
    }
}

const listOfNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes'))
    notes.forEach(note => console.log(chalk.green(note.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
    if (note) {
        console.log(chalk.blue.inverse(note.title))
        console.log(chalk.blue(note.body))
    }
    else{
        console.log(chalk.red.inverse('No notes found with title = > ')+ ' '+ chalk.green(title) )
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listOfNotes: listOfNotes,
    readNote: readNote
}