/*store for data
var propertiesStore = [
            {
                  name:"AO",
                  parameter:{
                        name:"AO",
                        highValueRange : "0-100",
                        lowValueRange : "0-100",
                        hValue: 25,
                        lValue: 20,
                        input : false,
                        output : true,
                        outputRange : "0-100",
                        outputValue: 25,
                        makeTable: function(){
                                          var html = "<h4>Propertie Window for " + this.name + "</h4><table border = '2' ><tr> <th>Parameters</th> <th>Possible Values</th> <th>Actual Value</th> </tr> <tbody><tr><td>High Limit</td><td>" + this.highValueRange + "</td><td><span class = 'editable' id = 'hValue' >" + this.hValue + "</td></tr> <tr><td>Low Limit</td><td>" +  this.lowValueRange + "</span></td><td><span class = 'editable' id = 'lValue'>" + this.lValue + "</td></tr> <tr><td>Input</td><td>" + this.input + "</td><td>" + this.input + "</span></td></tr> <tr><td>Ouput</td><td>" + this.outputRange + "</td><td id = 'outputValue'><span class = 'editable'>" + this.outputValue + "</td></tr></tbody></table><button class = 'groovyybutton' id = 'refreshworkspace'>Submit</button>"
                                          $("#properties").html($(x))
							$('.editable').inlineEdit();
                                    }
                  }
            },
            {
                  name:"AI",
                  parameter:{
                        name:"AI",
                        highValueRange : "0-100",
                        lowValueRange : "0-100",
                        hValue: 25,
                        lValue: 20,
                        input: true,
                        inputRange : "0-100",
                        inputValue: 25,
                        output : false,
                        makeTable: function(){
                                          var html = "<h4>Propertie Window for " + this.name + "</h4><table border = '2' ><tr> <th>Parameters</th> <th>Possible Values</th> <th>Actual Value</th> </tr> <tbody><tr><td>High Limit</td><td>" + this.highValueRange + "</td><td id = 'hValue'><span class = 'editable'>" + this.hValue + "</td></tr> <tr><td>Low Limit</td><td>" +  this.lowValueRange + "</span></td><td id = 'lValue'><span class = 'editable'>" + this.lValue + "</td></tr> <tr><td>Input</td><td>" + this.inputRange + "</td><td id = 'inputValue'><span class = 'editable'>" + this.inputValue + "</span></td></tr> <tr><td>Ouput</td><td>" + this.output + "</td><td>" + this.output + "</td></tr></tbody></table><button class = 'groovyybutton' id = 'refreshworkspace'>Submit</button>"
                                          return html;
                                    }
                  }
            },
            {
                  name:"DO",
                  parameter:{
                         name:"DO",
                        highValueRange : "0/1",
                        lowValueRange : "0/1",
                        hValue: 0,
                        lValue: 1,
                        input : false,
                        output : true,
                        outputRange : "0/1",
                        outputValue: 1,
                        makeTable: function(){
                                          var html = "<h4>Propertie Window for " + this.name + "</h4><table border = '2' ><tr> <th>Parameters</th> <th>Possible Values</th> <th>Actual Value</th> </tr> <tbody><tr><td>High Limit</td><td>" + this.highValueRange + "</td><td><span class = 'editable'>" + this.hValue + "</td></tr> <tr><td>Low Limit</td><td>" +  this.lowValueRange + "</span></td><td><span class = 'editable'>" + this.lValue + "</td></tr> <tr><td>Input</td><td>" + this.input + "</td><td><span class = 'editable'>" + this.input + "</span></td></tr> <tr><td>Ouput</td><td>" + this.outputRange + "</td><td>" + this.outputValue + "</td></tr></tbody></table><button class = 'groovyybutton' id = 'refreshworkspace'>Submit</button>"
                                          return html;
                                    }
                  }
            },
            {
                  name:"DI",
                  parameter:{
                        name:"DI",
                        highValueRange : "0/1",
                        lowValueRange : "0/1",
                        hValue: 0,
                        lValue: 1,
                        input:true,
                        inputRange : "0/1",
                        inputValue: 0,
                        output : false,
                        makeTable: function(){
                                          var html = "<h4>Propertie Window for " + this.name + "</h4><table border = '2' ><tr> <th>Parameters</th> <th>Possible Values</th> <th>Actual Value</th> </tr> <tbody><tr><td>High Limit</td><td>" + this.highValueRange + "</td><td><span class = 'editable'>" + this.hValue + "</td></tr> <tr><td>Low Limit</td><td>" +  this.lowValueRange + "</span></td><td><span class = 'editable'>" + this.lValue + "</td></tr> <tr><td>Input</td><td>" + this.inputRange + "</td><td><span class = 'editable'>" + this.inputValue + "</span></td></tr> <tr><td>Ouput</td><td>" + this.output + "</td><td>" + this.output + "</td></tr></tbody></table><button class = 'groovyybutton' id = 'refreshworkspace'>Submit</button>"
                                          return html;
                                    }
                  }
            },
            {
                  name:"STEP",
                  parameter:{
                        name:"STEP",
                        highValueRange : "20-100",
                        lowValueRange : "0-80",
                        hValue: 26,
                        lValue: 68,
                        input:true,
                        inputRange : "0-100",
                        inputValue: 56,
                        output : false,
                        makeTable: function(){
                                          var html = "<h4>Propertie Window for " + this.name + "</h4><table border = '2' ><tr> <th>Parameters</th> <th>Possible Values</th><th>Actual Value</th> </tr> <tbody><tr><td>High Limit</td><td>" + this.highValueRange + "</td><td><span class = 'editable'>" + this.hValue + "</td></tr> <tr><td>Low Limit</td><td>" +  this.lowValueRange + "</span></td><td><span class = 'editable'>" + this.lValue + "</td></tr> <tr><td>Input</td><td>" + this.inputRange + "</td><td><span class = 'editable'>" + this.inputValue + "</span></td></tr> <tr><td>Ouput</td><td>" + this.output + "</td><td>" + this.output + "</td></tr></tbody></table><button class = 'groovyybutton' id = 'refreshworkspace'>Submit</button>"
                                          return html;
                                    }
                  }
            },
            {
                  name:"OND",
                  parameter:{
                        name:"TON",
				In:"Boolean Value",
				inValue:true,
				Out:"NC",
				outValue:"NC",
				TimeDuration:"Integer Value",
				tdValue: 1000,
				ElapsedTime:"NC",
				etValue:"NC",
				makeTable: function(){
                                          var html = "<h4>Propertie Window for " + this.name + "</h4><table border = '2' ><tr> <th>Parameters</th> <th>Possible Values</th> <th>Actual Value</th> </tr> <tbody><tr><td>Input </td><td>" + this.In + "</td><td><span class = 'editable'>" + this.inValue + "</td></tr> <tr><td>Output</td><td>" +  this.Out + "</span></td><td>" + this.outValue + "</td></tr> <tr><td>Time Duration</td><td>" + this.TimeDuration + "</td><td><span class = 'editable'>" + this.tdValue + "</span></td></tr> <tr><td>Elapsed Time</td><td>" + this.ElapsedTime + "</td><td>" + this.etValue + "</td></tr></tbody></table><button class = 'groovyybutton' id = 'refreshworkspace'>Submit</button>"
                                          return html;
                                    }
                  }
            },
            {
                  name:"OFFD",
                  parameter:{
                        name:"TOFF",
				In:"Boolean Value",
				inValue:true,
				Out:"NC",
				outValue:"NC",
				TimeDuration:"Integer Value",
				tdValue: 1000,
				ElapsedTime:"NC",
				etValue:"NC",
				makeTable: function(){
                                          var html = "<h4>Propertie Window for " + this.name + "</h4><table border = '2' ><tr> <th>Parameters</th> <th>Possible Values</th> <th>Actual Value</th> </tr> <tbody><tr><td>Input </td><td>" + this.In + "</td><td><span class = 'editable'>" + this.inValue + "</td></tr> <tr><td>Output</td><td>" +  this.Out + "</span></td><td>" + this.outValue + "</td></tr> <tr><td>Time Duration</td><td>" + this.TimeDuration + "</td><td><span class = 'editable'>" + this.tdValue + "</span></td></tr> <tr><td>Elapsed Time</td><td>" + this.ElapsedTime + "</td><td>" + this.etValue + "</td></tr></tbody></table><button class = 'groovyybutton' id = 'refreshworkspace'>Submit</button>"
                                          return html;
                                    }

                  }
            },
            {
                  name:"UPCTR",
                  parameter:{
                        name:"UP",
                        In:"Boolean Value",
                        inValue:true,
                        Out:"NC",
                        outValue:"NC",
                        CounterType:"UP",
                        Preset:"Integer Value",
                        pValue: 1000,
                        Count:"NC",
                        cValue:"NC",
                        Reset:"Boolean",
                        resetOption: "<button class = 'groovyyybutton'>RESET</button>",
                        makeTable: function(){
                                    var html = "<h4>Propertie Window for " + this.name + "</h4><table border = '2' ><tr> <th>Parameters</th> <th>Possible Values</th> <th>Actual Value</th> </tr> <tbody><tr><td>Input </td><td>" + this.In + "</td><td><span class = 'editable'>" + this.inValue + "</td></tr> <tr><td>Output</td><td>" +  this.Out + "</span></td><td>" + this.outValue + "</td></tr> <tr><td>Counter Type</td><td>" + this.CounterType + "</td><td>---</td></tr> <tr><td>Preset</td><td>" + this.Preset + "</td><td>" + this.pValue + "</td></tr><tr><td>Count</td><td>" +  this.Count + "</td><td>" + this.cValue + "</td></tr><tr><td>Reset</td><td>" + this.Reset + "</td> <td>" + this.resetOption + "</td></tr></tbody></table><button class = 'groovyybutton' id = 'refreshworkspace'>Submit</button>"
                                    return html;
                              }
                  }
            },
            {
                  name:"DWCTR",
                  parameter:{
                        name:"DOWN",
                        In:"Boolean Value",
                        inValue:true,
                        Out:"NC",
                        outValue:"NC",
                        CounterType:"DOWN",
                        Preset:"Integer Value",
                        pValue: 1000,
                        Count:"NC",
                        cValue:"NC",
                        Reset:"Boolean",
                        resetOption: "<button class = 'groovyyybutton'>RESET</button>",
                        makeTable: function(){
                                    var html ="<h4>Propertie Window for " + this.name + "</h4><table border = '2' ><tr> <th>Parameters</th> <th>Possible Values</th> <th>Actual Value</th> </tr> <tbody><tr><td>Input </td><td>" + this.In + "</td><td><span class = 'editable'>" + this.inValue + "</td></tr><tr><td>Output</td><td>" +  this.Out + "</span></td><td>" + this.outValue + "</td></tr> <tr><td>Counter Type</td><td>" + this.CounterType + "</td><td>---</td></tr> <tr><td>Preset</td><td>" + this.Preset + "</td><td><span class = 'editable'>" + this.pValue + "</td></tr><tr><td>Count</td><td>" +  this.Count + "</td><td>" + this.cValue + "</td></tr><tr><td>Reset</td><td>" + this.Reset + "</td> <td>" + this.resetOption + "</td></tr></tbody></table><button class = 'groovyybutton' id = 'refreshworkspace'>Submit</button>"
                                    return html;
                              }
                  }
            },
            {
                  name:"AND",
                  parameter:{
                        name:"AND",
                        inputOne:"Boolean",
                        inputOneValue: 0,
                        inputTwo:"Boolean",
                        inputTwoValue:1,
                        output:"NC",
                        makeTable: function(){
                                    var html = "<h4>Propertie Window for " + this.name + "</h4><table border = '2' ><tr> <th>Parameters</th> <th>Possible Values</th> <th>Actual Value</th> </tr> <tbody><tr><td>First Input</td><td>" + this.inputOne + "</td><td><span class = 'editable'>" + this.inputOneValue + "</td></tr> <tr><td>Output</td><td>" +  this.inputTwo + "</span></td><td><span class = 'editable'>" + this.inputTwoValue + "</td></tr> <tr><td>Output</td><td>" + this.output + "</td><td>---</td></tr></tbody></table><button class = 'groovyybutton' id = 'refreshworkspace'>Submit</button>"
                                    return html;
                              }

                  }
            },
            {
                  name:"OR",
                  parameter:{
                        name:"OR",
                        inputOne:"Boolean",
                        inputOneValue: 0,
                        inputTwo:"Boolean",
                        inputTwoValue:1,
                        output:"NC",
                        makeTable: function(){
                                    var html = "<h4>Propertie Window for " + this.name + "</h4><table border = '2' ><tr> <th>Parameters</th> <th>Possible Values</th> <th>Actual Value</th> </tr> <tbody><tr><td>First Input</td><td>" + this.inputOne + "</td><td><span class = 'editable'>" + this.inputOneValue + "</td></tr> <tr><td>Output</td><td>" +  this.inputTwo + "</span></td><td><span class = 'editable'>" + this.inputTwoValue + "</td></tr> <tr><td>Output</td><td>" + this.output + "</td><td>---</td></tr></tbody></table><button class = 'groovyybutton' id = 'refreshworkspace'>Submit</button>"
                                    return html;
                              }

                  }
            },
            {
                  name:"NOT",
                  parameter:{
                        name:"NOT",
                        inputOne:"Boolean",
                        inputOneValue: 0,
                        output:"NC",
                        makeTable: function(){
                                    var html = "<h4>Propertie Window for " + this.name + "</h4><table border = '2' ><tr> <th>Parameters</th> <th>Possible Values</th> <th>Actual Value</th> </tr> <tbody><tr><td>First Input</td><td>" + this.inputOne + "</td><td><span class = 'editable'>" + this.inputOneValue + "</td></tr> <tr><td>Output</td><td>" +  this.output + "</span></td><td>--</td></tr></tbody></table><button class = 'groovyybutton' id = 'refreshworkspace'>Submit</button>"
                                    return html;
                              }

                  }
            }]*/
            
