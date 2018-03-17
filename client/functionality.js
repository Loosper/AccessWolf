//grozen kod

function updateStudentsPresence(classNum, classLetter){
	var table = document.getElementById('studentsTable');
    //alert(classNum + classLetter);
    var res = httpGet("/students?assigned_class="+classNum+"+"+classLetter);
    alert(res);
	//ime klas nomer vlqzul posl
	addStudentRow(table, "Ime", "Klas", "Num", "isEnt", "last")
}

function addStudentRow(table, name, clas, num, isEnt, lLoc){
	var row = table.insertRow(-1);
	var ab = [2,4];
	row.onclick = function(){ popUp(name, name, name, ab); };

	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);

	cell1.innerHTML = name;
	cell2.innerHTML = clas;
	cell3.innerHTML = num;
	cell4.innerHTML = isEnt;
	cell5.innerHTML = lLoc;
}

function popUp(name, clas, number, abscences){
	alert(name + " " + clas + " " + number + " " + abscences);
}

function updateTeachersPresence(){
	var table = document.getElementById('teachersTable');

	//ime, predmet, isIn, lLoc /students?assigned_class=(1..12)+(a..g)
	addTeacherRow(table, "TNAME", "SUBJECT", "isIn", "loc");
}

function addTeacherRow(table, name, subject, isIn, lLoc){
	var row = table.insertRow(-1);
	
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	
	cell1.innerHTML = name;
	cell2.innerHTML = subject;
	cell3.innerHTML = isIn;
	cell4.innerHTML = lLoc;
}

function changeClassNum(num){
    var arr = document.getElementsByClassName("classItemNum");
    var i=0;
    for(i=0; i<arr.length; i++){
        arr[i].setAttribute("class", "classItemNum");
    }
    var elem = document.getElementById(num);
    elem.className += (" selected");
    var currentClassLetter = document.getElementsByClassName("classItemLetter selected")[0].id;
    updateStudentsPresence(num, currentClassLetter);
}

function changeClassLetter(letter){
    var arr = document.getElementsByClassName("classItemLetter");
    var i=0;
    for(i=0; i<arr.length; i++){
        arr[i].setAttribute("class", "classItemLetter");
    }
    var elem = document.getElementById(letter);
    elem.className += (" selected");

    var currentClassNum = document.getElementsByClassName("classItemNum selected")[0].id.toString();

    updateStudentsPresence(currentClassNum, letter);
}

function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
