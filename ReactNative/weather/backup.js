  // fetch('http://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=sZvXrnY0LsGnucNksCdH73dUAre5FKMD')
  //   .then((response) => response.text())
  //   .then((responseText) => {
  //     var returnData = eval("(" + responseText + ")");  
  //     var rows = [];
  //     var loopArray = returnData.results[0].index;
  //     for(var i in loopArray)
  //       rows.push([i, loopArray[i]]);

  //      // console.log("---"+datas.results[0]+"---");
  //     // var rows = eval('(' + datas.results + ')');
    
  //     callback(rows);
  //   })
  //   .catch((error) => {
  //     // console.warn(error);
  //     alert(error);
  //   });

//     setTimeout(() => {
//       // var header = 'Header';
//       // var rows = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)];
// //       var header = 'Header '+page;
// //       var rows = {};
// //       rows[header] = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)];
//       if (page === 3) {
//         callback(rows, {
//           allLoaded: true, // the end of the list is reached
//         });        
//       } else {
//         callback(rows);
//       }
//     }, 1000); // simulating network fetching