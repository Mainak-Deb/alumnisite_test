function doGet(req) {
    //var college = req.parameter.college; ]
    //var yearGiven = req.parameter.year;
    var doc = SpreadsheetApp.getActiveSpreadsheet(); 
    var sheet = doc.getSheetByName('alumni_cse'); 
    var values = sheet.getDataRange().getValues();
    var head1=[]
    // ['Email Address','Name','Image','Passing Year','LinkedIn url','Small Description about yourself( like your current designation or   something about you)', 'Further Education after GCETTS (optional)','Other Social media account link 1 ( Optional )' ,'Other Social media account link 2 ( Optional )', 'Whatsapp Number ( Optional )']
    for(var i = 1; i<11; i++){
      head1.push(values[0][i])
    }
    var output = []; 
    for(var i = 0; i<values.length; i++) {
        var row = {}; 
        for(var j=0;j<4;j++){
          row[head1[j]]=values[i][j+1];
        }
        // if(row['Passing Year']==yearGiven){
        //   output.push(row);
        // }
        output.push(row);
    }
    Logger.log(JSON.stringify({data: output}))
    return ContentService.createTextOutput (JSON.stringify({data: output})).setMimeType(ContentService.MimeType.JSON);
}

// url:https://script.google.com/macros/s/AKfycbwi1m8fgHvmnRkTePk1xyinHN2Qzi7d6U55A60UoFHMWFKFYQHHQOXMZr3thBmEAv1Y/exec
// Language: javascript
// Path: app2.js
// Compare this snippet from app.js:
