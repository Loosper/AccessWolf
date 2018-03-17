//grozen kod

function updateStudentsPresence(classNum, classLetter){
	var table = document.getElementById('studentsTable');
    table.innerHTML = "<tr class='title'><td width='30%'>Name</td><td>Number</td><td>Entered</td><td>Last location</td></tr>";
    var res = httpGet("/students?assigned_class="+classNum+"+"+classLetter);
    //name assigned_class guid id number_in_class
    var students = JSON.parse(res);
    var i;
    for(i=0; i<students.length; i++){
	    if(students[i].assigned_class == classNum+classLetter){
            addStudentRow(table, students[i].name, students[i].number_in_class, "ENT", "LAST", students[i].id);
            var row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.colSpan = 4;
            cell.appendChild(document.createElement("HR"));
        }
    }
	//ime klas nomer vlqzul posl
}

function addStudentRow(table, name, num, isEnt, lLoc, id){
    //alert(id);
	var row = table.insertRow(-1);
	var ab = [2,4];
	row.onclick = function(){ popUp(id, name); };
    row.classList.add('student-row');

	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);

	cell1.innerHTML = name;
	cell2.innerHTML = num;
	cell3.innerHTML = isEnt;
	cell4.innerHTML = lLoc;
}

function popUp(uid, name){
    var absc = httpGet("/attendances/student/"+uid);
    document.getElementById("pop-name").innerHTML = name;
    document.getElementById("att").innerHTML = absc;
	document.getElementById('pop').style.display='block';
}

// /tendences/student/

function updateTeachersPresence(){
	var table = document.getElementById('teachersTable');

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
