//window.onload=function(){setPage(this);};

var numbers =[];
var posNumbers=new Array(60);
var numbersOcurrencyWeight = new Array(60);
var graphArray = [];
var ticksInterval = [];
var sumNumbers = 0;
var classID = null;
var lastDate = '';
var mean = 0;

function constructChart(){
	google.load("visualization", "1", {packages:["corechart"], "callback":drawChart});
	//google.setOnLoadCallback(drawChart);
}

function drawChart() {

	//var dataArray = [['X', 'Y']];
	/*for(var i=0;i < posNumbers.length; i++){
		dataArray.push([i+1, posNumbers[i]]);
	}*/
	var data = google.visualization.arrayToDataTable(graphArray);

	var options = {
		title: 'Analise Gráfica',
		hAxis: {ticks: ticksInterval},
		colors: ['red','blue'],
		seriesType:'bars',
		series: {0: {type: 'line'}}
	};

	var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
	chart.draw(data, options);
	
	//chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	//chart.draw([[1][50],[50][50]], null);
}

function countNumbers(){
	for(var i = 0; i < numbers.length; i++){
		var index = numbers[i][0]-1;
		var date = numbers[i][1];
		var concurso = numbers[i][2];
		var dateStr = numbers[i][3];
		if(posNumbers[index] == undefined){
			posNumbers[index] = [0, date, concurso, dateStr,''];
		}		
		posNumbers[index][0]++;
		if(posNumbers[index][1] < date)
		{
			posNumbers[index][1] = date;
			posNumbers[index][2] = concurso;
			posNumbers[index][3] = dateStr;
			posNumbers[index][4] = "R"+ (Math.floor(i/6) + 1).toString() + "C" + ((i%6) + 2).toString();
		}
		sumNumbers += numbers[i][0];
		mean = Math.round(numbers.length / 60);
	}
}

function showtable(){	
		var frameObj = document.getElementById("framedataID");
		var graphObj = document.getElementById("graphID");
		var lnkObj = document.getElementById("shbase");		
		var styleObj = frameObj.style.display;
		if(styleObj == 'none'){
			frameObj.style.display='block';
			lnkObj.innerHTML = '(Esconder Base de Dados)';
		}
		else{
			setCellFocus(null);
			frameObj.style.display='none';
			lnkObj.innerHTML = '(Exibir Base de Dados)';
		}
	}

function setCellFocus(id){
	var frameObj = document.getElementById("framedataID");
	var styleObj = frameObj.style.display;
	if(styleObj != 'none'){
		if(id != classID && id !== null){
			var obj = document.getElementById("base").contentDocument;
			var e = obj.getElementById(id);
			var focusClass = 'fcell';
			if(classID != null){
				var oldObj = obj.getElementById(classID);
				oldObj.className=oldObj.className.replace(focusClass,"");
			}
			e.className = focusClass;
		}
		else{
			if(classID != null){
				var oldObj = obj.getElementById(classID);
				oldObj.className=oldObj.className.replace(focusClass,"");
			}
			id = 'R1C1';
		}
		obj.location.hash=id;
		classID = id
	}
}

function insertHtml(id, html, position){	
	var textArea = document.getElementById(id);
	switch(position){
		case 0:
			textArea.innerHTML = html + textArea.innerHTML;
			break;
		case 1:
			textArea.innerHTML += html;
			break;
		default:
			textArea.innerHTML = html;
			break;	
    }	
}

