//using closure to craete diagrams
var l1 = 20,l2 = 20, /*series */counttimer = 1, l =50 /*parallel */,seriesSegment = [] , j =40,p=0,xpos=0,up = 0,complexmode = 0,lt=0,flag = -1;
var paper,add = [],state = [],cnt=0,y,y1= 0,b = 0,cl=0,countcomplex = 0 ,mode = 1,delaycounter,toff = [],counterflag =0/*branch */;
var x = 30, k = 5,noofRung =0,m = 55,n = 50,rungpos =0,countrung = 0,bottomline = [], rectobj,cc,psval,en,acc,cu,countercount =1;
var collection = [],countsegment = 0,dwn,stc ,seriescount=0,rect = [],segid = 0,r = 0,run=0,s,bl=0,index=0,xlen=0,seg=-1,rectout = [];ind =0;
var timerflag = 0,latchflag = [],text,stt,t1=0,f=1,latchstate=[],presetinfo=0,ypos=0,outname=0, timect =0,delaycounter = 0,Dolstarter =0 ,incdistance = 0;;
var Timer = [],Counter = [],top = 163 , resetchk = false , CounterNode = [] ,yval , latchbox = [] , outputchk = 0 ,node1,node2, secondnode ,firstnode = 1 , line = [],len = 0;
var dn,obj,pid = false ,AC = false,textDATA , objAC;
var createseries = function()
{

	for(l1 = 20 ; l1 <=720;l1 = l1 +100)
	{
		seg++;
		
		seriesSegment[seg] = paper.path("M "+l1+" "+l2+" l 90 0 ").attr({stroke: "black"});
		seriesSegment[seg].x = l1;
		seriesSegment[seg].id = seg;
		//alert("seg: "+seriesSegment[seg].x+" id : "+seriesSegment[seg].id)
		
	}
	
};
var createparallel = function()
{
	//l = l+y1+p;
	//k=5;
	//alert(p)
	l = p + l; 
	//p = 0;
	//alert("counter "+p+"l : "+l)
	var parallelSegment = paper.path("M 20 "+l+" l 0 "+y1+" ");
	l = l+y1;
	l2 = l + l2;
	//p = p + l; 	//new parallel line
	//alert(" p : "+p+"l "+l)
	createseries();
	outname++;
	noofRung = 0,b = l,x = 30; //reseting all values used in makking rung
	//l2 = l2 + 20;l = l + 20;j = 40;//reseting box values
	j = 40;
	//if(latchflag[latchflag.length-1] == 0)
	//	state.length = 0;
	//alert("Parallel state len "+state.length)
	//cnt=0//reseting the state
	n = p + n ;
	//alert("n : "+n+" P : "+p)
	rungpos =0;
	m = 55,run = 0,seriescount=0;;
	k = l+k+5;
	p = l + 5;
	//alert("k "+k+" p "+p)
}
var drawrung = function(positionx,ypos)
{
	//alert("b. : "+b)
	xlen=b+50;
	 x = positionx -10; //branch on new  segment
	y1 = ypos + b;
	//alert("ÿ1 "+y1)
	if(noofRung < 5)
	{
		
		var line = paper.path("M "+x+" "+y1+" l 0 50 ");
		y1 = y1+50;
		bottomline[bl] = paper.path("M "+x+" "+y1+" l 70 0 ").attr({stroke: "black"})
		x= x +70;
		var line = paper.path("M "+x+" "+y1+" l 0 -50 ").attr({stroke: "black"});
		x = x+10; //new branch on same segment
		noofRung++;
		bl++
		seriescount++;
	}
	else
	 alert("You can Add only 5 Rung")
	
}

var createcomplex = function(xpos,ypos)
{
	
	if(firstnode==1){
	 node1 = xpos - 20;
	alert("Select next node and click on add complex button")
	firstnode = 0
	secondnode =1;
	
	}
	else if(secondnode == 1){
	 var node2 = ypos //it should take the k
	  node2x = xpos;
		var	no = node2x - node1 + 60
	var line = paper.path("M "+node1+" "+node2+"  l 0 "+(50+xlen)+"  ")//l 180 0
	//alert("y before:  "+y+"x: "+x)
	node2= node2+xlen+50 
	//alert("y after:  "+y+"x: "+x)
	bottomline[bl] = paper.path("M "+node1+" "+node2+" l  "+(no)+" 0");
	node1=node1+no;
	//alert("x: "+x)
	var line= paper.path("M "+node1+" "+node2+" l 0  -"+(node2-20)+" ")
	bl++;
	seriescount++;
	k=5+p+node2-20
	//alert(" K : "+k+" P "+p+" node2 "+node2)
	
	secondnode = 0
	firstnode = 1
	//ypos = ypos + no;
	m =node1 - 20;
	n = node2 + 25;
	
	}
	else 
	alert("SYANTAX ERROR: Node has to be selected first")
	
}
var createrung = function(positionx,positiony)
{
	seriesSegment[positionx];
	drawrung(positionx,positiony);
	b= b+50; 
}
Raphael.fn.createbox = function(j,st,status)
		{
			//alert("countcomplex "+countcomplex)
			if(countrung != 0)
			{
				//alert(k)
				k = rect[r-1].k - 15 + 50 ;  //for creting box on rung 
				//alert(k)
				j =  xpos;
				//alert(j)
			//	m = 50;//X
				//n= n+50;//Y
				countrung--;
			}
			if(countcomplex == 2)
			{
				j = node2x;
				//countcomplex = 0
				incdistance = incdistance + 20;  //increaemnet distance between 2 segmenst
				countcomplex = 0;	
			
			}
			else 
			{
				//to draw a box on new segement
				seriescount++;	
				//alert("createbox "+k)
			}
			var k1 = k 
			if(st==1 && status ==0 || st == 0 && status == 1)
				rect[r] = paper.rect(j,k1,50,30).attr({fill : "green"}) // 
			else
				rect[r] = paper.rect(j,k1,50,30).attr({fill : "white"})
			k1 = k1+15;
			line[len++] = paper.path("M "+j+" "+k1+" l 15 0 l 0 10 l 5 0");
			j = j+15
			line[len++] = paper.path("M "+j+" "+k1+" l 0 -10 l 5 0");//+15
			if(status ==1)
			{
				var l =k1+10;
				 line[r] = paper.path("M "+j+" "+l+" l 20 -20");
			}
			j = j+20;
			line[len++] = paper.path("M "+j+" "+k1+" l 0 10 l -5 0");//+35
			line[len++]= paper.path("M "+j+" "+k1+" l 0 -10 l -5 0"); 
			line[len] = paper.path("M "+j+" "+k1+" l 15 0"); 
			m = j - 20
			n = k1 + 25;
			//alert("CRETE INPUT "+m+" n "+n)
			rect[r].segid = r; 
			rect[r].j = j;
			rect[r].k =  k1;
			rect[r].line = len;
			//alert("create  xpos  "+rect[r].j +" ypos "+rect[r].k)
			r++;
			len++;
			return rect[r-1];
		}

