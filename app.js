//const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.1.0')
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe: 'remove note with title',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: 'List of notes',
    handler() {
        notes.listOfNotes()
    }
})
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder : {
        title:{
            describe :'get a note to read',
            type:'string',
            demandOption:true
        }
    },
    handler(argv) {
       notes.readNote(argv.title)
    }
})

yargs.parse()