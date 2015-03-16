var overlays = [
					[ "Arrow", { location:0.6 } ], 
					[ "Label", { 
						location:0.5,
						label:function(c) { 
							return c.connection.labelText || ""; 
						},
						labelStyle : { 
							fillStyle:"#deea18", 
							padding:0.2, 
							font:"12px sans-serif", 
							color:"#444" 
						}
					}] 
				];


(function(_dcs){
      // all default option goes here
      jsplumbClass = jc = function()
      {
      }
      
      jc.init = function(conn) {
                
			//conn.labelText = conn.sourceId + " - " + conn.targetId;
			conn.bind("dblclick", function(conn) {
				if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?")){
					jsPlumb.detach(conn); 
                              conn.paint();
                        } else{
                              conn.paint();
                        }
			}); 
			//conn.bind("mouseenter", function(conn) {conn.setLabel("click to delete"); });
			//conn.bind("mouseexit", function(conn) { conn.setLabel(""); });
	};
      
      jc.createJSPLUMB = function(id,idx)
      {
		jsPlumb.setMouseEventsEnabled(true);
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
		
		
		var endpointArray = new Array();
            switch(id){
                 
                  case "DI":
                       
                        var inputColor = '#993300';
                        var input = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:inputColor },
                              isSource:false,
                              anchor: "LeftMiddle",
                              scope: 'input',
                              connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
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
                                    connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connector : new jsPlumb.Connectors.Bezier(63),
                                    connectorOverlays: overlays,
                                    isTarget:false,
                                    dropOptions : exampleDropOptions
                        };
                        jsPlumb.addEndpoint(idx, input,{uuid:"DIInput"});
                        jsPlumb.addEndpoint(idx,  output,{uuid:"DIOutput"});
                        jsPlumb.draggable($(".newbox"));
                        endpointArray.push( jsPlumb.getEndpoint("DIInput"));
                        endpointArray.push( jsPlumb.getEndpoint("DIOutput"));
                        return endpointArray;
                  break;
                  
                  case "DO":
                        var inputColor = '#993300';
                        var input = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:inputColor },
                              isSource:false,
                              anchor: "LeftMiddle",
                              scope: 'input',
                              connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
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
                                    connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connector : new jsPlumb.Connectors.Bezier(63),
                                   connectorOverlays: overlays,
                                    isTarget:false,
                                    dropOptions : exampleDropOptions
                        };
                        
                        jsPlumb.addEndpoint(idx, input,{uuid:"DOInput"});
                        jsPlumb.addEndpoint(idx,  output,{uuid:"DOOutput"});
                        jsPlumb.draggable($(".newbox"));
                        endpointArray.push( jsPlumb.getEndpoint("DOInput"));
                        endpointArray.push( jsPlumb.getEndpoint("DOOutput"));
                        return endpointArray;
                  break;
                  
                  case "AND":
                        var inputColor = '#993300';
                        var inputOne = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:inputColor },
                              isSource:false,
                              anchor: "BottomLeft",
                              scope: 'input',
                              connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
                              connector : new jsPlumb.Connectors.Bezier(63),
                              isTarget:true,
                              dropOptions : exampleDropOptions
                        };
                        
                        var inputTwo = {
                                    endpoint: new jsPlumb.Endpoints.Rectangle(),
                                    reattach: true,
                                    anchor: "TopLeft",
                                    style: { width:12, height:10, fillStyle:inputColor },
                                    isSource: false,
                                    scope: 'input',
                                    connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
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
                                    connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connector : new jsPlumb.Connectors.Bezier(63),
                                    connectorOverlays: overlays,
                                    isTarget:false,
                                    dropOptions : exampleDropOptions
                        };
                      
                        jsPlumb.addEndpoint(idx, inputOne,{uuid:"ANDInputOne"});
                        jsPlumb.addEndpoint(idx,  inputTwo,{uuid:"ANDInputTwo"});
                        jsPlumb.addEndpoint(idx,  output,{uuid:"ANDOutput"});
                        jsPlumb.draggable($(".newbox"));
				endpointArray.push( jsPlumb.getEndpoint("ANDInputOne"));
				endpointArray.push( jsPlumb.getEndpoint("ANDInputTwo"));
                        endpointArray.push( jsPlumb.getEndpoint("ANDOutput"));
                        return endpointArray;
                  break;
                  
                  case "OR":
                        var inputColor = '#993300';
                        var inputOne = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:inputColor },
                              isSource:false,
                              anchor: "BottomLeft",
                              scope: 'input',
                              connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
                              connector : new jsPlumb.Connectors.Bezier(63),
                              isTarget:true,
                              dropOptions : exampleDropOptions
                        };
                        
                        var inputTwo = {
                                    endpoint: new jsPlumb.Endpoints.Rectangle(),
                                    reattach: true,
                                    anchor: "TopLeft",
                                    style: { width:12, height:10, fillStyle:inputColor },
                                    isSource: false,
                                    scope: 'input',
                                    connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
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
                                    connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connector : new jsPlumb.Connectors.Bezier(63),
                                    connectorOverlays: overlays,
                                    isTarget:false,
                                    dropOptions : exampleDropOptions
                        };
                        jsPlumb.addEndpoint(idx, inputOne,{uuid:"ORInputOne"});
                        jsPlumb.addEndpoint(idx,  inputTwo,{uuid:"ORInputTwo"});
                        jsPlumb.addEndpoint(idx,  output,{uuid:"OROutput"});
                        jsPlumb.draggable($(".newbox"));
				endpointArray.push( jsPlumb.getEndpoint("ORInputOne"));
				endpointArray.push( jsPlumb.getEndpoint("ORInputTwo"));
                        endpointArray.push( jsPlumb.getEndpoint("OROutput"));
                        return endpointArray;
                  break;
                  
                  case "NOT":
                        var inputColor = '#993300';
                        var input = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:inputColor },
                              isSource:false,
                              anchor: "LeftMiddle",
                              scope: 'input',
                              connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
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
                                    connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connector : new jsPlumb.Connectors.Bezier(63),
                                    connectorOverlays: overlays,
                                    isTarget:false,
                                    dropOptions : exampleDropOptions
                        };
                        
				jsPlumb.addEndpoint(idx, input,{uuid:"NOTInput"});
                        jsPlumb.addEndpoint(idx,  output,{uuid:"NOTOutput"});
				jsPlumb.draggable($(".newbox"));
				endpointArray.push( jsPlumb.getEndpoint("NOTInput"));
				endpointArray.push( jsPlumb.getEndpoint("NOTOutput"));
                        return endpointArray;
                  break;
                  
                  case "OND":
                        var inputColor = '#993300';
                        var input = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:inputColor },
                              isSource:false,
                              anchor: "LeftMiddle",
                              scope: 'input',
                              connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
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
                                    connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connector : new jsPlumb.Connectors.Bezier(63),
                                    connectorOverlays: overlays,
                                    isTarget:false,
                                    dropOptions : exampleDropOptions
                        };
                        
				jsPlumb.addEndpoint(idx, input,{uuid:"ONDInput"});
                        jsPlumb.addEndpoint(idx,  output,{uuid:"ONDOutput"});
				jsPlumb.draggable($(".newboxTimer"));
				endpointArray.push( jsPlumb.getEndpoint("ONDInput"));
				endpointArray.push( jsPlumb.getEndpoint("ONDOutput"));
                        return endpointArray;
                  break;
                  
                  case "OFFD":
                        var inputColor = '#993300';
                        var input = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:inputColor },
                              isSource:false,
                              anchor: "LeftMiddle",
                              scope: 'input',
                              connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
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
                                    connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connector : new jsPlumb.Connectors.Bezier(63),
                                    connectorOverlays: overlays,
                                    isTarget:false,
                                    dropOptions : exampleDropOptions
                        };
                        
                        jsPlumb.addEndpoint(idx, input,{uuid:"OFDInput"});
                        jsPlumb.addEndpoint(idx,  output,{uuid:"OFDOutput"});
				jsPlumb.draggable($(".newboxTimer"));
				endpointArray.push( jsPlumb.getEndpoint("OFDInput"));
				endpointArray.push( jsPlumb.getEndpoint("OFDOutput"));
                        return endpointArray;
                  break;
                  
                  case "UPCTR":
                        var inputColor = '#993300';
                        var input = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:inputColor },
                              isSource:false,
                              anchor: "LeftMiddle",
                              scope: 'input',
                              connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
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
                                    connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connector : new jsPlumb.Connectors.Bezier(63),
                                    connectorOverlays: overlays,
                                    isTarget:false,
                                    dropOptions : exampleDropOptions
                        };
                        
                        jsPlumb.addEndpoint(idx, input,{uuid:"UPCTRInput"});
                        jsPlumb.addEndpoint(idx,  output,{uuid:"UPCTROutput"});
                        jsPlumb.draggable($(".newboxCTR"));
				endpointArray.push( jsPlumb.getEndpoint("UPCTRInput"));
				endpointArray.push( jsPlumb.getEndpoint("UPCTROutput"));
                        return endpointArray;
                  break;
                  
                  case "DWCTR":
                        var inputColor = '#993300';
                        var input = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:inputColor },
                              isSource:false,
                              anchor: "LeftMiddle",
                              scope: 'input',
                              connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
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
                                    connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connector : new jsPlumb.Connectors.Bezier(63),
                                    connectorOverlays: overlays,
                                    isTarget:false,
                                    dropOptions : exampleDropOptions
                        };
                        
                         jsPlumb.addEndpoint(idx, input,{uuid:"DWCTRInput"});
                        jsPlumb.addEndpoint(idx,  output,{uuid:"DWCTROutput"});
                        jsPlumb.draggable($(".newboxCTR"));
				endpointArray.push( jsPlumb.getEndpoint("DWCTRInput"));
				endpointArray.push( jsPlumb.getEndpoint("DWCTROutput"));
				return endpointArray
                  break;
                  
			case "AO":
				var inputColor = '#9933FF';
				var input = {
					endpoint:new jsPlumb.Endpoints.Rectangle(),
					style:{ width:12, height:10, fillStyle:inputColor },
					isSource:false,
					anchor: "LeftMiddle",
					scope: 'inputAnalog',
					connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
                              connectorOverlays: overlays,
					connector: "Flowchart",
					isTarget:true,
					dropOptions : exampleDropOptions
				};
				
				var outputColor = "#FF33FF";
				var output = {
						endpoint: new jsPlumb.Endpoints.Rectangle(),
						reattach: true,
						anchor: "RightMiddle",
						style: { width:12, height:10, fillStyle:outputColor },
						isSource: true,
						scope: 'inputAnalog',
						connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connectorOverlays: overlays,
						connector: "Flowchart",
						isTarget:false,
						dropOptions : exampleDropOptions
				};
			     
				jsPlumb.addEndpoint(idx, input,{uuid:"AOInput"});
				jsPlumb.addEndpoint(idx,  output,{uuid:"AOOutput"});
				jsPlumb.draggable($(".newbox"));
				endpointArray.push( jsPlumb.getEndpoint("AOInput"));
				endpointArray.push( jsPlumb.getEndpoint("AOOutput"));
				return endpointArray
			break;
			
			case "AI":
				var inputColor = '#9933FF';
				var input = {
					endpoint:new jsPlumb.Endpoints.Rectangle(),
					style:{ width:12, height:10, fillStyle:inputColor },
					isSource:false,
					anchor: "LeftMiddle",
					scope: 'inputAnalog',
					connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
                              connectorOverlays: overlays,
					connector: "Flowchart",
					isTarget:true,
					dropOptions : exampleDropOptions
				};
				
				var outputColor = "#FF33FF";
				var output = {
						endpoint: new jsPlumb.Endpoints.Rectangle(),
						reattach: true,
						anchor: "RightMiddle",
						style: { width:12, height:10, fillStyle:outputColor },
						isSource: true,
						scope: 'inputAnalog',
						connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connectorOverlays: overlays,
						connector: "Flowchart",
						isTarget:false,
						dropOptions : exampleDropOptions
				};
			     
				jsPlumb.addEndpoint(idx, input,{uuid:"AIInput"});
				jsPlumb.addEndpoint(idx,  output,{uuid:"AIOutput"});
				jsPlumb.draggable($(".newbox"));
				endpointArray.push( jsPlumb.getEndpoint("AIInput"));
				endpointArray.push( jsPlumb.getEndpoint("AIOutput"));
				return endpointArray
			break;
			
			case "PID":
                        var backInputColor = '#99FFAA';
                        var backInput = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:backInputColor },
                              isSource:false,
                              anchor: "TopLeft",
                              scope: idx,
                              connectorStyle:{ strokeStyle:backInputColor, lineWidth:2 },
                              connector : new jsPlumb.Connectors.Bezier(63),
					connectorOverlays: overlays,
                              isTarget:true,
                              dropOptions : exampleDropOptions
                        };
				
				var backoutputColor = '#99FF00';
                        var backoutput = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:backoutputColor },
                              isSource: true,
                              anchor: "TopRight",
                              scope: idx,
                              connectorStyle:{ strokeStyle:backoutputColor, lineWidth:2 },
					connectorOverlays: overlays,
                              connector : new jsPlumb.Connectors.Bezier(63),
                              isTarget:false,
                              dropOptions : exampleDropOptions
                        };
                        
                        var inputColor = '#9933FF';
				var input = {
					endpoint:new jsPlumb.Endpoints.Rectangle(),
					style:{ width:12, height:10, fillStyle:inputColor },
					isSource:false,
					anchor: "LeftMiddle",
					scope: 'inputAnalog',
					connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
                              connectorOverlays: overlays,
                              connector : new jsPlumb.Connectors.Bezier(63),
					isTarget:true,
					dropOptions : exampleDropOptions
				};
                        
                        var outputColor = "#FF33FF";
				var output = {
						endpoint: new jsPlumb.Endpoints.Rectangle(),
						reattach: true,
						anchor: "RightMiddle",
						style: { width:12, height:10, fillStyle:outputColor },
						isSource: true,
						scope: 'inputAnalog',
						connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connectorOverlays: overlays,
						connector : new jsPlumb.Connectors.Bezier(63),
						isTarget:false,
						dropOptions : exampleDropOptions
				};
                      
                        jsPlumb.addEndpoint(idx, backInput,{uuid:"PIDBackInput"});
                        jsPlumb.addEndpoint(idx,  backoutput,{uuid:"PIDBackOutput"});
                        jsPlumb.addEndpoint(idx,  input,{uuid:"PIDInput"});
                        jsPlumb.addEndpoint(idx,  output,{uuid:"PIDOutput"});
                        jsPlumb.draggable($(".newbox"));
				endpointArray.push( jsPlumb.getEndpoint("PIDBackInput"));
				endpointArray.push( jsPlumb.getEndpoint("PIDBackOutput"));
				endpointArray.push( jsPlumb.getEndpoint("PIDInput"));
				endpointArray.push( jsPlumb.getEndpoint("PIDOutput"));
				return endpointArray
			break;
                  
                  case "ADD":
                        var inputColor = '#9933FF';
                        var inputOne = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:inputColor },
                              isSource:false,
                              anchor: "BottomLeft",
                              scope: "inputAnalog",
                              connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
                              connector : new jsPlumb.Connectors.Bezier(63),
                              isTarget:true,
                              dropOptions : exampleDropOptions
                        };
                        
                        var inputTwo = {
                                    endpoint: new jsPlumb.Endpoints.Rectangle(),
                                    reattach: true,
                                    anchor: "TopLeft",
                                    style: { width:12, height:10, fillStyle:inputColor },
                                    isSource: false,
                                    scope: "inputAnalog",
                                    connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
                                    connector: "Flowchart",
                                    isTarget:true,
                                    dropOptions : exampleDropOptions
                        };
                        
                        var outputColor = "#FF33FF";
                        var output = {
                                    endpoint: new jsPlumb.Endpoints.Rectangle(),
                                    reattach: true,
                                    anchor: "RightMiddle",
                                    style: { width:12, height:10, fillStyle:outputColor },
                                    isSource: true,
                                    scope: 'inputAnalog',
                                    connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connector: "Flowchart",
                                    connectorOverlays: overlays,
                                    isTarget:false,
                                    dropOptions : exampleDropOptions
                        };
                        jsPlumb.addEndpoint(idx, inputOne,{uuid:"ADDInputOne"});
                        jsPlumb.addEndpoint(idx,  inputTwo,{uuid:"ADDInputTwo"});
                        jsPlumb.addEndpoint(idx,  output,{uuid:"ADDOutput"});
                        jsPlumb.draggable($(".newbox"));
				endpointArray.push( jsPlumb.getEndpoint("ADDInputOne"));
				endpointArray.push( jsPlumb.getEndpoint("ADDInputTwo"));
                        endpointArray.push( jsPlumb.getEndpoint("ADDOutput"));
                        return endpointArray;
                  break;
                  
                  case "MUL":
                        var inputColor = '#9933FF';
                        var inputOne = {
                              endpoint:new jsPlumb.Endpoints.Rectangle(),
                              style:{ width:12, height:10, fillStyle:inputColor },
                              isSource:false,
                              anchor: "BottomLeft",
                              scope: "inputAnalog",
                              connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
                              connector : new jsPlumb.Connectors.Bezier(63),
                              isTarget:true,
                              dropOptions : exampleDropOptions
                        };
                        
                        var inputTwo = {
                                    endpoint: new jsPlumb.Endpoints.Rectangle(),
                                    reattach: true,
                                    anchor: "TopLeft",
                                    style: { width:12, height:10, fillStyle:inputColor },
                                    isSource: false,
                                    scope: "inputAnalog",
                                    connectorStyle:{ strokeStyle:inputColor, lineWidth:2 },
                                    connector: "Flowchart",
                                    isTarget:true,
                                    dropOptions : exampleDropOptions
                        };
                        
                        var outputColor = "#FF33FF";
                        var output = {
                                    endpoint: new jsPlumb.Endpoints.Rectangle(),
                                    reattach: true,
                                    anchor: "RightMiddle",
                                    style: { width:12, height:10, fillStyle:outputColor },
                                    isSource: true,
                                    scope: 'inputAnalog',
                                    connectorStyle:{ strokeStyle:outputColor, lineWidth:2 },
                                    connector: "Flowchart",
                                    connectorOverlays: overlays,
                                    isTarget:false,
                                    dropOptions : exampleDropOptions
                        };
                        jsPlumb.addEndpoint(idx, inputOne,{uuid:"ADDInputOne"});
                        jsPlumb.addEndpoint(idx,  inputTwo,{uuid:"ADDInputTwo"});
                        jsPlumb.addEndpoint(idx,  output,{uuid:"ADDOutput"});
                        jsPlumb.draggable($(".newbox"));
				endpointArray.push( jsPlumb.getEndpoint("ADDInputOne"));
				endpointArray.push( jsPlumb.getEndpoint("ADDInputTwo"));
                        endpointArray.push( jsPlumb.getEndpoint("ADDOutput"));
                        return endpointArray;
                  break
			
                  default:
                        alert("WORK IN PROGRESS")
            
            }
            
      }
      
      jsPlumb.bind("jsPlumbConnection", function(connInfo) { 
            var obj2 = new NodeClass();
		obj2.creatingLink(connInfo.sourceId,connInfo.targetId,connInfo);
		//init(connInfo.connection);
            obj2.storingConnectionInfo(connInfo.connection,connInfo.sourceId,connInfo.targetId);
      });
	
	jsPlumb.bind("jsPlumbConnectionDetached", function(connInfo) {
		var obj2 = new NodeClass();
           // init(connInfo.connection);
		obj2.unLinking(connInfo.sourceId,connInfo.targetId);
            console.log("a connection was detached from " + connInfo.sourceId + " and " + connInfo.targetId);
      }); 
      
}) (this);