var showinfo = function(ad,s,chk,xpos,ypos,ro,r)
{
	var boxj =0;
	
	$("#information").dialog({
			autoOpen: true,
			height: 300,
			closeOnEscape : true,
			draggable : true,
			resizable : true,
			width: 300,
			create : function()  {
						$("#show").append( 
						"<td>" + ad +" :"+ "</td>" + 
						"<td>" + s + "</td>")
						},
			buttons : {
				"Toggle": function() 
				{
					if(s==1)
						state[ro] = 0;
					else
						state[ro] = 1;
					
					if(counterflag != 0)  
						CounterNode[CounterNode.length-1].State = state[ro]
					if(Dolstarter == 1)
					{
						for(var i =0;i<latchbox.length;i++){
							if(latchbox[i].Address == ad)
								latchbox[i].State = state[ro]
								break;
								}
					}
					$('#show').append( "<td>"+ " ->"+ "</td>" + 
						"<td>" + state[ro] + "</td>" + "</tr>"
						) //find remove function and den add value
					if(chk == 0)
					{//$.("#option").delegate("div","click",null,function(e){
					//})
						k = ypos -15;
						//alert(k)
						var bx = paper.createbox(xpos,state[ro],0)
						bx.node.onclick = function() 
						{
								latchstate[latchstate.length-1] = 0
								 xpos = bx.j - 35;
								ypos = bx.k;
									//seriescount --;
								//alert("xpos in onclick : "+xpos)
									//alert("state of ro "+state[ro]+" rectobj : "+ro)
								showinfo(collection[ro].Address,state[ro],chk,xpos,ypos,ro)
						
						}
					}
					else
					{
						k = ypos -15;
						//alert(k)
						var bx = paper.createbox(xpos,state[ro],1)
						bx.node.onclick = function() 
						{
								latchstate[latchstate.length-1] = 1
								//var rectobj  = bx.segid;
								 xpos = bx.j - 35;
								 ypos = bx.k;
									//seriescount --;
								//	alert("close : state of ro "+state[ro]+" rectobj : "+ro)
								showinfo(collection[ro].Address,state[ro],chk,xpos,ypos,ro)
						
						}
					}
					//outname=1;
				//	alert("outputchk "+outputchk)
					if(outputchk == 1 && AC == false ){
						textDATA.remove() ; 
						calculate();}
					else if(AC == true){
						var y = state[state.length-1];
						//alert("toggle Y : "+y+" objAC "+objAC)
						objAC.calculateAC(y);
						outputchk =1
					}
					$( this ).dialog( "close" );	
					$( "#result" ).append( "<tr>" +
							"<td>" + ad +" :"+ "</td>" + 
							"<td>" + state[ro] + "</td>" + "<td>" + "Toggled value"+"</td>"  );
				},
				"Add Rung": function()
				{
					if(mode == 2)   	//only togglling depends on mode n mode =2 whn it enters into execution state
							alert("Go into Development Mode to add Circuit")
					else
						{
					createrung(xpos,ypos); 
					m = xpos + 20
					n = ypos + 70;
					//alert("m: "+m+" n "+n)					//creating rung on selected element
					countrung++;
					
				   }
				  
				},
				"Add Complex": function()
				{
						complexmode = 1
						if(mode == 2)
							alert("Go into Development Mode to add Circuit")
						else
						{
							//alert("complex:  xpos  "+xpos+" ypos "+ypos)
							createcomplex(xpos,ypos)
							xlen=  70 + b
							
							if(countcomplex<2)
							{
							xlen = xlen+ypos;
							//alert("xlen IN cc "+xlen+" YPOS "+ypos)
							cc=countsegment - countcomplex;
							//countrung++;
							countcomplex++;
						//	alert(" countcomplex "+countcomplex)
							cl =countcomplex - 1
							$( this ).dialog( "close" );
							}
						}
				},
				"Delete" : function()
				{
					var ll = r.line;
					//alert("len : "+ll+"r.line : "+r.line)
					for(var i=ll-4;i<ll;i++)
						line[i].remove();
					r.remove();
					$( this ).dialog( "close" );
					text.remove();
					j = xpos;
					m = xpos
					// deleting the data from collection collection[r]
					$( this ).dialog( "close" );
				},
				"Done": function() 
				{
					$( this ).dialog( "close" );
					//remove the first address
					
				}		
			},
})
//m = 55;
}
var addressbox = function(check)
	{
		$( "#dialog-form" ).dialog({
			autoOpen: true,
			closeOnEscape : true,
			draggable : true,
			resizable : true,
			height: 200,
			width: 100,
			modal: true,
			buttons : { // array should take only perfect Values
				"Done": function() {
					var ad = $('#addressinfo').val();
					 s = $('#valueinfo').val();
					//alert(ad+""+s)		
					if(ad == ""|| s == "")
					{	alert("Enter Address and value ");		}
					else if(s == 1 || s == 0)
					{
							$( "#result" ).append(  "<tr>" +
							"<td>" + $('#addressinfo').val() +" :"+ "</td>" + 
							"<td>" + $('#valueinfo').val() + "</td>" 	
							//"<td>" + "         "+"</td>"
							 );  //RESULT should  also show changed values
							add[cnt] = $('#addressinfo').val();
							state[cnt] = $('#valueinfo').val();
							var json = {"Address" : ad,"State" : s , "Segment" : countsegment}
							collection.push(json);
							countsegment++;
							$( this ).dialog( "close" );
							$('#addressinfo').val("");
							$('#valueinfo').val("");
							cnt = cnt +1;
						
						if(check == 0)
						{
							//if(x<30) //x values for box adjuctment
						//	alert("before creating box no rect  "+j)
							var r = paper.createbox(j,state[cnt-1],0)
							r.node.onclick = function() 
							{
								var rectobj  = r.segid;
								xpos = r.j - 35;
								var ypos = r.k;
								m = xpos + 20
								n = ypos + 70;
								//alert("Done "+m+" n "+n)
								if(ypos<p)
									k = ypos - 15
							//	alert(state[rectobj])
								//alert("in addtress box xpos at close : "+xpos+"rectobj : "+rectobj+"ypos : "+ypos)
								showinfo(collection[rectobj].Address,state[rectobj],check,xpos,ypos,rectobj,r)
							
							}
						
						}
						else if(check == 1)
						{
							var r=paper.createbox(j,state[cnt-1],1)
							r.node.onclick = function() 
							{
								var rectobj  = r.segid;
								 xpos = r.j - 35;
								var ypos = r.k;
								 m = xpos + 20
								n = ypos + 70
								//alert(ypos+""+p)
								if(ypos<p)
									k = ypos - 15
								//alert(state[rectobj])
								showinfo(collection[rectobj].Address,state[rectobj],check,xpos,ypos,rectobj,r)
							}
						}
						var adddata  = add[cnt-1];
						var valdata = state[cnt-1];
						//alert("affter additionv "+m+" "+n)
						 text = paper.text(m,n,adddata+": "+valdata ).attr({'font-size': 12
						//to show change value on the object yet not done
						}); 
					//	 m = m+105;
						//alert("dialog frame state len "+state.length)
					
					if(countrung == 0 && p ==0 || countcomplex !=2)
							{
								j=rect[index].j + 65;
								index++;//alert("J countrung "+j); 
								  b= 0, k=5+p
								//  alert("countrung K: "+k+" J: "+j)
							}
					 // alert(" seriescount: "+seriescount)
									
					}
					else
					  alert("Value should be in range of  0 or 1"); 
					
				}
			},

		});
	//}
}
	
	var createopen = function()
	{

		if(countrung >0)
				addressbox(0)
		else
		for(var i =0 ;i<seriesSegment.length ; i++) //use each from underscore.js
				addressbox(0);
	}
	var createclose = function()
	{
		for(var i =0 ;i<seriesSegment.length ; i++) //use each from underscore.js
			addressbox(1);
	}