function analise(){
	var aux = lastDate.split('/');
	var auxLastDate = Number(aux[2] + aux[1] + aux[0]);
	var numeros = numbers.length;	
	var htmlText = '<p>Numeros Sorteados:' + '<span>' + numeros + '</span></p>';
	htmlText += '<p>Sorteios Realizados:' + '<span>' + (numeros / 6).toString() + '</span></p>';
	htmlText += '<p>Último Sorteio:' + '<span>' + lastDate + '</span></p>';
	insertHtml('dataSummaryId', htmlText, null);
	countNumbers();
	var max = 0;
	var min = posNumbers[0][0];
	var sum = 0;
	var sMax="";
	var sMin="";
	var vari = 0;
	htmlText = '<p style="text-align:left;">Analise: <a id="shbase" href="" onclick =\'showtable();return false;\'>(Exibir Base de Dados)</a></p>';
	htmlText+= '<ul style="padding: 0;list-style-type:none;"><li style="padding-bottom:1px;">';//<div style="display:inline;float:left;padding-left:10px;">';
	for(var i = 0; i < posNumbers.length; i++){
		var index = i + 1;
		/*htmlText += '<div class="numberunit"><div class="number" onclick="setCellFocus(\'' + posNumbers[i][4] + '\');">' +  
				((index < 10) ? '0' + index : index) + ' | ' + posNumbers[i][0] +'</div>' +
				'<div class="numberSummary">' + posNumbers[i][2] + ' | ' +
				posNumbers[i][3] + '</div></div>'; //'(' + (auxLastDate-posNumbers[i][1]) +')*/

		htmlText += '<span style="color:#' + ((posNumbers[i][0] < mean) ? 'FF0000' : (posNumbers[i][0] > mean) ? '0000FF': '000000') + 
					'" onclick="setCellFocus(\'' + posNumbers[i][4] + '\');">' + 
					((index < 10) ? '0' + index : index) + '=>' + posNumbers[i][0] + ', ' + posNumbers[i][2] + 
					', ' + posNumbers[i][3] + ', ';
		
		vari += Math.pow((posNumbers[i][0] - mean), 2);
		
		var lastDateSorting = '00' + (auxLastDate-posNumbers[i][1]);
		
		htmlText += lastDateSorting.slice(lastDateSorting.length-3) + ', ';
		
		var lastAppear = '000' + ((numeros / 6) - posNumbers[i][2]).toString();
		
		htmlText += lastAppear.slice(lastAppear.length-4);

		if(index % 3 == 0){
			//htmlText+='</div><div style="display:inline;float:left;padding-left:10px;">'
			htmlText+='</span></li><li style="padding-bottom:1px;">'
		}
		else{
			htmlText+=' |</span>';
		}
		
		sum+=posNumbers[i][0];
		
		if(posNumbers[i][0] > max){
			max = posNumbers[i][0];
			sMax = '<p>Maior Ocorrência:' + '<span>' + (index) + ":" + max + '</span></p>';
		}
		
		if(posNumbers[i][0] < min ){
			min = posNumbers[i][0];
			sMin = '<p>Menor Ocorrência:' + '<span>' + (index) + ":" + min + '</span></p>';
		}
		//graphArray.push([index,(posNumbers[i][0] / numbers.length) * 100]);
		graphArray.push([index,mean,posNumbers[i][0]]);
		
		/*var pos = 0;
		for (var j = 0; j < graphArray.length; j++){
			if((graphArray[j])[0] < posNumbers[i][0]){
				pos++;
			}
			else{
				break;
			}
		}
		graphArray.splice(pos,0,[posNumbers[i][0],index]);*/
		
		if(((index % 1) == 0) || (i == 0)){
			ticksInterval.push(index);
		}
	}
	htmlText += "</li></ul>";	
	insertHtml('numbersInfoId', htmlText, null);
	
	//var mean = Math.round(sum / posNumbers.length);
	var sMean = '<p>Media:' + '<span>' + mean + '</span></p>';
	/*for(var i = 0; i < posNumbers.length; i++){
		graphArray[i][2] = mean;
	}*/
	
	vari /= posNumbers.length;
	var sVari = '<p>Variância:' + '<span>' + Math.round(vari*100)/100 + '</span></p>';

	var desvp = Math.sqrt(vari);
	var sDesvp = '<p>Desvio Padrão:' + '<span>' + Math.round(desvp*100)/100 + '</span></p>';
	
	/*for(var i = 0; i < posNumbers.length; i++){
		vari += Math.pow((posNumbers[i] - mean), 2);
	}*/
	
	//var sSum = 	'Soma: ' + '<span>' + sumNumbers + '</span><br>';
	//var sMean = 'Media:' + '<span>' + (sumNumbers / numeros).toString() + '</span><br>';

	//var wmean = Math.round(0.1 * (numeros / 6));
	//var wMean = '<p>Media Esperada:' + '<span>' + wmean + '</span></p>';
	
	htmlText = sMax + sMin + sMean + sVari + sDesvp;// + wMean;
	insertHtml('numbersStaticalId', htmlText, null);
	
	//ndistri(mean,desvp,vari);
	
	graphArray.unshift(['Num', 'Mean', 'Qtde']);
	//graphArray.unshift(['Num', 'Prob']);
}

