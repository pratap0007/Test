// name of the sheet
const sheetName = 'test'
// get the script properties
const scriptProp = PropertiesService.getScriptProperties()

// gets the active SpreadsheetApp ID and adds it to our PropertiesService
function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}


// handle the posted data from the form
function doPost (e) {

  // lock to the sheet so one user can access it only 
  const lock = LockService.getScriptLock()

  // lock for 10 seconds , assuming in that time google sheet will be updated 
  lock.tryLock(10000)

  try {

    //   Opens the spreadsheet with the given ID
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)


    // access the index of row in whcih data to be filled
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]

    // nextrow in which data to be filled
    const nextRow = sheet.getLastRow() + 1


  // map the header array to key to value of parameter header
    const newRow = headers.map(function(header) {
      return header === 'Date' ? new Date() : e.parameter[header]
    })


// setting newrow data to the sheet
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])


// return success result as meesage
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {

    // return error result as error
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }


// release the lock
  finally {
    lock.releaseLock()
  }
}