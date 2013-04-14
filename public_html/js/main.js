var maxNumOfEntry = 10;
	var cilj;
	var jednadzbe;
	var teznja;
	var iteracije;
	var rang;

	function init() {
		cilj = new Array();
		jednadzbe = new Array();
		teznja = new Array();
		iteracije = new Array();
		rang = 0;
		document.getElementById('centerTablica').innerHTML = "";;
	}
	
	function izvuci(_ime, polje){
		for(var i=1; i<=maxNumOfEntry; i++){
			var ime = _ime+i;
			var element = document.getElementById(ime);
			if(element==null || element.value==='') break;
			polje.push(element.value);
		}
	}
	
	function unos() {
		izvuci("z",cilj);
		izvuci("t",teznja);

	for(var i=1; i<=maxNumOfEntry; i++){
		var ime = "x"+i+"1";	
		var element = document.getElementById(ime);
		if(element===null || element.value==='') break;		
		var jednadzba = new Array();
		izvuci("x"+i,jednadzba);
		jednadzbe.push(jednadzba);
	}
}

function start() {
	var iteracija = new Array();		
	for(var i=0; i<jednadzbe.length; i++){			
		var red = new Array();
		red.push(parseFloat(0.0));
		red.push("u"+(i+1));
		red.push(parseFloat(teznja[i]));
		for(var j=0; j<jednadzbe[i].length; j++)
			red.push(parseFloat(jednadzbe[i][j]));
		for(var j=0; j<jednadzbe[i].length; j++)
			if (i===0 && j===0)
				red.push(parseFloat(1.0));
			else if (i/j===1 && i%j===0)
				red.push(parseFloat(1.0));
			else
				red.push(parseFloat(0.0));			
		iteracija.push(red);
	}
	var red = new Array();
	red.push("-");
	red.push("-");
	red.push(parseFloat(0.0));
	for(var i=0; i<cilj.length; i++)
		red.push(parseFloat(cilj[i]*(-1.0)));
	for(var i=0; i<cilj.length; i++)
		red.push(parseFloat(0.0));
	iteracija.push(red);
	iteracije.push(iteracija);
}		

function pronadji_stupac(){
	var x = iteracije.length-1;
	var y = iteracije[x].length-1;
	var zadnji_red = iteracije[x][y];
	max_index = -1;
	for(var i=0; i<zadnji_red.length; i++)
		if(zadnji_red[i]<0)
			if((max_index===-1) || (Math.abs(zadnji_red[i]) > Math.abs(zadnji_red[max_index])))
				max_index = i;
	return max_index;
}

function pronadji_redak(vodeci_stupac){
	var iteracija = iteracije[iteracije.length-1];
	var rez = new Array();
	for(var i=0; i<iteracija.length; i++){			
		if(iteracija[i][vodeci_stupac]>0)
			rez.push(iteracija[i][2]/iteracija[i][vodeci_stupac]);
		else
			rez.push(-1);
	}
	rez.pop();
	min = -1;
	min_index = 0;
	for(var i=0; i<rez.length; i++)
		if(rez[i]>0)
			if(min==-1 || rez[i]<min){
				min = rez[i];
				min_index=i;
			}
	return min_index;
}

function izracunaj(vodeci_redak,vodeci_stupac) {
	var iteracija = iteracije[iteracije.length-1];		
	var stozerni = iteracija[vodeci_redak][vodeci_stupac];	
	var nova = new Array();
	
	/*Inicijaliziramo jednu praznu matricu ladi lakšeg prepisivanja*/
	for(var i=0; i<iteracija.length; i++){
		var temp  = new Array();
		for(rang=0; rang<iteracija[0].length; rang++)
			temp.push(parseFloat(0.0));
		nova.push(temp);
	}
	rang = rang-3;
	rang = rang/2;
	
	//Prepišemo prva dva stupca, te izbacimo onoga koji nije u bazi		
	for(var i=0; i<iteracija.length; i++){
		nova[i][0] = iteracija[i][0];
		nova[i][1] = iteracija[i][1];
	}

	var varNova = vodeci_stupac-2;
	if(varNova/rang<=1){ 
		nova[vodeci_redak][1] = "x"+(varNova);
		nova[vodeci_redak][0] = cilj[varNova-1];
	} else {
		nova[vodeci_redak][1] = "u"+(varNova-rang);
		nova[vodeci_redak][0] = 0;
	}
	//Novi vodeći redak
	for(var i=2; i<iteracija[0].length; i++)
		nova[vodeci_redak][i] = iteracija[vodeci_redak][i]/stozerni;
	//STARA-NOVA*U_STUPCU 
	for(var i=0; i<iteracija.length; i++)
		if(i!=vodeci_redak)
			for(var j=2; j<iteracija[0].length; j++)
				nova[i][j] = iteracija[i][j]-nova[vodeci_redak][j]*iteracija[i][vodeci_stupac];
	iteracije.push(nova);
}

