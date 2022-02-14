
    document.getElementById('file').onchange = function(){
        show_flag1 = 1;

         var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function(progressEvent){
            var lines = this.result.split('\n');

            arr1.length = 0;
            arr2.length = 0;
            arr3.length = 0;
            arr4.length = 0;

            // for(var line = 0; line < lines.length; line++){
            for(var line = 2; line < lines.length; line++){
                var tabs = lines[line].split('\t');
                if(tabs == "") continue;
                for(var tab = 0; tab < tabs.length; tab++){    
                       switch (tab){
                          case 0:
                            arr1.push(tabs[tab]); break;
                          case 1:
                            arr2.push(tabs[tab]); break;
                          case 2:
                            arr3.push(tabs[tab]); break;
                          case 3:
                            arr4.push(tabs[tab]); break;
                       }
                }   
            }
         options1 = {
            type: 'line',
            data: {
              labels: arr1,
              datasets: [
                {
                  label: 'Column-2',
                  data: arr2,
                  borderWidth: 1,
                  borderColor: "#F10000",
                  pointHitRadius: 25,
                  fill: false
                },
                {
                  label: 'Column-3',
                  data: arr3,
                  borderWidth: 1,
                  borderColor: "#3cba9f",
                  pointHitRadius: 25,
                  // showLine: false,
                  fill: false
                }
              ]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {  
                      stepSize:0.01,                       
                      // min: 0,
                      // max: 1
                  }
                }]
              },
              dragData: true,
              dragDataRound: 10,
              dragOptions: {
                showTooltip: true
              },
              onDragStart: function(e) {
                // console.log(e)
                document.getElementById("btn_run").disabled = false;
             },
              onDrag: function(e, datasetIndex, index, value) {
                e.target.style.cursor = 'grabbing'
                // console.log(datasetIndex, index, value)
              },
              onDragEnd: function(e, datasetIndex, index, value) {
                e.target.style.cursor = 'default' 
                // console.log(datasetIndex, index, value)
              },
              hover: {
                onHover: function(e) {
                  const point = this.getElementAtEvent(e)
                  if (point.length) e.target.style.cursor = 'grab'
                  else e.target.style.cursor = 'default'
                }
              }
            }
          }
          var ctx = document.getElementById('chartJSContainer').getContext('2d');
          // myChart1 = new Chart(ctx, options1);
          myChart1_drag = new Chart(ctx, options1);
      };
      reader.readAsText(file);


      document.getElementById("btn_drag").disabled = false;
      document.getElementById("btn_log").disabled  = false;
      document.getElementById("btn_line").disabled = false;
      
    };


    $("#btn_run").click(function(e){

        //column2
        // var meta2 = myChart1.getDatasetMeta(0);
        // //column3
        // var meta3 = myChart1.getDatasetMeta(1);
        var meta2, meta3;

        switch( show_flag1){
          case 1: 
              var meta2 = myChart1_drag.getDatasetMeta(0);
              var meta3 = myChart1_drag.getDatasetMeta(1);
              break;
          case 2: 
              var meta2 = myChart1_log.getDatasetMeta(0);
              var meta3 = myChart1_log.getDatasetMeta(1);
              break;
          case 3: 
              var meta2 = myChart1_line.getDatasetMeta(0);
              var meta3 = myChart1_line.getDatasetMeta(1);
              break;
        }

        var tmp2 = meta2.controller._data;
        var tmp3 = meta3.controller._data;

        if(show_flag1 == 2){
          var nlen = arr1.length;
          for(var i = 0; i < nlen; i++){
                tmp2[i] = Math.pow(10, tmp2[i]);
                tmp3[i] = Math.pow(10, tmp3[i]);                
          }
  
        }
        

        var file_backup = getRootWebSitePath() + 'Textfile_1.txt';
   
        let newfile = new ActiveXObject("Scripting.FileSystemObject");
        var editFile = newfile.CreateTextFile(file_backup, true);
        editFile.WriteLine('*RPT 1');
        editFile.WriteLine('*SWT');
        var nlen = arr1.length;
        var content = '';
        for(var i = 0; i < nlen; i++){
             content += arr1[i] + '\t' + tmp2[i] + '\t' + tmp3[i] + '\t' + arr4[i] + '\n';
          }
        editFile.WriteLine(content.trim());
        editFile.Close();
        alert("Run successfully.");
     });

    $("#btn_backup").click(function(e){
        var backup_file = getRootWebSitePath() + 'backup.bat';
        window.open(backup_file);
        // alert("Backup successfully.");
      });

    $("#btn_discard").click(function(e){
        var backup_file = getRootWebSitePath() + 'discard.bat';
        window.open(backup_file);
        // alert("Discard successfully.");
      });

    //second tag
    document.getElementById('file2').onchange = function(){
        // show_flag2 = 1;

        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function(progressEvent) {
            var lines = this.result.split('\n');

            arr2_1.length = 0;
            arr2_2.length = 0;
            arr2_3.length = 0;
            arr2_4.length = 0;

            for(var line = 2; line < lines.length; line++){
                var tabs = lines[line].split('\t');
                for(var tab = 0; tab < tabs.length; tab++){    
                       switch (tab){
                          case 0:
                            arr2_1.push(tabs[tab]); break;
                          case 1:
                            arr2_2.push(tabs[tab]); break;
                          case 2:
                            arr2_3.push(tabs[tab]); break;
                          case 3:
                            arr2_4.push(tabs[tab]); break;
                       }
                }   
            }
         options2 = {
            type: 'line',
            data: {
              labels: arr1,
              datasets: [
                {
                  label: 'Column-4',
                  data: arr4,
                  borderWidth: 1,
                  borderColor: "#F10000",
                  pointHitRadius: 25,
                  fill: false
                }
              ]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    // min: -800,
                    // max: 1000
                  }
                }]
              },
              dragData: true,
              dragDataRound: 10,
              dragOptions: {
                showTooltip: true
              },
              onDragStart: function(e) {
                document.getElementById("btn_run2").disabled = false;
             },
              onDrag: function(e, datasetIndex, index, value) {
                e.target.style.cursor = 'grabbing'
                // console.log(datasetIndex, index, value)
              },
              onDragEnd: function(e, datasetIndex, index, value) {
                e.target.style.cursor = 'default' 
                // console.log(datasetIndex, index, value)
              },
              hover: {
                onHover: function(e) {
                  const point = this.getElementAtEvent(e)
                  if (point.length) e.target.style.cursor = 'grab'
                  else e.target.style.cursor = 'default'
                }
              }
            }
          }

          var ctx = document.getElementById('chartJSContainer2').getContext('2d');
          // myChart2 = new Chart(ctx, options2);
          myChart2_dag = new Chart(ctx, options2);
      };
      reader.readAsText(file);

      document.getElementById("btn_drag2").disabled = false;
      document.getElementById("btn_log2").disabled  = false;
      document.getElementById("btn_line2").disabled = false;
    };

    $("#btn_run2").click(function(e){
        //column4
        // var meta4 = myChart2_drag.getDatasetMeta(0);

        var meta4;

        switch( show_flag2){
          case 1: 
              var meta4 = myChart2_drag.getDatasetMeta(0);
              break;
          case 2: 
              var meta4 = myChart2_log.getDatasetMeta(0);
              break;
          case 3: 
              var meta4 = myChart2_line.getDatasetMeta(0);
              break;
        }
        var tmp4 = meta4.controller._data;

        if(show_flag2 == 2){
          var nlen = arr1.length;
          for(var i = 0; i < nlen; i++){
                tmp4[i] = Math.pow(10, tmp4[i]);                         
          }
  
        }
        
        var file_backup = getRootWebSitePath() + 'Textfile_1.txt';
        let newfile = new ActiveXObject("Scripting.FileSystemObject");
        var editFile = newfile.CreateTextFile(file_backup, true);
        editFile.WriteLine('*RPT 1');
        editFile.WriteLine('*SWT');
        var nlen = arr1.length;var content = '';
        for(var i = 0; i < nlen; i++){
             content += arr2_1[i] + '\t' + arr2_2[i] + '\t' + arr2_3[i] + '\t' + tmp4[i] + '\n';
          }
        editFile.WriteLine(content.trim());
        editFile.Close();
        alert("Run successfully.");
      });


    $("#btn_backup2").click(function(e){
        var backup_file = getRootWebSitePath() + 'backup.bat';
        window.open(backup_file);
        alert("Backup successfully.");   
       });

    $("#btn_discard2").click(function(e){
        var backup_file = getRootWebSitePath() + 'discard.bat';
        window.open(backup_file);
        alert("Discard successfully.");
      });

    function getRootWebSitePath()
    {
        var _location = document.location.toString();
        var n = _location.lastIndexOf("/");
        var appRootPath = _location.substring(0, n) + '/';
        var appRootPath = appRootPath.replace("file:///", "");
        return appRootPath;
    }


    $("#btn_log").click(function(e){
        show_flag1 = 2;
       $("#chartJSContainer").hide();
       $("#chartJSContainer_line").hide();
       $("#chartJSContainer_log").show();
        var tmp2 = new Array();
        var tmp3 = new Array();
        var nlen = arr1.length;
          for(var i = 0; i < nlen; i++){
                tmp2[i] = getBaseLog10(arr2[i]);
                tmp3[i] = getBaseLog10(arr3[i]);                            
          }


         var options_log = {
            type: 'line',
            data: {
              labels: arr1,
              datasets: [
                {
                  label: 'Column-2',
                  data: tmp2,
                  borderWidth: 1,
                  borderColor: "#F10000",
                  pointHitRadius: 25,
                  fill: false
                },
                {
                  label: 'Column-3',
                  data: tmp3,
                  borderWidth: 1,
                  borderColor: "#3cba9f",
                  pointHitRadius: 25,
                  fill: false
                }
              ]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    stepSize:0.25,
                    // min: -20,
                    // max: 0
                  }
                }]
                          
            },
              dragData: true,
              dragDataRound: 10,
              dragOptions: {
                showTooltip: true
              },
              onDragStart: function(e) {
                // console.log(e)
                document.getElementById("btn_run").disabled = false;
             },
              onDrag: function(e, datasetIndex, index, value) {
                e.target.style.cursor = 'grabbing'
                // console.log(datasetIndex, index, value)
              },
              onDragEnd: function(e, datasetIndex, index, value) {
                e.target.style.cursor = 'default' 
                // console.log(datasetIndex, index, value)
              },
              hover: {
                onHover: function(e) {
                  const point = this.getElementAtEvent(e)
                  if (point.length) e.target.style.cursor = 'grab'
                  else e.target.style.cursor = 'default'
                }
              }
             }
          }
          var ctx = document.getElementById('chartJSContainer_log').getContext('2d');
          // var myChart1_log = new Chart(ctx, options_log);
          myChart1_log = new Chart(ctx, options_log);
          
          flag_logline1 = 1;
        
     });

    $("#btn_line").click(function(e){
       show_flag1 = 3;
       $("#chartJSContainer").hide();
       $("#chartJSContainer_line").show();
       $("#chartJSContainer_log").hide();

        var options_line = {
            type: 'line',
            data: {
              labels: arr1,
              datasets: [
                {
                  label: 'Column-2',
                  data: arr2,
                  borderWidth: 1,
                  borderColor: "#F10000",
                  pointHitRadius: 25,
                  fill: false
                },
                {
                  label: 'Column-3',
                  data: arr3,
                  borderWidth: 1,
                  borderColor: "#3cba9f",
                  pointHitRadius: 25,
                  // showLine: false,
                  fill: false
                }
              ]
            },
            dragData: false,
              dragDataRound: 1,
              dragOptions: {
                showTooltip: true
              },
            options: {
              scales: {
                xAxes: [{
                  ticks: {
                    // min: 0,
                    // max: 1
                  }
                }]
              },           
            }
          }
          var ctx = document.getElementById('chartJSContainer_line').getContext('2d');
          // var myChart1_line = new Chart(ctx, options_line);
          myChart1_line = new Chart(ctx, options_line);
     });

    $("#btn_drag").click(function(e){
        show_flag1 = 1;
         $("#chartJSContainer").show();
         $("#chartJSContainer_line").hide();
         $("#chartJSContainer_log").hide();
          var options_drag = {
            type: 'line',
            data: {
              labels: arr1,
              datasets: [
                {
                  label: 'Column-2',
                  data: arr2,
                  borderWidth: 1,
                  borderColor: "#F10000",
                  pointHitRadius: 25,
                  fill: false
                },
                {
                  label: 'Column-3',
                  data: arr3,
                  borderWidth: 1,
                  borderColor: "#3cba9f",
                  pointHitRadius: 25,
                  // showLine: false,
                  fill: false
                }
              ]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    // min: 0,
                    // max: 1
                  }
                }]
              },
              dragData: true,
              dragDataRound: 10,
              dragOptions: {
                showTooltip: true
              },
              onDragStart: function(e) {
                // console.log(e)
                document.getElementById("btn_run").disabled = false;
             },
              onDrag: function(e, datasetIndex, index, value) {
                e.target.style.cursor = 'grabbing'
                // console.log(datasetIndex, index, value)
              },
              onDragEnd: function(e, datasetIndex, index, value) {
                e.target.style.cursor = 'default' 
                // console.log(datasetIndex, index, value)
              },
              hover: {
                onHover: function(e) {
                  const point = this.getElementAtEvent(e)
                  if (point.length) e.target.style.cursor = 'grab'
                  else e.target.style.cursor = 'default'
                }
              }
            }
          }
          var ctx = document.getElementById('chartJSContainer').getContext('2d');
          // var myChart1_drag = new Chart(ctx, options_drag);
          myChart1_drag = new Chart(ctx, options_drag);
     });


    $("#btn_log2").click(function(e){
        show_flag2 = 2;
       $("#chartJSContainer2").hide();
       $("#chartJSContainer_line2").hide();
       $("#chartJSContainer_log2").show();
        
        var tmp4 = new Array();
        var nlen = arr1.length;

          for(var i = 0; i < nlen; i++){
                tmp4[i] = getBaseLog10(arr4[i]);           
          }
          
        var options_log = {
            type: 'line',
            data: {
              labels: arr1,
              datasets: [
                {
                  label: 'Column-4',
                  data: tmp4,
                  borderWidth: 1,
                  borderColor: "#F10000",
                  pointHitRadius: 25,
                  fill: false
                }
              ]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    stepSize:0.25,
                    // min: -20,
                    // max: 20
                  }
                }]
              },
              dragData: true,
              dragDataRound: 10,
              dragOptions: {
                showTooltip: true
              },
              onDragStart: function(e) {
                // console.log(e)
                document.getElementById("btn_run").disabled = false;
             },
              onDrag: function(e, datasetIndex, index, value) {
                e.target.style.cursor = 'grabbing'
                // console.log(datasetIndex, index, value)
              },
              onDragEnd: function(e, datasetIndex, index, value) {
                e.target.style.cursor = 'default' 
                // console.log(datasetIndex, index, value)
              },
              hover: {
                onHover: function(e) {
                  const point = this.getElementAtEvent(e)
                  if (point.length) e.target.style.cursor = 'grab'
                  else e.target.style.cursor = 'default'
                }
              }
             }
          }
          var ctx = document.getElementById('chartJSContainer_log2').getContext('2d');
          // var myChart2_log = new Chart(ctx, options_log);
          myChart2_log = new Chart(ctx, options_log);
          
          flag_logline2 = 1;
       
     });

    $("#btn_line2").click(function(e){
        show_flag2 = 3;
       $("#chartJSContainer2").hide();
       $("#chartJSContainer_line2").show();
       $("#chartJSContainer_log2").hide();

        var options_line = {
            type: 'line',
            data: {
              labels: arr1,
              datasets: [
                {
                  label: 'Column-4',
                  data: arr4,
                  borderWidth: 1,
                  borderColor: "#F10000",
                  pointHitRadius: 25,
                  fill: false
                }
              ]
            },
            dragData: false,
              dragDataRound: 1,
              dragOptions: {
                showTooltip: true
              },
            options: {
              scales: {
                xAxes: [{
                  ticks: {
                    // min: -800,
                    // max: 1000
                  }
                }]
              },           
            }
          }
          var ctx = document.getElementById('chartJSContainer_line2').getContext('2d');
          // var myChart2_line = new Chart(ctx, options_line);
          myChart2_line = new Chart(ctx, options_line);
     });

    $("#btn_drag2").click(function(e){
        show_flag2 = 1;
         $("#chartJSContainer2").show();
         $("#chartJSContainer_line2").hide();
         $("#chartJSContainer_log2").hide();
          var options_drag = {
            type: 'line',
            data: {
              labels: arr1,
              datasets: [
                {
                  label: 'Column-4',
                  data: arr4,
                  borderWidth: 1,
                  borderColor: "#F10000",
                  pointHitRadius: 25,
                  fill: false
                }
              ]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    // min: -800,
                    // max: 1000
                  }
                }]
              },
              dragData: true,
              dragDataRound: 10,
              dragOptions: {
                showTooltip: true
              },
              onDragStart: function(e) {
                // console.log(e)
                document.getElementById("btn_run2").disabled = false;
             },
              onDrag: function(e, datasetIndex, index, value) {
                e.target.style.cursor = 'grabbing'
                // console.log(datasetIndex, index, value)
              },
              onDragEnd: function(e, datasetIndex, index, value) {
                e.target.style.cursor = 'default' 
                // console.log(datasetIndex, index, value)
              },
              hover: {
                onHover: function(e) {
                  const point = this.getElementAtEvent(e)
                  if (point.length) e.target.style.cursor = 'grab'
                  else e.target.style.cursor = 'default'
                }
              }
            }
          }
          var ctx = document.getElementById('chartJSContainer2').getContext('2d');
          // var myChart2_drag = new Chart(ctx, options_drag);
          myChart2_drag = new Chart(ctx, options_drag);
     });


    function getBaseLog(x, y) {
       return Math.log(y) / Math.log(x);
    }

    function getBaseLog10(y) {
      var ret = (y > 0) ? Math.log(y) / Math.log(10) : 0;
       // return Math.log(y) / Math.log(10);
       return ret;
    }