var diagramStore = [{
            id:"AO",
            count:1,
            makeDiagram: function(ecount,c){
                 var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c//this.id + localCountValue;
			var uniqueID =  c //this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
                  var divCreation = '<div id = ' + idx + ' class = "newbox" title = "Digital Input '+uniqueID+'"></div>'
                  $("#playgraound").append(divCreation);
			storeBlockState.storeDetails(idx)  
                  //creating diagram for block
			    
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                      
			var base = paper.rect(9,9,92,91).attr({
				fill:"#5a5a5a"
			});
			
			base.node.onclick = function(){ // creating click event on rapheal object passing to updateFunction that will create the table
				udp(uniqueID);
			}
                        paper.text(55, 20, uniqueID).attr({
                              'font-size' : 10,
                              fill: '#FFF'
                        });
                        paper.path("M 10 30 l 50 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                        paper.path("M 10 70 l 50 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                        /*paper.text(80, 40, "OUT").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });*/
                        paper.rect(60,30,39,40).attr({
                              'stroke-width' :1,
                              stroke: '#FFF'
                        });
                        /*paper.text(80, 60, "F/B").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
                        paper.rect(60,51,39,19).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });*/
                        
                        /*paper.text(30, 50, "IN").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });*/
                        paper.rect(11,35,45,30).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                         paper.text(80, 85, Execount).attr({
                              'font-size' : 12,
                              fill: '#FFF'
                        });
                     
                	return idx;
            }
      },
      {
            id:"AI",
            count:1,
            makeDiagram: function(ecount,c){
                 var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c//this.id + localCountValue;
			var uniqueID =  c //this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
                  var divCreation = '<div id = ' + idx + ' class = "newbox" title = "Digital Input '+uniqueID+'"></div>'
                  $("#playgraound").append(divCreation);
			storeBlockState.storeDetails(idx)  
                  //creating diagram for block
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                 
                  var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                        
                  base.node.onclick = function(){
                        udp(uniqueID);
                  }
                  
                  paper.text(55, 20, uniqueID).attr({
                        'font-size' : 10,
                       fill: '#fff'
                  });
                  
                  paper.path("M 10 30 l 90 0").attr({
                        'stroke-width':1,
                        stroke:'#FFF'
                  });
                 
                  paper.path("M 10 70 l 90 0").attr({
                        'stroke-width':1,
                        stroke:'#FFF'
                  });
                  
                  /*paper.text(80, 50, "OUT").attr({
                        'font-size' : 12,
                        fill: '#fff'
                  });*/
                  
                  paper.rect(60,40,41,20).attr({
                        'stroke-width' :1,
                        stroke: '#FFF'
                  });
                 
                  /*paper.text(30, 50, "IN").attr({
                        'font-size' : 14,
                        fill: '#fff'
                  });*/
                  
                  paper.rect(9,35,45,30).attr({
                        'stroke-width' :1,
                        stroke: '#FFF' 
                  });
                  
                  paper.text(80, 85, Execount).attr({
                        'font-size' : 12,
                        fill: '#fff'
                  });
              	return idx;
            }
      },
      {
            id:"DI",
            count:1,
            makeDiagram: function(ecount,c){
                  var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c//this.id + localCountValue;
			var uniqueID =  c //this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
                  var divCreation = '<div id = ' + idx + ' class = "newbox" title = "Digital Input '+uniqueID+'"></div>'
                  $("#playgraound").append(divCreation);
			storeBlockState.storeDetails(idx)  
                  //creating diagram for block
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
               
                 var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                        
                  var x = this.id;
                  base.node.onclick = function(){
                        udp(uniqueID);
                  }
                  
                  paper.text(55, 20, uniqueID).attr({
                        'font-size' : 10,
                       fill: '#fff'
                  });
                  
                  paper.path("M 10 30 l 90 0").attr({
                        'stroke-width':1,
                        stroke:'#FFF'
                  });
                 
                  paper.path("M 10 70 l 90 0").attr({
                        'stroke-width':1,
                        stroke:'#FFF'
                  });
                  
                 /* paper.text(80, 50, "OUT").attr({
                        'font-size' : 12,
                        fill: '#fff'
                  });*/
                  
                  paper.rect(60,40,41,20).attr({
                        'stroke-width' :1,
                        stroke: '#FFF'
                  });
                 
                 /* paper.text(30, 50, "IN").attr({
                        'font-size' : 14,
                        fill: '#fff'
                  });*/
                  
                  paper.rect(9,35,45,30).attr({
                        'stroke-width' :1,
                        stroke: '#FFF' 
                  });
                  
                  paper.text(80, 85, Execount).attr({
                        'font-size' : 12,
                        fill: '#fff'
                  });
                 	return idx;
            }
		
      },
      {
            id:"DO",
            count:1,
            makeDiagram: function(ecount,c){
			//var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c//this.id + localCountValue;
			var uniqueID = c//this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
                  var divCreation = '<div id = ' + idx + ' class = "newbox" title = "Digital Output '+uniqueID+'" rel="x"></div>'
                  $("#playgraound").append(divCreation);
			storeBlockState.storeDetails(idx)  
                  //creating diagram for block
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                     
                       var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                        var x = this.id;
                        base.node.onclick = function(){
                              udp(uniqueID); // calling method for updating properties table 
                        }
				
                        paper.text(55, 20, uniqueID).attr({
                              'font-size' : 10,
                             fill: '#fff'
                        });
                        paper.path("M 10 30 l 50 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                        paper.path("M 10 70 l 50 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                       /*paper.text(80, 40, "OUT").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });*/
                        
                        paper.rect(60,30,41,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF'
                        });
                        
                        paper.text(80, 60, "F/B").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
                        paper.rect(60,51,41,19).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                        /*paper.text(30, 50, "IN").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });*/
                        paper.rect(9,35,45,30).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                         paper.text(80, 85, Execount).attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
                  return idx;
		}
      },
      {
            id:"AND",
            count:1,
             makeDiagram : function(ecount, c){
			//var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c; // this.id + localCountValue;
			var uniqueID = c; // this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
                  var divCreation = '<div id = ' + idx + ' class = "newbox" title = "AND Gate '+uniqueID+'"></div>'
                  $("#playgraound").append(divCreation);
                  //creating diagram for block
                  storeBlockState.storeDetails(idx) ; 
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                     
                       var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                        var x = this.id;
                        base.node.onclick = function(){
                              udp(uniqueID);
                        }
                        paper.text(55, 20, uniqueID).attr({
                              'font-size' : 10,
                              fill: '#fff'
                        });
                        paper.path("M 40 30 l 60 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                        paper.path("M 10 70 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       /* paper.text(80, 50, "OUT").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });*/
                        paper.rect(60,40,41,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF'
                        });
                       /* paper.text(20, 60, "IN2").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });*/
                        paper.rect(9,50,30,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                        /* paper.text(20, 40, "IN1").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });*/
                        paper.rect(9,30,30,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                         paper.text(80, 85, Execount).attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
                  return idx;
            }
      },
      {
            id:"OR",
            count:1,
             makeDiagram : function(ecount,c){
			//var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c; //this.id + localCountValue;
			var uniqueID = c; //this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
			var divCreation = '<div id = ' + idx + ' class = "newbox" title = "OR Gate '+uniqueID+'"></div>'
                  $("#playgraound").append(divCreation);
                  //creating diagram for block
                  storeBlockState.storeDetails(idx);
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                     
                       var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                        var x = this.id;
                        base.node.onclick = function(){
                              udp(uniqueID);
                        }
                        paper.text(55, 20, uniqueID).attr({
                              'font-size' : 10,
                              fill: '#fff'
                        });
                        paper.path("M 40 30 l 60 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                        paper.path("M 10 70 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       /* paper.text(80, 50, "OUT").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });*/
                        paper.rect(60,40,41,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF'
                        });
                        /*paper.text(20, 60, "IN2").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });*/
                       paper.rect(9,50,30,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                       /*  paper.text(20, 40, "IN1").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });*/
                        paper.rect(9,30,30,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                         paper.text(80, 85, Execount).attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
               	return idx;
            }
      },
      {
            id:"NOT",
            count:1,
             makeDiagram : function(ecount,c){
			var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c//this.id + localCountValue;
			var uniqueID = c//this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
                 var divCreation = '<div id = ' + idx + ' class = "newbox" title = "NOT Gate '+uniqueID+'"></div>'
                 
                  $("#playgraound").append(divCreation);
                  storeBlockState.storeDetails(idx);
                  //creating diagram for block
                  
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                      
                       var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                        var x = this.id;
                        base.node.onclick = function(){
                              udp(uniqueID);
                        }
                        paper.text(55, 20, uniqueID).attr({
                              'font-size' : 10,
                              fill: '#fff'
                        });
                        paper.path("M 10 30 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                        paper.path("M 10 70 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       /* paper.text(80, 50, "OUT").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });*/
                        paper.rect(60,40,41,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF'
                        });
                       /* paper.text(20, 50, "IN").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });*/
                        paper.rect(9,40,30,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                        
                        paper.text(80, 85, Execount).attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
              
			return idx;
            }
      },
      {
            id:"STEP",
            count:1,
             makeDiagram : function(ecount){
                 var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = this.id + localCountValue;
			var uniqueID = this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
                  var divCreation = '<div id = ' + idx + ' class = "newbox" title = "STEP '+uniqueID+'"></div>'
                  $("#playgraound").append(divCreation);
                  //creating diagram for block
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                      
                        var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                        var x = this.id;
                        base.node.onclick = function(){
                              udp(uniqueID);
                        }
                        paper.text(55, 20, uniqueID).attr({
                              'font-size' : 10,
                              fill: '#fff'
                        });
                        paper.path("M 40 30 l 60 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                        paper.path("M 10 70 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                        paper.text(80, 50, "OUT").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
                        paper.rect(60,40,41,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF'
                        });
                        paper.text(20, 60, "IN2").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
                        paper.rect(9,50,30,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                         paper.text(20, 40, "IN1").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });
                        paper.rect(9,30,30,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                         paper.text(80, 85, Execount).attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
                  jsPlumb.Defaults.DragOptions = { cursor: 'pointer', zIndex:2000 };
                  jsPlumb.Defaults.PaintStyle = { strokeStyle:'#FFF' };
                  jsPlumb.Defaults.EndpointStyle = { width:10, height:8, strokeStyle:'#666' };
                  jsPlumb.Defaults.Endpoint = new jsPlumb.Endpoints.Rectangle();
                  jsPlumb.Defaults.Container = 'playgraound';
                  var exampleDropOptions = {
					tolerance:'touch',
					hoverClass:'dropHover',
					activeClass:'dragActive'
				};
                  var inputColor = '#993300';
                  var input = {
                        endpoint:new jsPlumb.Endpoints.Rectangle(),
                        style:{ width:12, height:10, fillStyle:inputColor },
                        isSource:false,
                        anchor: "LeftMiddle",
                        scope: 'input',
                        connectorStyle:{ strokeStyle:inputColor, lineWidth:4 },
                        connector : new jsPlumb.Connectors.Bezier(63),
                        isTarget:true,
                        dropOptions : exampleDropOptions
                  };
                  
                  var outputColor = "#FF3333";
                  var output = {
                              endpoint: new jsPlumb.Endpoints.Rectangle(),
                              reattach: true,
                              anchor: "RightMiddle",
                              style: { width:12, height:10, fillStyle:outputColor },
                              isSource: true,
                              scope: 'input',
                              connectorStyle:{ strokeStyle:outputColor, lineWidth:4 },
                              connector : new jsPlumb.Connectors.Bezier(63),
                              isTarget:false,
                              dropOptions : exampleDropOptions
                  };
                  jsPlumb.addEndpoint(idx, input);
                  jsPlumb.addEndpoint(idx,  output);
                  jsPlumb.draggable($(".newbox"));
			return idx;
            }
      },
      {
            id:"OND",
            count:1,
            makeDiagram: function(ecount,c){
			//var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c//this.id + localCountValue;
			var uniqueID = c//this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
                  var divCreation = '<div id = ' + idx + ' class = "newboxTimer" title = "Digital Output '+uniqueID+'" rel="x"></div>';
                                 
                  $("#playgraound").append(divCreation);
			storeBlockState.storeDetails(idx) ;
                  var resethtml = "<button id = 'presetUPTimer' class = 'presetTimer'>Preset</button>"
                  $("#"+idx).append(resethtml);
                  
                   $("#presetUPTimer").bind("click",function(){
                                          var x = prompt("Please enter Preset","");
                                          if(x == null || x == ""){
                                                alert("Nothing Entered system will perform operation on predefined value")
                                          } else{
                                                if(!(isNaN(x))){
                                                      storeBlockState.promtPresetTimer(idx,x); 
                                                      //$("#preset").text(x);
                                                } else{
                                                      alert("Please Enter Some Numerical Value")
                                                }
                                          }
                                    });
                  //creating diagram for block
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                     
                       var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                        var x = this.id;
                        base.node.onclick = function(){
                              //udp(uniqueID); // calling method for updating properties table 
                        }
				
                       
                        paper.text(55, 20, uniqueID).attr({
                              'font-size' : 10,
                              fill: '#fff'
                        });
                        paper.path("M 10 30 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                        paper.path("M 10 70 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                        
                        paper.path("M 60 40 l 40 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                        paper.path("M 60 60 l 40 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                        paper.path("M 60 40 l 0 20").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                        /* paper.text(85, 50, "OUT").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
                        
                               
                        paper.text(20, 50, "IN").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });*/
                        
                        paper.path("M 10 40 l 40 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                        paper.path("M 10 60 l 40 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                        paper.path("M 50 40 l 0 20").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                        
                        paper.text(80, 85, Execount).attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
                        
                        paper.path("M 50 70 l 0 30").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                  return idx;
		}
      },
      {
            id:"OFFD",
            count:1,
            makeDiagram: function(ecount,c){
			//var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c//this.id + localCountValue;
			var uniqueID = c//this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
                  var divCreation = '<div id = ' + idx + ' class = "newboxTimer" title = "Digital Output '+uniqueID+'" rel="x"></div>'
                  $("#playgraound").append(divCreation);
			storeBlockState.storeDetails(idx)  ;
                  var resethtml = "<button id = 'presetDWTimer' class = 'presetTimer'>Preset</button>"
                  $("#"+idx).append(resethtml);
                  
                   $("#presetDWTimer").bind("click",function(){
                                          var x = prompt("Please enter Preset","");
                                          if(x == null || x == ""){
                                                alert("Nothing Entered system will perform operation on predefined value")
                                          } else{
                                                if(!(isNaN(x))){
                                                      storeBlockState.promtPresetTimer(idx,x); 
                                                      //$("#preset").text(x);
                                                } else{
                                                      alert("Please Enter Some Numerical Value")
                                                }
                                          }
                                    });
                  //creating diagram for block
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                     
                       var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                       
                        base.node.onclick = function(){
                              udp(uniqueID); // calling method for updating properties table 
                        }
				
                        paper.text(55, 20, uniqueID).attr({
                              'font-size' : 10,
                              fill: '#fff'
                        });
                        paper.path("M 10 30 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                        paper.path("M 10 70 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                        /*paper.text(85, 50, "OUT").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
                        
                        paper.text(20, 50, "IN").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });*/
                        
                        paper.text(85, 85, Execount).attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });
                  return idx;
		}
      },
      {
            id:"UPCTR",
            count:1,
            makeDiagram: function(ecount,c){
			//var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c//this.id + localCountValue;
			var uniqueID = c//this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
                  var divCreation = '<div id = ' + idx + ' class = "newboxCTR" title = "UP Counter  '+uniqueID+'" rel="x"></div>'
                  $("#playgraound").append(divCreation);
                  var resethtml = "<button id = 'resetCounterup' class = 'resetCounter'>Reset</button>"
                  $("#"+idx).append(resethtml);
                  var resethtml = "<button id = 'presetup' class = 'preset'>Preset</button>"
                  $("#"+idx).append(resethtml);
                  $("#resetCounterup").bind("click",function(){
                                          storeBlockState.resetValuePass(idx,0);
                                    });
                  $("#presetup").bind("click",function(){
                                          var x = prompt("Please enter Preset","");
                                          if(x == null || x == ""){
                                                alert("Nothing Entered system will perform operation on predefined value")
                                          } else{
                                                if(!(isNaN(x))){
                                                      storeBlockState.promtPreset(idx,x); 
                                                      //$("#preset").text(x);
                                                } else{
                                                      alert("Please Enter Some Numerical Value")
                                                }
                                          }
                                    });
			storeBlockState.storeDetails(idx)  
                  //creating diagram for block
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                     
                       var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                        var x = this.id;
                        base.node.onclick = function(){
                              udp(uniqueID); // calling method for updating properties table 
                        }
				
                        paper.text(55, 20, uniqueID).attr({
                              'font-size' : 10,
                              fill: '#fff'
                        });
                        paper.path("M 10 30 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                        paper.path("M 10 75 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                        paper.text(85, 50, "OUT").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
                        
                        paper.text(20, 40, "IN").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });
                        
                        paper.text(32, 64, "RESET").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });
                        
                        paper.text(85, 87, Execount).attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });
                  return idx;
		}
      },
      {
		id:"PID",
		makeDiagram: function(ecount,c){
			//var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c//this.id + localCountValue;
			var uniqueID = c//this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
                  var divCreation = '<div id = ' + idx + ' class = "newboxPID newbox" title = "UP Counter  ' + uniqueID + ' " rel = "x"></div>'
                  $("#playgraound").append(divCreation);
                                     
			storeBlockState.storeDetails(idx)  // for right click event this function calls
                  //creating diagram for block
                  var paper = new Raphael(document.getElementById(idx), 110, 120);
                  
                  var base = paper.rect(10,10,100,110).attr({
				fill:"#5a5a5a"
			});
                  
			base.node.onclick = function(){
				udp(uniqueID);
                  }
			
                  base.node.ondblclick = function(){
                       openBox()
                  }
                  
			paper.text(55, 17, uniqueID).attr({
				'font-size' : 10,
				fill: '#fff'
			});
			paper.path("M 10 25 l 100 0").attr({
				'stroke-width':1,
				stroke:'#FFF'
			});
		     
			paper.path("M 10 100 l 100 0").attr({
				'stroke-width':1,
				stroke:'#FFF'
			});
			
                  /*paper.text(90, 60, "OUT").attr({
				'font-size' : 12,
				fill: '#fff'
			});*/
			
			paper.text(29, 35, "BCK_IN").attr({
				'font-size' : 10,
				fill: '#fff'
			});
			
			paper.text(83, 35, "BCK_OUT").attr({
				'font-size' : 10,
				fill: '#fff'
			});
			
			paper.text(29, 50, "CAS_IN").attr({
				'font-size' : 10,
				fill: '#fff'
			});
			
			/*paper.text(18, 70, "IN").attr({
				'font-size' : 12,
				fill: '#fff'
			});*/
			
			paper.text(44, 87, "SIMULATE_IN").attr({
				'font-size' : 10,
				fill: '#fff'
			});
			
			paper.text(100, 110, Execount).attr({
				'font-size' : 12,
				fill: '#fff'
			});
			return idx;
		},
		
	},
      {
            id:"DWCTR",
            makeDiagram: function(ecount,c){
			//var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c//this.id + localCountValue;
			var uniqueID = c//this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
                  var divCreation = '<div id = ' + idx + ' class = "newboxCTR" title = "UP Counter  '+uniqueID+'" rel="x"></div>'
                  $("#playgraound").append(divCreation);
                   var resethtml = "<button id = 'resetCounterdw' class = 'resetCounter'>Reset</button>"
                  $("#"+idx).append(resethtml);
                  var resethtml = "<button id = 'presetdw' class = 'preset'>Preset</button>"
                  $("#"+idx).append(resethtml);
                  $("#resetCounterdw").bind("click",function(){
                                          storeBlockState.resetValuePass(idx,0);
                                    });
                  $("#presetdw").bind("click",function(){
                                          var x = prompt("Please enter Preset","");
                                          if(x == null || x == ""){
                                                alert("Nothing Entered system will perform operation on predefined value")
                                          } else{
                                                if(!(isNaN(x))){
                                                      storeBlockState.promtPreset(idx,x); 
                                                      //$("#preset").text(x);
                                                } else{
                                                      alert("Please Enter Some Numerical Value")
                                                }
                                          }
                                    });
			storeBlockState.storeDetails(idx)  
                  //creating diagram for block
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                     
                       var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                        var x = this.id;
                        base.node.onclick = function(){
                              udp(uniqueID); // calling method for updating properties table 
                        }
				
                        paper.text(55, 20, uniqueID).attr({
                              'font-size' : 10,
                              fill: '#fff'
                        });
                        paper.path("M 10 30 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                        paper.path("M 10 75 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                        paper.text(85, 50, "OUT").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
                        
                        paper.text(20, 40, "IN").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });
                        
                        paper.text(32, 64, "RESET").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });
                        
                        paper.text(85, 87, Execount).attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });
                  return idx;
		}
      },
      {
            id:"ADD",
            count:1,
             makeDiagram : function(ecount,c){
			//var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c; //this.id + localCountValue;
			var uniqueID = c; //this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
			var divCreation = '<div id = ' + idx + ' class = "newbox" title = "ADD  '+uniqueID+'"></div>'
                  $("#playgraound").append(divCreation);
                  //creating diagram for block
                  storeBlockState.storeDetails(idx);
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                     
                       var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                        var x = this.id;
                        base.node.onclick = function(){
                              udp(uniqueID);
                        }
                        paper.text(55, 20, uniqueID).attr({
                              'font-size' : 10,
                              fill: '#fff'
                        });
                        paper.path("M 40 30 l 60 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                        paper.path("M 10 70 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       /* paper.text(80, 50, "OUT").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });*/
                        paper.rect(60,35,40,30).attr({
                              'stroke-width' :1,
                              stroke: '#FFF'
                        });
                        /*paper.text(20, 60, "IN2").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });*/
                       paper.rect(9,50,30,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                       /*  paper.text(20, 40, "IN1").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });*/
                        paper.rect(9,30,30,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                         paper.text(80, 85, Execount).attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
               	return idx;
            }
      },
       {
            id:"MUL",
            count:1,
             makeDiagram : function(ecount,c){
			//var localCountValue = this.count++; // this is for printing number of this kind of div is created also also to give unique id of element
                  var idx = c; //this.id + localCountValue;
			var uniqueID = c; //this.id + localCountValue; // this will print value on top of functional block  and also used for creating unique id of that element
                  var Execount = "#" + ecount;
			var divCreation = '<div id = ' + idx + ' class = "newbox" title = "MUL  '+uniqueID+'"></div>'
                  $("#playgraound").append(divCreation);
                  //creating diagram for block
                  storeBlockState.storeDetails(idx);
                  var paper = new Raphael(document.getElementById(idx), 110, 110);
                     
                       var base = paper.rect(10,10,90,90).attr({
                              fill:"#5a5a5a"
                        });
                        var x = this.id;
                        base.node.onclick = function(){
                              udp(uniqueID);
                        }
                        paper.text(55, 20, uniqueID).attr({
                              'font-size' : 10,
                              fill: '#fff'
                        });
                        paper.path("M 40 30 l 60 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       
                        paper.path("M 10 70 l 90 0").attr({
                              'stroke-width':1,
                              stroke:'#FFF'
                        });
                       /* paper.text(80, 50, "OUT").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });*/
                        paper.rect(60,35,40,30).attr({
                              'stroke-width' :1,
                              stroke: '#FFF'
                        });
                        /*paper.text(20, 60, "IN2").attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });*/
                       paper.rect(9,50,30,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                       /*  paper.text(20, 40, "IN1").attr({
                              'font-size' : 14,
                              fill: '#fff'
                        });*/
                        paper.rect(9,30,30,20).attr({
                              'stroke-width' :1,
                              stroke: '#FFF' 
                        });
                         paper.text(80, 85, Execount).attr({
                              'font-size' : 12,
                              fill: '#fff'
                        });
               	return idx;
            }
      }]     