var createTimeroff  = function()
{
	timerflag =2  
	var k2 = k   //for detecting wether user has selected timer 
	var timer = paper.rect(570,k2,150,150).attr({fill : "white"})
	var line = paper.path("M 720 20 l 20 0").attr({stroke : "black"})
	
	 en = paper.createoutput(0,k2,-1)
	 $("#tname").html("Timer T"+counttimer)
	 counttimer++;
	
	$("#Timers").show("fast")
	 var entext = paper.text(700,k2+15,"EN").attr({
                      'font-size': 12 });
	
					  
	var line = paper.path("M 720 75 l 50 0").attr({stroke : "black"})
	k2=k2+55
	 dn = paper.createoutput(0,k2,-1)
	var dntext = paper.text(700,k2+15,"DN").attr({'font-size': 12 })
		
	var line = paper.path("M 720 130 l 50 0").attr({stroke : "black"})
	k2=k2+55;
	acc = paper.createoutput(0,k2,-1)
	var tt = paper.text(700,k2+15,"TT").attr({ 'font-size': 12 })
	p = p +120;
}
var createTimeron = function()
{
	timerflag =1;
	//top = top+k
	//alert("k "+k+" p "+p)
	var k1 = k 
	//$("#Timers").css("top",top)
	//alert("k1  "+k1+"top "+top)
	var timer = paper.rect(570,k1,150,150).attr({fill : "white"})
	var line = paper.path("M 720 20 l 20 0").attr({stroke : "black"})
	$("#tname").html("Timer  : T"+counttimer)
	counttimer++;
	 en = paper.createoutput(0,k1,-1)
	
	$("#Timers").show("fast");		
	 var entext = paper.text(700,k1+15,"EN").attr({
                      'font-size': 12 });
	
	k1=k1+55		

	var line = paper.path("M 720 "+(k1+15)+" l 50 0").attr({stroke : "black"}) //55
	
	dn = paper.createoutput(0,k1,-1)
	var dntext = paper.text(700,k1+15,"DN").attr({'font-size': 12 })
	k1=k1+55; 
	var line = paper.path("M 720 "+(k1+15)+" l 50 0").attr({stroke : "black"}) //75
	
	acc = paper.createoutput(0,k1,-1)
	var tt = paper.text(700,k1+15,"TT").attr({ 'font-size': 12 })
	p = p +120;
	
}
Raphael.fn.createoutput = function(st,k,ul)
{
		var o = 740; 
		outputchk =   1;
	//	alert(k)
		var k1 = k ;
		//alert(ul)
		if(st==1)
			rectout[ind] = paper.rect(o,k1,50,30).attr({fill : "green"}) 
		else
			rectout[ind] = paper.rect(o,k1,50,30).attr({fill : "white"})
		k1=k1+15		
		var line = paper.path("M "+o+" "+k1+" l 15 0 ");   
		o =o+20;
		k1 = k1-8
		var circle = paper.path("M "+o+" "+k1+" c -5 10 -5 16 0 20") //12
		if(ul == 1)
		{
			o =o+5;
			var text = paper.text(o,k1+8,"L").attr({ 'font-size': 16 })
			o=o+5;
		}
		else if(ul == 0)
		{
			o =o+5;
			var text = paper.text(o,k1+8,"U").attr({ 'font-size': 17 })
			o=o+5;
		}
		else if(ul == 2)
		{
			o =o+5;
			var text = paper.text(o,k1+8,"R").attr({ 'font-size': 17 })
			o=o+5;
		}
		else{
			o=o+10 ; 
			}
		var circle = paper.path("M "+o+" "+k1+" c 5 10  5 16 0 20")//12
		o = o+2;
		k1 = k1 + 8
		var line = paper.path("M "+o+" "+k1+" l 17 0")//20
		j =35;
		//alert("K1 : "+k1)
		if(textDATA == undefined)
				textDATA = paper.text(750,k1+30,"Y"+outname+":"+st ).attr({
                      'font-size': 12 //to show address on the object yet not done
			});
		else
		textDATA.remove();
		rectout[ind].k = k1;
		
		ind++;
		return rectout[ind-1]
}
var checklatchstate = function()
{
	var arr1= [],arr0 = [];
	while(latchflag.length !=0){
	var element = latchflag.pop();
	//alert(element)
	if(element==1)
		arr1.push(element);
	else
		arr0.push(element)
	}
	//alert("arr1  "+arr1+" length "+arr1.length )
	//alert("arr2  "+arr0+" length "+arr0.length )
	if(arr1.length == arr0.length)
		{latchflag.length = 0
		return 1}
	else
	return 0;
}
var truthtable = function()
{
	//calculating the output
//	alert(state)
	for(var i =0;i< state.length  ; i++)
	{
		
		if(state[i] == 1 && state[i-1] == 0 || state[i] == 0 && state[i-1] == 1 || state[i] == 0 && state[i-1] == 0 || state[i] == 0  ) 
		{
			y = 0;
			//k = 5+p
			//alert("reset : "+resetchk)
		//	alert(latchflag[0]+" "+latchflag[1])
			if(flag == 1 ) //check wether unlatch added or not
			{	
				  //it checks pair of latch and unlatch
					var firstbox = latchbox[0].State //stores the first box state
					var secondbox = latchbox[1].State
				//	alert(" "+firstbox+"  "+secondbox)
					if(firstbox == 0 && secondbox ==1 || firstbox == 0 && secondbox ==0 )
					{
						//alert("0")
						paper.createoutput(0,k,0).node.onclick = function() { alert("Output cannot be toggled")}
						paper.createoutput(0,rectout[0].k-15,1).node.onclick = function() { alert("Output cannot be toggled")}
					}
					else if(firstbox == 1 && secondbox ==0 || firstbox == 0 && secondbox ==0)
					{
						//alert("1")
						paper.createoutput(1,rectout[1].k-15,0).node.onclick = function() { alert("Output cannot be toggled")}
						paper.createoutput(1,rectout[0].k-15,1).node.onclick = function() { alert("Output cannot be toggled")}
					}
					//else 
					//	paper.createoutput(1,k,0).node.onclick = function() { alert("Output cannot be toggled")}
			}		
			else if(flag == 0)
				{
					alert("Add a Unlatch ")
					break
				}
				
			else if(resetchk == true) { 
				paper.createoutput(0,k,2).node.onclick = function() { alert("Output cannot be toggled")} 
				reset.st = 0;
				}
			else if(countrung == 0 && countcomplex ==0){
				//alert("countrung : "+countrung+" countcomplex: "+countcomplex)
				paper.createoutput(0,5,-1).node.onclick = function() { alert("Output cannot be toggled")} 
				}
			else
					paper.createoutput(0,k,-1).node.onclick = function() { alert("Output cannot be toggled")}
			
		}
		else //if(state[i] == 1 && state[i-1] == 1 || state[i] == 1 )
		{	
			y = 1;
			//alert("reset : "+resetchk)
			if(flag == 1 ) //check wether unlatch added or not
			{
					if(firstbox == 0 && secondbox ==1 || firstbox == 0 && secondbox ==0 )
					{
						paper.createoutput(1,k,0).node.onclick = function() { alert("Output cannot be toggled")}
						paper.createoutput(1,rectout[0].k-15,1).node.onclick = function() { alert("Output cannot be toggled")}
					}
					else if(firstbox == 1 && secondbox ==0 || firstbox == 0 && secondbox ==0)
					{
						paper.createoutput(0,k,0).node.onclick = function() { alert("Output cannot be toggled")}
						paper.createoutput(0,rectout[0].k-15,1).node.onclick = function() { alert("Output cannot be toggled")}
					}
			}		
			else if(flag == 0)
				{
					alert("Add a Unlatch ")
					break
				}
			else if(resetchk == true){
				 paper.createoutput(1,k,2).node.onclick = function() { alert("Output cannot be toggled")} 
				 reset.st = 1;
				 }
			else if(countrung == 0 && countcomplex ==0){
				//alert("countrung : "+countrung+" countcomplex: "+countcomplex)
				paper.createoutput(1,5,-1).node.onclick = function() { alert("Output cannot be toggled")} 
				}	
				
			else 	
				paper.createoutput(1,k,-1).node.onclick = function() { alert("Output cannot be toggled")}
		
		}
	}
	var line = seriescount - bottomline.length;
	for(var i=0;i<line;i++)
		seriesSegment[i].attr({stroke : "green" ,'stroke-width': 3 })
	for(var i=0;i<bottomline.length;i++)
		bottomline[i].attr({stroke : "green" ,'stroke-width': 3 })
	seriesSegment[seriesSegment.length-1].attr({stroke : "green" ,'stroke-width': 3 })
	
	var adddata  = "Y"+outname;
	var valdata = yval = y;
	//alert("K : "+k)
	textDATA = paper.text(750,k+45,adddata+":"+valdata ).attr({
                      'font-size': 12 //to show address on the object yet not done
	});
	var json = {"Address" : "Y","State" : y , "Segment" : seriesSegment.length -1}
							collection.push(json);
	//alert(reset.k+" "+reset.st)				
}
Raphael.fn.createlatch = function()
{
	latchflag[lt] = 1
	paper.createoutput(0,k,1)
	Dolstarter = 1
	lt++;
	//alert("Address"+collection[collection.length-1].Address+"State"+state[state.length-1])	
	var json = {"Address" : collection[collection.length-1].Address ,"State" : state[state.length-1] }
	latchbox.push(json)
}
Raphael.fn.createunlatch = function()
{
	latchflag[lt] = 0;
	paper.createoutput(0,k,0)
	lt++;
	Dolstarter = 1
	//alert("Address"+collection[collection.length-1].Address+"State"+state[state.length-1])
	var json = {"Address" : collection[collection.length-1].Address ,"State" : state[state.length-1] }
	latchbox.push(json)
}
var display = function()
{
for(var i=0;i<collection.length;i++)
	alert("state "+collection[i].State+"  Add : "+collection[i].Address)

}