function kraj(){ //true - nije još kraj
	var x = iteracije.length-1;
	var y = iteracije[x].length-1;
	var zadnji_red = iteracije[x][y];
	for(var i=2; i<zadnji_red.length; i++)
		if(zadnji_red[i]<0)
			return true;
	return false;
}

function ispis(){
	
	var root=document.getElementById('centerTablica');
	var tab=document.createElement('table');
	tab.className="tablica";
	var tbo=document.createElement('tbody');
	var row, cell;
	row=document.createElement('tr');
	
	cell=document.createElement('th');
	cell.appendChild(document.createTextNode("CS"));
	row.appendChild(cell);
	
	cell=document.createElement('th');
	cell.appendChild(document.createTextNode("VAR"));
	row.appendChild(cell);
	
	cell=document.createElement('th');
	cell.appendChild(document.createTextNode("KOL"));
	row.appendChild(cell);
	

	for(var i=1; i<=rang; i++){
		cell=document.createElement('th');
		cell.appendChild(document.createTextNode("X"+i));
		row.appendChild(cell);
	}
	
	for(var i=1; i<=rang; i++){
		cell=document.createElement('th');
		cell.appendChild(document.createTextNode("U"+i));
		row.appendChild(cell);
	}
	
	row.appendChild(cell);
	tbo.appendChild(row);
	tab.appendChild(tbo);
	root.appendChild(tab);
	
	for(var i=0; i<iteracije.length; i++){
		for(var j=0; j<iteracije[i].length; j++){
			var row = tab.insertRow(tab.rows.length);
			var poz = 0;
			for(var x=0; x<iteracije[i][j].length; x++){
				var cell=row.insertCell(poz);
				if(x===0 && j===3){
					cell.setAttribute('colspan', 2);
					cell.innerHTML = "Zj-Cj";
					x++;
				} else{
					cell.innerHTML = iteracije[i][j][x];
				}
				poz++;
			}			
		}
		if((i+1)===iteracije.length) continue;
		var row = tab.insertRow(tab.rows.length);
		var cell=row.insertCell(0);
		cell.setAttribute('colspan', 3+rang+rang);
		cell.innerHTML = "Iteracija "+(i+1)+".";
	}
}

function racunaj() {
	init();
	unos();
	start();
	do{
		var vodeci_stupac = pronadji_stupac();
		var vodeci_redak = pronadji_redak(vodeci_stupac);
		izracunaj(vodeci_redak,vodeci_stupac);
	}while(kraj());
	ispis();
	console.log(cilj);
	console.log(jednadzbe);
	console.log(teznja);
	console.log(iteracije);
	console.log(vodeci_stupac);
	console.log(vodeci_redak);
}


function dodaj(pozivatelj){
	console.log("Pozivatelj: "+pozivatelj);
	var element = pozivatelj[0];
	var num1 = parseInt(pozivatelj[1]);
	var num2 = parseInt(pozivatelj[2]);
	if(element==='z'){
		noviId = "_z"+(num1+1);
	} else if (element==='x'){
		noviId = "_x"+(num1)+(num2+1);
		if(num2===1 && num1!==9) document.getElementById("_x"+(num1+1)).className = "";
	}	
	console.log("Otkri: "+noviId);
	document.getElementById(noviId).className = "";
}











