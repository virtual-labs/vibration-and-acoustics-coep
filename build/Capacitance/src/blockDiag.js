CAPACITANCE.blockDiag = (function() {
	createBlockDiagramOne = function () {
        paperone = new Raphael(document.getElementById('dialog2'), 500, 500);

        var text = paperone.text(200, 30, "Block Diagram Level to Current Converter").attr({
            'font-size': 20
        });
        var Level = paperone.rect(10, 80, 80, 50).attr({
            fill: '#FFF',
            stroke: '#000',
            'stroke-width': 2
        });
        var Level_text = paperone.text(50, 105, "Change\nin Level").attr({
            'font-size': 15
        });

        var line = paperone.path("M 90 105 l 30 0 M 120 105 l -5 -5 M 120 105 l -5 5").attr({
            stroke: '#000',
            'stroke-width': 2
        });

        var changeCapacitance = paperone.rect(120, 80, 100, 50).attr({
            fill: '#FFF',
            stroke: '#000',
            'stroke-width': 2
        });

        var changeCapacitance_textCh = paperone.text(170, 105, "Change in\nCapacitance").attr({
            'font-size': 15
        });
        var line = paperone.path("M 220 105 l 30 0 M 250 105 l -5 -5 M 250 105 l -5 5").attr({
            stroke: '#000',
            'stroke-width': 2
        });

        var CapacitanceBridge = paperone.rect(250, 80, 140, 50).attr({

            stroke: '#000',
            'stroke-width': 2
        });
        var CapacitanceBridge_textC = paperone.text(320, 105, "Capacitance\nBridge").attr({
            'font-size': 15
        });

        var line = paperone.path("M 325 130 l 0 50 M 325 180 l 5 -5 M 325 180 l -5 -5").attr({
            stroke: '#000',
            'stroke-width': 2
        });

        var changeVoltage = paperone.rect(250, 180, 140, 50).attr({
            fill: '#FFF',
            stroke: '#000',
            'stroke-width': 2
        });
        var changeVoltage_textC = paperone.text(325, 205, "Change in\nVoltage").attr({
            'font-size': 15
        });

        var line = paperone.path("M 250 205 l -30 0 M 220 205 l 5 -5 M 220 205 l 5 5").attr({
            fill: '#FFF',
            stroke: '#000',
            'stroke-width': 2
        });

        var VIconverter = paperone.rect(120, 180, 100, 50).attr({

            stroke: '#000',
            'stroke-width': 2
        });

        var VIconverter_textV = paperone.text(170, 205, "V/I\nConverter").attr({
            'font-size': 15
        });

        var line = paperone.path("M 120 205 l -30 0 M 90 205 l 5 -5 M 90 205 l 5 5").attr({

            stroke: '#000',
            'stroke-width': 2
        });
        var Current = paperone.rect(10, 180, 80, 50).attr({
            stroke: '#000',
            'stroke-width': 2
        });
        var Current_textO = paperone.text(50, 205, "Output\nCurrent").attr({
            'font-size': 15
        });
   }
	
	
	createBlockDiagramTwo = function(){
   	papertwo = new Raphael(document.getElementById('dialog'), 500, 500);

        var text = papertwo.text(250, 30, "BLOCK DIAGRAM SENSOR WORKING").attr({
            'font-size': 20
        });
        //first row
        var line11 = papertwo.path("M 245 150 l 0 -20");
        var line12 = papertwo.path("M 345 150 l 0 -20");
        var line13 = papertwo.path("M 445 150 l 0 -20");
        var line14 = papertwo.path("M 245 130 l 200 0");
        var line15 = papertwo.path("M 345 130 l 0 -20");
        var rect1 = papertwo.rect(195, 60, 300, 50);
        var src = document.getElementById('formulaimg').src;
       var txtt1 = papertwo.image(src, 203, 61, 289, 47);

        // second row
        var rect1 = papertwo.rect(5, 150, 80, 50);
        var txt1 = papertwo.text(45, 175, "Power\nSupply").attr({
            'font-size': 15
        });
        var line1 = papertwo.path("M 85 175 l 20 0");
        var rect2 = papertwo.rect(105, 150, 80, 50);
        var txt2 = papertwo.text(145, 175, "Capacitance\nProbe").attr({
            'font-size': 13
        });
        var line2 = papertwo.path("M 185 175 l 20 0 M 195 175 l 0 50");
        var rect3 = papertwo.rect(205, 150, 80, 50);
        var txt2 = papertwo.text(245, 175, "Level\nChange").attr({
            'font-size': 15
        });
        var line3 = papertwo.path("M 285 175 l 20 0");
        var rect4 = papertwo.rect(305, 150, 80, 50);
        var txt2 = papertwo.text(345, 175, "Dielectric\nChange").attr({
            'font-size': 15
        });
        var line4 = papertwo.path("M 385 175 l 20 0");
        var rect5 = papertwo.rect(405, 150, 80, 50);
        var txt2 = papertwo.text(445, 175, "Function Of\nLiquid").attr({
            'font-size': 13
        });


        var rect6 = papertwo.rect(145, 225, 100, 50);
        var txt2 = papertwo.text(195, 240, "Charge\n Developed\non Plates(C=q/V)").attr({
            'font-size': 13
        });
        var line7 = papertwo.path("M 345 200 l 0 20");
        var rect7 = papertwo.rect(305, 220, 80, 50);
        var txt2 = papertwo.text(345, 237, "Overlapping\n Area\nChanges").attr({
            'font-size': 12
        });

        var line8 = papertwo.path("M 345 270 l 0 20");
        var rect8 = papertwo.rect(305, 290, 80, 50);
        var txt2 = papertwo.text(345, 308, "Change in\n Capacitance").attr({
            'font-size': 12
        });
        var line10 = papertwo.path("M 305 315 l -20 0");
        var path = papertwo.path("M 285 295 l -160 0 l 0 160 l 160 0 l 0 -160");
        var path = papertwo.path("M 150 310 l 0 120 l 120 0 M 160 410 l 50 -50");
        var txt2 = papertwo.text(138, 370, "C").attr({
            'font-size': 20
        });
        var txt2 = papertwo.text(210, 450, "Level").attr({
            'font-size': 15
        });

        var line9 = papertwo.path("M 345 340 l 0 20");
        var rect9 = papertwo.rect(305, 360, 80, 50);
        var txt2 = papertwo.text(345, 384, "Output in "+$("#mu").html()).attr({
            'font-size': 13
        });
   }//
   
   createBlockDiagramOne();
   createBlockDiagramTwo();
   
})();