var calculate = function()
{

	if(outputchk == 0)
		alert("SYNTAX ERROR : Output box  Required")
	else
	{
	run =0;
	mode=2;
	
	if(Dolstarter == 1) {
		flag = checklatchstate()
		truthtable(); }
	
	else if(timerflag!= 0)
	{
	
		if(timerflag == 1)
		{
			re = state[state.length-1];
			if(resetchk == true) //reset is taken den
			{
				
					if(re == 1)
						reset.st = 1
					else
						reset.st = 0
					//alert("re "+reset.st)
					if(re == 0)   
						{	
						var y = state[state.length-2];
					//	alert("y : "+y)
						paper.createoutput(0,reset.k - 15 ,2)
						calculateTOn(y); 
						}
						
					else  { //resetting the bit
						//calculatedwncntr(0); 
						truthtable();
						delaycounter  = 0;
						calculateTOn(0)
						paper.createoutput(1,reset.k - 15 ,2)	
						}
					
			}
			else
			{
			truthtable();
			//alert("state[state.length-1] : "+state[state.length-1])
				
			calculateTOn(state[state.length-1]);
			}
		}	
		else
		{
			re = state[state.length-1];   //timer off
			if(resetchk == true) //reset is taken den
			{
				
					if(re == 1)
						reset.st = 1
					else
						reset.st = 0
					if(re == 0)   {	
						var y = state[state.length-2];
					//	alert("y : "+y)
						calculateTOff(y); 
						paper.createoutput(0,reset.k - 15 ,2)
						}
					else  { //resetting the bit
						//calculatedwncntr(0); 
						truthtable();
						calculateTOff(0)
					paper.createoutput(1,reset.k - 15 ,2)
						}
			}
			else	{
			truthtable();
			calculateTOff(state[state.length-1]);
			}
		}
	}
	else if(counterflag!= 0)
	{
		if(counterflag == 1)   //upcounter
		{
			re = state[state.length-1];
			if(resetchk == true) //reset is taken den
			{
				
					if(re == 1)
						reset.st = 0
					else
						reset.st = 1
				//	alert("re "+reset.st)
					if(re == 0)   //not resetting the bit
						//alert("reset.st")
							//var gg = state.pop();
							//alert(state)
						{	y = CounterNode[0].State;//state[state.length-2];
				//		alert("y : "+y)
						calculateUpcntr(y); 
						paper.createoutput(0,reset.k - 15 ,2)}
						
					else   //resetting the bit
					{
						calculateUpcntr(0); 
						$("#Accupcntr").html("Acc : 0")
						paper.createoutput(1,reset.k - 15 ,2)
						var en1 = 	paper.createoutput(0,cuk,-1)  //which make the y node also reset
						var dn1 = paper.createoutput(0,dnk,-1)
						}
				
			}
			else{
			truthtable();
			calculateUpcntr(state[state.length-1]);}
		}
		else   //down counter
		{ 
			
			//calculatedwncntr(); 
			re = state[state.length-1];
			if(resetchk == true) //reset is taken den
			{
				
					if(re == 1)
						reset.st = 1
					else
						reset.st = 0
					//alert("re "+reset.st)
					if(re == 0)   
						{	 var y = state[state.length-2];
					//	alert("y : "+y)
						calculatedwncntr(y);
						paper.createoutput(0,reset.k - 15 ,2)	}
						
					else  { //resetting the bit
						//calculatedwncntr(0); 
						truthtable();
						var en1 = 	paper.createoutput(0,cuk,-1)
						var dn1 = paper.createoutput(0,dnk,-1)
							$("#Accdwncntr").val(" ");
							paper.createoutput(1,reset.k - 15 ,2)
						}
					
			}
			else
			{
			truthtable();
			//alert("state[state.length-1] : "+state[state.length-1])
			calculatedwncntr(state[state.length-1]);
			}
				
		}
	}
	else {
	truthtable();
	//alert("Y : "+yval)
	$("#result").append(
	"<td>" + "Y"+outname +" : "+"</td>" + "<td>" + yval + "</td>" + "</tr>") //output calculation
	}
	
  }
}

var autorefresh = function()
{
	if(timect<presetinfo )
	{
		timect = timect+interval;
		$("#Acc").html("Acc : "+timect) 
		window.setTimeout(autorefresh, psval);
	}
	else 
	{
		delaycounter  = 0;
		if(timerflag == 1)
			var dn1 = paper.createoutput(1,dnk,-1)
		else
			var dn1 = paper.createoutput(0,dnk,-1)
		var acc1= paper.createoutput(0,acck,-1)
	}
				
}		
var calculateTOn = function(stt)
{
	var dnstate = 0;
	var accstate = 1;
	dnk = dn.k-15;   //after  running box gets mispalced dats y -15 is done 
	acck = acc.k-15
	enk = en.k - 15
		
	if(stt ==1)
	{
		var en1 = paper.createoutput(1,enk,-1)
		dnstate = 0;
		accstate = 1
		var dn1 = paper.createoutput(0,dnk,-1)
		var acc1 = paper.createoutput(1,acck,-1)
		presetinfo =$("#preset").val();
		//alert("preset info : "+presetinfo)
		delaycounter = ( presetinfo * psval  )  
		//alert("delay counter "+delaycounter)
		interval = (presetinfo/delaycounter) * 100
		//alert("psval  "+psval)
		/*if(psval == 10)
			psval = psval / 1000
			else
			psval = psval * 1000
		*/
		autorefresh();
		dnstate = 1;
		accstate = 0
		$('input:radio[name=time]').click(function() {
			  psval = $('input:radio[name=time]:checked').val()
			})
	}
	if(stt == 0)
	{
		var en1 = paper.createoutput(0,enk,-1)
		 dnstate = 0;
		 accstate = 0
		 timect = 0;
		var dn1 = paper.createoutput(0,dnk,-1)
		var acc1 = paper.createoutput(0,acck,-1)
		$("#Acc").html("Acc : 0")
	}
	
	
	var line = seriescount - bottomline.length;
	for(var i=0;i<line;i++)
		seriesSegment[i].attr({stroke : "green" ,'stroke-width': 3 })
	for(var i=0;i<bottomline.length;i++)
		bottomline[i].attr({stroke : "green" ,'stroke-width': 3 })
	seriesSegment[seriesSegment.length-1].attr({stroke : "green" ,'stroke-width': 3 })
	$("#result").append("<tr>" + "<td>" + "En :" + "</td>"  + "<td>" + stt+ "</td>"  + "</tr>" +
						"<tr>" + "<td>" + "dn :" + "</td>"  + "<td>" + dnstate+ "</td>"  + "</tr>" +
						"<tr>" + "<td>" + "Acc :" + "</td>"  + "<td>" + accstate+ "</td>" + "</tr>"	)
	
	
	var json = {"Address" : "T"+counttimer+".en","State" : stt }
	Timer.push(json);
	var json = {"Address" : "T"+counttimer+".dn","State" : dnstate }
	Timer.push(json);
	var json = {"Address" : "T"+counttimer+".Acc","State" : accstate }
	Timer.push(json);
	
}