function ndistri(mean, desvp, vari){
	var a = 1 / (desvp * (Math.sqrt(2 * Math.PI)));
	var prob = 0;
	for(var i = 0; i < graphArray.length; i++){
		var b = (Math.pow(((graphArray[i])[0]-mean), 2) / (2*vari));
		prob = a * Math.exp(-b);
		graphArray[i] = [(graphArray[i])[1].toString(),prob];
	}    
}
function setStatus(id){				 
	var els = document.getElementsByName(id);
	if(els != undefined){
		var status = (els[0].style.visibility == 'visible');
		for(var i = 0; i < els.length; i++){
		els[i].style.visibility = ((!status) ? 'visible' : 'hidden');
		}					
	}
	else{
		alert('Elements not find');
   }						
}

function create_buttons(){
	var e = document.getElementsByTagName("table")[0];
	var btnuni = document.createElement("button"); 
	btnuni.id='btnuni'
	btnuni.innerHTML = 'Unidades';
	btnuni.onclick = function(){setStatus('uni');return false;};
	var btndez = document.createElement("button"); 
	btndez.id='btndez'
	btndez.innerHTML = 'Dezenas';
	btndez.onclick = function(){setStatus('dez');return false;};
 
	e.parentNode.insertBefore(btndez,e);
	e.parentNode.insertBefore(btnuni,e);
}

function hideParagraph(docbase){
	var e = docbase.getElementsByTagName("p");
	for(var i = 0; i < e.length; i++){
		e[i].style.display = 'none';
	}
}

function insertStyle(docbase){
	var cssRef = '.fcell{ background-color:#FF0000 }\r';
	var styleRef = docbase.getElementsByTagName("style")[0].innerHTML;
	docbase.getElementsByTagName("style")[0].innerHTML = cssRef+styleRef;
}

function hideCollumns(docbase){
	insertStyle(docbase);
	hideParagraph(docbase);
	var tb = docbase.getElementsByTagName("table")[0];
	tb.style.width='600px';
	var lines = docbase.getElementsByTagName("tr");
	var date = 0;
	var concurso = 0;
	var dtStr = "";
	var countLines = lines.length;
	for(var i = 0; i < countLines; i++){
	    var tag = i==0 ? 'th': 'td';
		var cols = lines[i].getElementsByTagName(tag);
		for(var j =0; j < cols.length; j++){
			if((countLines - i) < 2){
				lastDate = cols[1].innerHTML
			}
		 if(j != 0 && (j < 2 || j > 7)){
			if(j == 1){
				dateStr = cols[j].innerHTML;
				var aux = dateStr;
				aux = aux.split('/');
				date = Number(aux[2] + aux[1] + aux[0]);
				concurso = Number(cols[0].innerHTML);
			}
			else{
				cols[j].style.display = 'none';
			}
		 }
		 else if(j > 1 && j < 8){
			cols[j].id = 'R' + i.toString() + 'C' + j.toString();
			if(i > 0){
				numbers.push([Number(cols[j].innerHTML), date, concurso, dateStr]);
			}
		 }
		}
	}
}
function showTime(){
	var obj = document.getElementById("datahora");
	var textArea = obj.getElementsByTagName("span")[0];
	var dt = new Date();
	textArea.innerHTML = textArea.innerHTML + dt.toString();
}

function doActions(){
	showTime();
	var obj = document.getElementById("base").contentDocument;
	hideCollumns(obj);		
	analise();
	constructChart();
	obj.location.hash='R1C1';
}

function setPage(){
 //create_buttons();
 //var docBase = document.getElementById('base').contentWindow.document; 
 //alert(obj);
 //var docBase = document.getElementById('base').contentDocument;
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if(!is_chrome){
		doActions();
	}
	else{
		alert('This application not working in Chrome');
	}
}