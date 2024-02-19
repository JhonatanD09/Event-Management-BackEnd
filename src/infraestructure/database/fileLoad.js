
const reader = require('xlsx') 
  
const file = reader.readFile('src/upload/dataEvents.xlsx')

let events = []

const loadData = ()=>{
    const sheets = file.SheetNames 
  
    for(let i = 0; i < sheets.length; i++) 
    { 
    const temp = reader.utils.sheet_to_json( 
            file.Sheets[file.SheetNames[i]]) 
    temp.forEach((res) => { 
        events.push(res) 
    }) 
    } 
    return events
}

module.exports = {loadData}