var calculateTOff = function()
{
	var dnstate = 1;
	 dnk = dn.k-15;   //after  running box gets mispalced dats y -15 is done 
	 enk = en.k - 15
	  acck = acc.k-15
	for(var i =0;i< state.length  ; i++)
	{
		if(state[i] == 1 && state[i-1] == 0 || state[i] == 0 && state[i-1] == 1 || state[i] == 0 && state[i-1] == 0 || state[i] == 0  ) 
		{
			stt = 0;
			toff[t1]  = stt;
			t1++;
		}
		if(state[i] == 1 && state[i-1] == 1 || state[i] == 1 ) 
		{
			stt = 1
			toff[t1]  = stt;
			t1++;
		}
	}
	var en1 = paper.createoutput(stt,enk,-1)
	if(toff[0] == 0 && toff.length == 1){
		dnstate = 0;
		 timect = 0;
		var dn1 = paper.createoutput(0,dnk,-1)
		 var acc1 = paper.createoutput(0,acck,-1)
		$("#Acc").html("Acc : 0")	
	}
	else if (toff[toff.length - 1 ] == 0 &&  toff[toff.length - 2 ] == 1) {
		
		dnstate = 1;
		accstate = 1
		var dn1 = paper.createoutput(1,dnk,-1)
		var acc1 = paper.createoutput(1,acck,-1)
		presetinfo =$("#preset").val();
		//alert("preset info : "+presetinfo+" psval "+psval)
		$('input:radio[name=time]').click(function() {
			  psval = $('input:radio[name=time]:checked').val()
			})
		psval = psval * 1000
		delaycounter = ( presetinfo * psval  )  
		//alert("delay counter "+delaycounter)
		/*if(psval == 10)
			psval = psval /1000*/
		interval = (presetinfo / delaycounter) * 1000
		//alert("psval  "+psval)
		autorefresh();
		dnstate = 0;
		
		//alert(timect)
		//alert(""+timect+" psval "+psval+" presetinfo "+presetinfo+" delaycounter "+delaycounter+" interval "+interval)
	}
	else {
		dnstate = 1;
		accstate = 0;
		timect =0;
		//alert(timect)
		var dn1 = paper.createoutput(1,dnk,-1)
		 var acc1 = paper.createoutput(0,acck,-1)
		$("#Acc").html("Acc : 0")
	}
	
	//alert(toff[toff.length - 1 ]+" "+toff[toff.length - 2 ])
	//for indicating the green line on segments
	var line = seriescount - bottomline.length;   
	for(var i=0;i<line;i++)
		seriesSegment[i].attr({stroke : "green" ,'stroke-width': 3 })
	for(var i=0;i<bottomline.length;i++)
		bottomline[i].attr({stroke : "green" ,'stroke-width': 3 })
	seriesSegment[seriesSegment.length-1].attr({stroke : "green" ,'stroke-width': 3 })	
	$("#result").append("<tr>"+"<td>" + "En :" + "</td>"  + "<td>" + stt+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + "dn :" + "</td>"  + "<td>" + dnstate+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + "dn :" + "</td>"  + "<td>" + accstate+ "</td>"  + "</tr>" );
						
	var json = {"Address" : "T"+counttimer+".en","State" : stt }
	Timer.push(json);
	var json = {"Address" : "T"+counttimer+".dn","State" : dnstate }
	Timer.push(json);
	var json = {"Address" : "T"+counttimer+".Acc","State" : accstate }
	Timer.push(json);
}
var createupcounter = function()
{
	counterflag =1  //for detecting wether user has selected timer 
	var counter = paper.rect(570,k,150,120).attr({fill : "white"})
	var line = paper.path("M 720 20 l 20 0").attr({stroke : "black"})
	var k = 5 +p
	cu = paper.createoutput(0,k,-1)
	 $("#counterup").show("fast")
	$("#cname").html("Counter  : C"+countercount)
	countercount++;
	 var cutext = paper.text(700,k+15,"CU").attr({
                      'font-size': 12 });
	
	var line = paper.path("M 720 75 l 50 0").attr({stroke : "black"})
	k=k+55
	 dn = paper.createoutput(0,k,-1)
	var dntext = paper.text(700,k+15,"DN").attr({'font-size': 12 })
	p = p +100;
	//alert("counter "+p)
	var json = {"Address" : collection[collection.length-1].Address ,"State" : state[state.length-1] }
	//alert("Address"+collection[collection.length-1].Address+"State"+state[state.length-1])
	CounterNode.push(json)
}
var createdowncounter = function()
{
	counterflag =-1  //for detecting wether user has selected timer 
	var counter = paper.rect(570,k,150,120).attr({fill : "white"})
	var line = paper.path("M 720 20 l 20 0").attr({stroke : "black"})
	var k = 5 +p
	cu = paper.createoutput(0,k,-1)
	$("#counterdwn").show("fast")
	$("#cname").html("Counter  : C"+countercount)
	$("#presetdwncntr").html("0")
	$("#Accdwncntr").val("")
	countercount++;
	 var cutext = paper.text(700,k+15,"CU").attr({
                      'font-size': 12 });
	
	var line = paper.path("M 720 75 l 50 0").attr({stroke : "black"})
	k=k+55
	 dn = paper.createoutput(0,k,-1)
	var dntext = paper.text(700,k+15,"DN").attr({'font-size': 12 })
	p = p +100;
	var json = {"Address" : collection[collection.length-1].Address ,"State" : state[state.length-1] }
	//alert("Address"+collection[collection.length-1].Address+"State"+state[state.length-1])
	CounterNode.push(json)
}
var  createreset = function(st)
{
	resetchk = true;
	o = 740; 
	//alert(resetchk)
	var k1 = k
	
	if(st==1)
		 reset = paper.rect(o,k1,50,30).attr({fill : "green"}) 
	else
		reset = paper.rect(o,k1,50,30).attr({fill : "white"})
	k1=k1+15		
	var line = paper.path("M "+o+" "+k1+" l 15 0 ");   
	o =o+20;
	k1 = k1-8
	var circle = paper.path("M "+o+" "+k1+" c -5 10 -5 16 0 20") //12
	o =o+5;
	var text = paper.text(o,k1+8,"R").attr({ 'font-size': 15 })
	o=o+5;
	var circle = paper.path("M "+o+" "+k1+" c 5 10  5 16 0 20")//12
	o = o+2;
	k1 = k1 + 8
	var line = paper.path("M "+o+" "+k1+" l 17 0")//20
	j =35;
	reset.k = k1;
	return reset
}

var calculateUpcntr = function(stc)
{
//alert("up")
	var dnstate = 0;
	dnk = dn.k-15;   //after  running box gets mispalced dats y -15 is done 
	cuk = cu.k - 15
	/*for(var i =0;i< state.length  ; i++)
		{
			if(state[i] == 1 && state[i-1] == 0 || state[i] == 0 && state[i-1] == 1 || state[i] == 0 && state[i-1] == 0 || state[i] == 0  ) 
				stc = 0;

			if(state[i] == 1 && state[i-1] == 1 || state[i] == 1 ) {
				stc =1 ; up ++;
				}
		}*/
	
	var total = $("#presetupcnt").val();
//	$("#Accupcntr").html("Acc : 0")
	if(stc == 1)
	{
		up ++;
		//alert("stc : "+stc)
		var en1 = paper.createoutput(1,cuk,-1)
		var dn1 = paper.createoutput(0,dnk,-1)
		$("#Accupcntr").html("Acc : "+up)
	}
	
	else
	{
		var en1 = paper.createoutput(0,cuk,-1)
		var dn1 = paper.createoutput(0,dnk,-1)
	}
	 if(up == total ){ dnstate = 1;
		var en1 = paper.createoutput(1,dnk,-1) }
		else
		var dn1 = paper.createoutput(0,dnk,-1)
		
		
	//saving value in Counter value	
	var json = {"Address" : "C"+countercount+".cu","State" : stc }
	Counter.push(json);
	var json = {"Address" : "C"+countercount+".dn","State" : dnstate }
	Counter.push(json);
	
	//showing value on table
	var line = seriescount - bottomline.length;   
	for(var i=0;i<line;i++)
		seriesSegment[i].attr({stroke : "green" ,'stroke-width': 3 })
	for(var i=0;i<bottomline.length;i++)
		bottomline[i].attr({stroke : "green" ,'stroke-width': 3 })
	seriesSegment[seriesSegment.length-1].attr({stroke : "green" ,'stroke-width': 3 })	
	$("#result").append("<tr>"+"<td>" + "cu :" + "</td>"  + "<td>" + stc+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + "dn :" + "</td>"  + "<td>" + dnstate+ "</td>"  + "</tr>" )
						
	//counterflag  = 0;
}
var calculatedwncntr = function(stc)
{
	var dnstate = 0;
	dnk = dn.k-15;   //after  running box gets mispalced dats y -15 is done 
	cuk = cu.k - 15
	
	dwn = $("#Accdwncntr").val();
//	alert("stc  "+stc+"dwn : "+dwn)
	//var en1 = paper.createoutput(stc,cuk,-1)
	if(stc == 1)
	{
		dwn--
		//alert("dwn : "+dwn)
		var en1 = paper.createoutput(1,cuk,-1)
		var dn1 = paper.createoutput(1,dnk,-1)
		$("#Accdwncntr").val(dwn);
		dnstate = 1
	}
	else
	{
		var en1 = paper.createoutput(0,cuk,-1)
		var dn1 = paper.createoutput(1,dnk,-1)
		dnstate= 1
	}
	 
	if(dwn == 0) {
		var dn1 = paper.createoutput(0,dnk)
		dnstate = 0;} 
	else
		var dn1 = paper.createoutput(1,dnk)
	
	
	//saving value in Counter value
	var json = {"Address" : "C"+countercount+".cd","State" : stc }
	Counter.push(json);
	var json = {"Address" : "C"+countercount+".dn","State" : dnstate }
	Counter.push(json);	
	
	//showing value on table
	var line = seriescount - bottomline.length;   
	for(var i=0;i<line;i++)
		seriesSegment[i].attr({stroke : "green" ,'stroke-width': 3 })
	for(var i=0;i<bottomline.length;i++)
		bottomline[i].attr({stroke : "green" ,'stroke-width': 3 })
	seriesSegment[seriesSegment.length-1].attr({stroke : "green" ,'stroke-width': 3 })	
	$("#result").append("<tr>"+"<td>" + "cd :" + "</td>"  + "<td>" + stc+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + "dn :" + "</td>"  + "<td>" + dnstate+ "</td>"  + "</tr>" )
	//counterflag = 0
}

