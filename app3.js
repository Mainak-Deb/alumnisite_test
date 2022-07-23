function doGet(req) {
    var yearGiven=null,rangeend=null,rangestart=null,email=null,name=null;
    var yearGiven = req.parameter.year;
    var rangestart = req.parameter.rangestart;
    var rangeend = req.parameter.rangeend;
    var email=req.parameter.email;
    var name=req.parameter.name;

    var doc = SpreadsheetApp.getActiveSpreadsheet(); 
    var sheet = doc.getSheetByName('alumni_cse'); 
    var values = sheet.getDataRange().getValues();
    var head1=[]

    // ['Email Address','Name','Image','Passing Year','LinkedIn url','Small Description about yourself( like your current designation or   something about you)', 'Further Education after GCETTS (optional)','Other Social media account link 1 ( Optional )' ,'Other Social media account link 2 ( Optional )', 'Whatsapp Number ( Optional )']

    for(var i = 1; i<11; i++){
      head1.push(values[0][i])
    }
    var output = []; 
    for(var i = 1; i<values.length; i++) {
        var row = {}; 
        for(var j=0;j<4;j++){
          row[head1[j]]=values[i][j+1];
        }
        output.push(row);
    }
    if(yearGiven != null){
      var outputToReturn=[]
        for(var i = 0; i<output.length; i++){
          if(parseInt(output[i]['Passing Year'])==parseInt(yearGiven)){
            outputToReturn.push(output[i])
          }
        }

        output=outputToReturn;
    }
    if(email != null){
      var outputToReturn=[]
      for(var i = 1; i<values.length; i++) {
        var n1=String(values[i][1]).replace(/\s/g,'').toLowerCase();
        var n2=String(email).replace(/\s/g,'').toLowerCase();
        if(n1.search(n2)!=-1){
          var row = {}; 
          for(var j=0;j<head1.length;j++){
            row[head1[j]]=values[i][j+1];
          }
        }
        outputToReturn.push(row);
        Logger.log(JSON.stringify({data: outputToReturn}))
        return ContentService.createTextOutput (JSON.stringify({data: outputToReturn})).setMimeType(ContentService.MimeType.JSON);
    }  

    }
    if(name != null){
      var outputToReturn=[]

        for(var i = 0; i<output.length; i++){
          var n1=String(output[i]['Name']).replace(/\s/g,'').toLowerCase();
          var n2=String(name).replace(/\s/g,'').toLowerCase();
         
          if(n1.search(n2)!=-1){
            outputToReturn.push(output[i])
          }
        }
        output=outputToReturn;
    }

    if((rangestart != null) && ((rangeend != null))){
      output=output.slice(parseInt(rangestart),parseInt(rangeend));
    }


    Logger.log(JSON.stringify({data: output}))
    return ContentService.createTextOutput (JSON.stringify({data: output})).setMimeType(ContentService.MimeType.JSON);
}






//doGet({"parameter":{"year":"2023"}})