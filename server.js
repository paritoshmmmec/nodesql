var sqlhelper= require('./databaselayer/dal.js')

sqlhelper.executeQuery("select 1 as a , 2 as b union select 2 as a,3 as b",
  function (data) {
    
  });