var PidOperation = function(){   //class called pidoperation
	
	var k1 = k;
	this.action
	this.type;
	this.kp;
	this.setpoint;
	this.max;
	this.min
	this.p0;
	this.ep
	this.control;
	this.mode;
	this.error = false;
	this.manualip;
	
	this.createPidBlock = function()
	{
		//check wetehr input is given or not
		var x = 570
		var pidbox = paper.rect(x,k1,150,120).attr({fill : "white" , 'stroke-width': 1 });
		k1 = k1+ 30 ;
		var fbin = paper.text(x+20 , k1  , "FBIN").attr({'font-size': 13 })
		var connect = paper.path("M "+x+" "+k1+" l -60 0 l 0 100 l 280 0 l 0 -100 l -70 0 ").attr({stroke: "red" ,'stroke-width': 1 })
		var fbin = paper.text(690 , k1  , "FBOUT").attr({'font-size': 13 })
		k1 = k1 + 60
		var inputline =  paper.text(590 , k1  , "IN").attr({'font-size': 13 })
		var line = paper.path("M "+x+" "+k1+" l -10 0")
		var outputline =  paper.text(690 , k1  , "OUT").attr({'font-size': 13 })
		x=x+155
		var line = paper.path("M "+x+" "+k1+" l -5 0")
		$("#pidconfg").show("fast");
		$("#pido").attr({ 'disabled' : true});
		p =p + 200
		pid = true;
	}
	this.togglechk = function()
	{
		if($('#chk').is(':checked'))
			$('#actionconf :input').attr('disabled', true);
		else
			$('#actionconf :input').removeAttr('disabled');
		alert("Set the Configuration for the control  You selected")
	}
	this.selmode = function()
	{
		for (var i=0; i < 2; i++)
		{
			if (document.pidshow.radio[i].checked) 
				this.mode = document.pidshow.radio[i].value;
		}
		if( this.mode ==  "auto"){
			$("#actionconf").show("slidedown");
			$("#chk").show("slidedown");
			$("#chkl").show("slidedown");
			$("#manualdata").hide();
			this.mode= "Auto";
		}
		else if(  this.mode ==  "manual"){
			//alert("off "+this.mode)
			$("#actionconf").hide()
			$("#chk").hide()
			$("#chkl").hide()
			$("#manualdata").show();
			sc = 1;
			this.mode = "Manual";
			
		}
		$("#result").append("<tr>"+"<td>" + "Mode :" + "</td>"  + "<td>" + this.mode+ "</td>"  + "</tr>" );
	}
	this.configuration = function()
	{
		var s,a;
		for (var i=0; i < 2; i++)
		{
			if (document.pidshow.radioa[i].checked) 
				this.action = document.pidshow.radioa[i].value;
		}
		for (var i=0; i < document.pidshow.radioc.length; i++)
		{
			if (document.pidshow.radioc[i].checked) 
				 this.control = document.pidshow.radioc[i].value;
		}
		if(this.control != "p" && this.action != "")
			$("#typeconf").show("slidedown")
		else
		{	$("#typeconf").hide();
			$("#result").append("<tr>"+"<td>" + "Action :" + "</td>"  + "<td>" + this.action+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + "Control :" + "</td>"  + "<td>" + this.control+ "</td>"  + "</tr>");
		}
	
	}
	this.typeconfiguration = function()
	{
	for (var i=0; i < 2; i++)
		{
			if (document.pidshow.radiot[i].checked) 
				this.type = document.pidshow.radiot[i].value;
		}	
		$("#result").append("<tr>"+"<td>" + "Action :" + "</td>"  + "<td>" + this.action+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + "Control :" + "</td>"  + "<td>" + this.control+ "</td>"  + "</tr>" + 
						"<tr>"+"<td>" + "Type :" + "</td>"  + "<td>" + this.type+ "</td>"  + "</tr>")
	}
	//var scopeEp = this
	this.calcultaeEp = function(sp,max,min,input)
	{
		
		if(isNaN(input))
			alert("Enter Input")
		var ep = (input - sp)/(max - min) * 100;
		
		return ep;
	}
	this.calculateControl = function(ctrl,ep , Control)
	{
		//alert(Control.Kp+" "+Control.Bios+" Control : "+ctrl+" ep "+ep+"  "+Control.T+" kI "+Control.Ki)
		var type = this.type;         
		var self = this;
		switch(ctrl)
		{
			case "p" : self.p = (Control.Kp * ep + Control.P0);
					//alert(" Calc : "+self.p)
					   return self.p;
					   break;
			case "pi": switch(type)
					   {
						case "non-interacting" : self.p = (Control.Kp * ep) + Control.Ki * (ep * Control.T) +Control.Bios;
												// alert(" Calc  NI: "+self.p)
												 return self.p;
												 break;
						case "interacting" : self.p = (Control.Kp * ep) + (Control.Kp* Control.Ki) *(ep * Control.T) +Control.Bios;
											// alert(" Calc  i: "+self.p)
											 return self.p;
											 break;
					   }
						break;
			case "pd": switch(type)
					   {
						case "non-interacting" : self.p = (Control.Kp * ep) + Control.Kd /* derivative of Ep */ +control.P0;
												return self.p;
												 break;
						case "interacting" : self.p = (Control.Kp * ep) + (Control.Kp* Control.Kd) /* derivative of Ep */ +control.P0;
											return self.p;
											break;
					   }
						break;
			case "pid":switch(type)
					   {
						case "non-interacting" : self.p = (Control.Kp * ep) + Control.Ki *(ep * Control.T)/* integration of ep */+ Control.Kd /* derivative of Ep */ +control.Bios;
												 return self.p;
												 break;
						case "interacting" : self.p = (Control.Kp * ep) + ((Control.Kp* Control.Ki) * (ep * Control.T) /* integration of ep */) + ((Control.Kp* Control.Kd) /* derivative of Ep */) +control.Bios;
											return self.p;
											break;
					   }
						break;
		}
	}
	this.AcceptValues = function(cntrl)
	{
		this.sp = parseFloat($("#sp").val())
		this.max = parseInt($("#max").val())
		this.min = parseInt($("#min").val())
		if(this.sp>60 ||this.sp < 40)   {
			alert("Enter Setpoint in range of (40 -60)") ; this.sp = 0;}
		if((this.max >100 || this.max<0) || (this.min >100 || this.min<0))	{	
			alert("Enter the values in range of (0 -100)")
		this.max = 0 ; this.min = 0;}
		//this.Ep = this.calcultaeEp( this.sp , this.max , this.min);
		switch(cntrl)
		{
			case "p" : 	this.kp = parseFloat($("#kp").val())
						//alert("case "+this.error)
						if(this.kp>1 ||this.kp < 0.01)  {
						this.error = true;
								alert("Enter Proportional gain in range of (0.01-1)") ; this.kp = 0;}
						this.p0 = parseFloat($("#p0").val())
						if(this.p0>60 ||this.p0 < 40)  {
						this.error = true;
						alert("Enter Proportional Bias in range of (40 -60)") ; this.p0 = 0;}
						$("#result").append("<tr>"+"<td>" + "Kp :"  + "</td>"  + "<td>" + this.kp+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + " P0 :" + "</td>"  + "<td>" + this.p0+ "</td>"  + "</tr>" )
								break;
		    case "pi": 	this.kp = parseFloat($("#kppni").val())
						this.bios = parseFloat($("#bios").val())
						this.ki = parseFloat($("#ki").val()) * 1000  //to convert in millisecond
						this.t = parseInt($("#tpni").val())
						$("#result").append("<tr>"+"<td>" + "Kp :"  + "</td>"  + "<td>" + this.kp+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + " P(0) :" + "</td>"  + "<td>" + this.bios+ "</td>"  + "</tr>" + 
						"<tr>"+"<td>" + " Ki :" + "</td>"  + "<td>" + this.ki+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + " T :" + "</td>"  + "<td>" + this.t+ "</td>"  + "</tr>" );
						
						break;
			case "pd":  this.kp =  parseFloat($("#kppnd").val())
						this.p0=  parseFloat($("#p0pnd").val())
						this.kd =  parseFloat($("#kd").val()) * 1000  //to convert in millisecond
						this.t = parseInt($("#tpnd").val())
						$("#result").append("<tr>"+"<td>" + "Kp :"  + "</td>"  + "<td>" + this.kp+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + " P0 :" + "</td>"  + "<td>" + this.p0+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + " Kd :" + "</td>"  + "<td>" + this.kd+ "</td>"  + "</tr>" + 
						"<tr>"+"<td>" + " T :" + "</td>"  + "<td>" + this.t+ "</td>"  + "</tr>")
						
						break;
			case "pid": this.kp =  parseFloat($("#kppndni").val())
						this.p0 =  parseFloat($("#p0pndni").val())
						this.ki =  parseFloat($("#kipndni").val())* 1000  //to convert in millisecond
						this.kd =  parseFloat($("#kdpndni").val())* 1000  //to convert in millisecond
						this.t = parseInt($("#tpnind").val())
						$("#result").append("<tr>"+"<td>" + "Kp :"  + "</td>"  + "<td>" + this.kp+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + " P0 :" + "</td>"  + "<td>" + this.p0+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + " Ki :" + "</td>"  + "<td>" + this.ki+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + " Kd :" + "</td>"  + "<td>" + this.kd+ "</td>"  + "</tr>" + 
						"<tr>"+"<td>" + " T :" + "</td>"  + "<td>" + this.t+ "</td>"  + "</tr>")
						
						break;
		}
	}

	this.showdata = function()
	{
		//alert("in  " + this.mode )
		if(this.mode == "Auto")
		{
		//alert(this.sp+" "+this.max+" "+this.min)
		this.Ep = this.calcultaeEp( this.sp , this.max , this.min  , this.input);
		//this.ControllerOutput = scope.AcceptValues(cntrl);
		//alert(" EP :  "+this.Ep+"  "+this.control)
		var cntrl = this.control
		switch(cntrl)
		{
			case "p" :// 	alert(this.kp+"  "+this.p0)
						var Control = {"Kp" : this.kp, "P0" : this.p0 }
						//alert(Control.Kp+"  "+Control.P0+" EP :  "+this.Ep)
						this.ControllerOutput = this.calculateControl("p", this.Ep, Control);
						//alert(" Out "+this.ControllerOutput)
						break;
						
			case "pi":  var Control = {"Kp" : this.kp, "Bios" : this.bios , "Ki" : this.ki , "T": this.t}
						this.ControllerOutput = this.calculateControl("pi", this.Ep, Control);
						//alert(" Out "+this.ControllerOutput)
						break;
						
			case "pd":  var Control = {"Kp" : this.kp, "P0" : this.p0 , "Kd" : this.kd , "T": this.t}
						this.ControllerOutput = this.calculateControl("pd", this.Ep, Control);
						//alert(" Out "+this.ControllerOutput)
						break;
			case "pid": var Control = {"Kp" : this.kp, "P0" : this.p0 , "Ki" : this.ki , "Kd" : this.kd , "T": this.t}
						this.ControllerOutput = this.calculateControl("pid", this.Ep, Control);
						//alert(" Out "+this.ControllerOutput)
						break;
		}
		if(isNaN(this.Ep) && isNaN(this.ControllerOutput))
			 alert("Please Enter All the Values") 
		else if(isFinite(this.Ep) == false && isFinite(this.ControllerOutput) == false ) 
			{ }//alert("Enter all the Values in given Range")
		else
			{ if(this.action == "reverse")
				this.ControllerOutput = (-this.ControllerOutput)
			$("#result").append("<tr>"+"<td>" + "Ep :"  + "</td>"  + "<td>" + this.Ep+ "</td>"  + "</tr>" +
											"<tr>"+"<td>" + "Controller Output :"  + "</td>"  + "<td>" + this.ControllerOutput.toFixed(2)+ "</td>"  + "</tr>");
			$("#pido").html(this.ControllerOutput.toFixed(2))
			}
		}
		else
		{	this.manualip = $("#manualinput").val();
			//alert(this.mode+"  "+this.manualip)
			$("#pido").html(this.manualip); 
			$("#result").append("<tr>"+"<td>" + "Ep :"  + "</td>"  + "<td>" + this.manualip+ "</td>"  + "</tr>" );
		}
		//if(outputchk == 1)
							//$("#pido").html(this.ControllerOutput)
	}
	this.calculation = function()
	{
		var cntrl = this.control ;
		var scope = this;   //storing the state of this pointer
		$( "#internalinfo" ).dialog({
			draggable : true,
			closeOnEscape : true,
			resizable : true,
			height: 500,
			width: 300,
			modal: true,
			create: function(){
					$("#ep").show();
					var html = "<label for = titlel>" +cntrl + " - Control" + "</label>";
					$("#internalinfo").append(html);
					switch(cntrl)
					{
						case "p" : $("#pinfo").show();
									break;
						case "pi": $("#pniinfo").show();
									break;
						case "pd": $("#pndinfo").show();
									break;
						case "pid": $("#pnindinfo").show()
									break;
					} 
				},
			buttons : {
			
			"Submit" : function(){
					var confirmval = confirm("Do You Want To Submit the values ?")
					if(confirmval){
					outputchk = 1
						scope.AcceptValues(cntrl);
						$("#result").append("<tr>"+"<td>" + " SetPoint :"  + "</td>"  + "<td>" + scope.sp+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + " Maximum :" + " </td>"  + "<td>" + scope.max+ "</td>"  + "</tr>" +
						"<tr>"+"<td>" + " Minimum :" + "</td>"  + "<td>" + scope.min+ "</td>"  + "</tr>" );
						//alert(scope.error)
					if(scope.error == false)
						$( this ).dialog( "close" );}
					else 			
						$( this ).dialog( "close" );
			 		//alert(" EP :  "+scope.Ep+"  "+this.ControllerOutput)
					
				}
			}
			
		});
	}
	var self = this;   //preseving the current object
	this.pidAttributeBlock = function(obj)
	{
	
	$("#chk").hide();
	$("#chkl").hide();
		$( "#dialog-pid" ).dialog({
			draggable : true,
			closeOnEscape : true,
			height: 400,
			width: 400,
			modal: true,
			resizable : true,
			create: function(){
						//$("#ep").show();
						$("#pidattr").show("fast");
						},
			buttons : {
					"Set Configuration" : function(){
							//sc = 1;
							self.calculation(); 	
							$( this ).dialog( "close" );							//using the preserved object
					},
					"Done" : function() 
						{
						//	if(sc ==1)
							$( this ).dialog( "close" );
							//else
							//alert("Set the Configuration for the control  You selected")
						}	
					}
		});
	}
	this.getTime = function() 
	{
	   var dTime = new Date();
	   var hours = dTime.getHours();
	   var minute = dTime.getMinutes();
	   var period = "AM";
		var time
	   if (hours > 12) 
		period = "PM"
	  else 
		period = "AM";
		  
		hours = ((hours > 12) ? hours - 12 : hours)
		time = hours+"."+minute
		  
	 return time;

	}
	var self = this
	this.drawGraph =function()
	{
		$("#graphdiv").show();
		
		/*var time = self.getTime();
		time =parseFloat(time);
		alert( time );
		var d1 = [[time,10],[(time = time+1.20),20],[(time = time+1.20),30],[(time = time+1.20),40],[(time = time+1.20),90]];
		$.plot($("#graph"), [ d1]);*/
		
		var xVal = self.getTime();;
		var data = [[],[]];

        var plot = $.plot($("#graph"),data);

		function getData()
		{
		 // This could be an ajax call back.
			 var yVal1 = Math.floor(Math.random()*11);
			 var yVal2 = Math.floor(Math.random()*11);

			 var datum1 = [xVal, yVal1];
			 var datum2 = [xVal, yVal2];

			 data[0].push(datum1);
			 data[1].push(datum2);

			/* if(data[0].length>10){
			  // only allow ten points

				data[0] = data[0].splice(1);
				data[1] = data[1].splice(1);
				}
*/
			 //xVal++;
			 xVal = self.getTime();;
			 plot.setData(data);
			 plot.setupGrid();
			 plot.draw();
		}
	setInterval(getData, 1000);
	}
		
}

function digits(n) { return 1+Math.floor(Math.log(n)/Math.log(10)) };
function AdvanceConstruction()					 //CLASS FOR ADVANCE CONSTRUCTION
{
	var k1 = k;
	this.A ;
	this.B;
	this.C;
	this.collectionAC;
	this.type;
	this.add1;
	this.add2;
	this.add3;
	this.carry;	
	this.createblock = function(type)
	{
		var x = 500;
		k1 = k1 +p
		this.type =type; 
		//alert(this.type)
		var acbox = paper.rect(x,k1,250,110).attr({fill : "white" , 'stroke-width': 1 });
		 $("#AcInfo").show();
		if(type == "Addition")
			var text = paper.text(x+110,k1+60,"+").attr({ 'font-size': 30 })
		else if(type == "Subtraction")
			var text = paper.text(x+110,k1+60,"-").attr({ 'font-size': 30 })
		else if(type == "Multiplication")
			var text = paper.text(x+110,k1+60,"*").attr({ 'font-size': 30})
		else 
			var text = paper.text(x+110,k1+60,"/").attr({ 'font-size': 30})
		
		AC = true;  //USED TO CHECK IN OUTPUT WETHER ADVANCE CONSTRUCTION IS SELECTED OR NOT
		$("#result").html("<tr>"+"<td>" + " Type :"  + "</td>"  + "<td>" + this.type+ "</td>"  + "</tr>");
		p = p +80		;
		//alert(p)
		//k1 = k1+p;		
	}
	var self = this; //PRESERVE THE THIS OBJECT
	this.setValues = function()
	{
		$("#result").html("<tr>"+"<td>" + self.add1 +" :" + "</td>"  + "<td>" + self.A+ "</td>"  + "</tr>" + 
							"<tr>"+"<td>" + self.add2  + " :" +"</td>"  + "<td>" + self.B+ "</td>"  + "</tr>" + 
							"<tr>"+"<td>" + self.add3  +" :" +"</td>"  + "<td>" + self.C+ "</td>"  + "</tr>");
		
		var json = {"Address" : self.add1, "Value" : self.A}
		this.collectionAC.push(json)
		var json = {"Address" : self.add2, "Value" : self.B}
		this.collectionAC.push(json)
		var json = {"Address" : self.add3, "Value" : self.C}
		this.collectionAC.push(json)
		
	}
	this.drawcarry = function() 
	{
		var x = 652; k1= k1+80;
		this.carry = paper.set()
		var r = paper.rect(x,k1,10,12).attr({ 'stroke-width': 1 });
		var l = paper.path("M "+(x+5)+" "+(k1+15)+" l 0 40")
		var t = paper.text((x+7),(k1+60),"Carry").attr({ 'font-size': 15})
		this.carry.push(r);this.carry.push(l);this.carry.push(t);
	}
	this.calculateAC = function(y)
	{
		var scope = this
		if(y ==1 )
		{
			if(this.type == "Addition"){
				this.C = this.A + this.B;
				var Noofdigits = digits(this.C)
				//alert(Noofdigits)
				if(Noofdigits == 5 || Noofdigits>5  )
					scope.drawcarry();	
				else
					if(this.carry != undefined) this.carry.remove();
					
			}
			else if(this.type == "Subtraction")
				this.C = this.A - this.B;
				
			else if(this.type == "Multiplication"){
					this.C = this.A * this.B;
					var Noofdigits = digits(this.C)
					if(Noofdigits == 5 || Noofdigits>5  )
					scope.drawcarry();	
				else
					if(this.carry != undefined) this.carry.remove();
				}
				
			else if(this.type == "Division")
				this.C = this.A / this.B;
	
	var line = seriescount - bottomline.length;   
	for(var i=0;i<line;i++)
		seriesSegment[i].attr({stroke : "green" ,'stroke-width': 3 })
	for(var i=0;i<bottomline.length;i++)
		bottomline[i].attr({stroke : "green" ,'stroke-width': 3 })
	seriesSegment[seriesSegment.length-1].attr({stroke : "green" ,'stroke-width': 3 })	
	$("#acout").html(this.C)
	this.setValues();
		}
		else{
		//$("#acout").html("0")
		}
		
	}
}
$(document).ready(function() 
{
		if($.browser.msie)
		{
			document.write("The Existing version of Internet Explorer is not supported ");
			document.write("<A href  = 'http://www.mozilla.com/en-US/products/download.html'>Click on the  Link :</A>")
		}
		else
		{
			$('#tabs').tabs();
				$("#graphdiv").hide();
			paper = new Raphael(document.getElementById('board'), 860, 1500);
			createseries();
			$('#addressbar').show("fast");
					
			$("#counterup").hide()
			$("#counterdwn").hide();
			
			$("#base").hide()
			$("#preset").hide()
			$("#Acc").hide();
			
			$("#pr").hide();
			$("#a").hide();
			$("#Timers").hide();			
			$('input:radio[name=time]').click(function() {
			  psval = $('input:radio[name=time]:checked').val()
			})
			$("#pidconfg").hide();
			$("#pidattr").hide();
			$("#actionconf").hide();
			$("#manualdata").hide();
			$("#typeconf").hide()
			$("#pinfo").hide()
			 $("#pniinfo ").hide();
			 $("#pndinfo ").hide();
			 $("#pnindinfo").hide();
			 $("#ep").hide();
			 $("#AcInfo").hide();
			 $("#pidattr").buttonset();
			 $("#typeconf").buttonset();
			 $("#pidattribute").button();
			$("#preset").html("Preset : "+psval)
			
			$('#tabs-2').click(function()
			{
				$("#base").show("fast")
				$("#preset").show("fast")
				$("#Acc").show("fast");
				$("#pr").show("fast")
				$("#a").show("fast");
			});
			$("#graphbutton").hide();
			$("#graph").hide();
			$('#dev').click(function()
			{	mode =  1;$("#board").show(); if(pid == true ){
			 $("#pidconfg").show();} 	});
			$('#con').click(function()
			{	mode =  1;$("#board").show(); if(pid == true ){
			 $("#pidconfg").show();} 	});
			$('#tim').click(function()
			{	mode =  1;$("#board").show();	if(pid == true ){
			 $("#pidconfg").show();} });
			$('#pid').click(function()
			{	mode =  1;$("#board").show();if(pid == true ){
			 $("#pidconfg").show();}	});
			$('#ai').click(function()
			{	mode =  1	;$("#board").show();if(pid == true ){
			 $("#pidconfg").show();}});
			var obj = new PidOperation();  //object of pidoperation
			$("#pidblock").click(function()
			{
				obj.createPidBlock();
				$("#pidattribute").click(function(){  obj.pidAttributeBlock(obj); //dynamically open the block widout show
						});
			});
			$("#pidattr").change(function(){ obj.selmode();  });
			$("#actionconf").change(function(){ obj.configuration();  });
			$("#chk").change(function(){ obj.togglechk() });
			$("#typeconf").change(function(){ obj.typeconfiguration();  });
			$("#pidinput").change(function(){obj.input = parseFloat($("#pidinput").val()) ; if(outputchk ==1) obj.showdata()});
			$("#graphdiv").click(function(){
			/*var html = "<div id = 'graph' style = 'width:860;height:500;border-style:dashed'></div>";
			$("#tabs-7").append(html);*/
			//alert("hi")
			$("#board").hide();
			$("#pidconfg").hide();
			$("#graph").show();
			})
			//for Advanced Construction
			objAC = new AdvanceConstruction();
			$("#AcAdd").click(function(){  objAC.createblock("Addition");  });
			$("#AcSub").click(function(){  objAC.createblock("Subtraction");  });
			$("#AcDiv").click(function(){  objAC.createblock("Division");  });
			$("#AcMul").click(function(){  objAC.createblock("Multiplication");  });
			$("#Address1").change(function(){objAC.add1 = $("#Address1").val();  });
			$("#Address2").change(function(){objAC.add2 = $("#Address2").val(); });
			$("#Address3").change(function(){objAC.add3 = $("#Address3").val(); });
			$("#Text1").change(function(){objAC.A = parseInt($("#Text1").val()); if(outputchk == 1) objAC.calculateAC(y)});
			$("#Text2").change(function(){objAC.B = parseInt($("#Text2").val());if(outputchk == 1) objAC.calculateAC(y)});
			$("#graphbutton").click(function(){ obj.drawGraph();  })
			$('#exe').click(function()
			{	mode =  2;$("#board").show();	
			
			 if(pid == true ){
			 $("#pidconfg").show();
				obj.showdata();
				$("#graphbutton").show();
				}
			 else if(AC == true){
			 
				var y = state[state.length-1];
				//alert("Y : "+y)
				objAC.calculateAC(y);
				outputchk =1;
			}
			else
				calculate();
			
			});
		}
	});

