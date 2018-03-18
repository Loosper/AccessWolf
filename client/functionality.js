//grozen kod

function updateStudentsPresence(classNum, classLetter){
	var table = document.getElementById('studentsTable');
    table.innerHTML = "<tr class='title'><td width='30%'>Name</td><td>Number</td><td>Entered</td><td>Last location</td></tr>";
    var res = httpGet("/static/students?assigned_class="+classNum+"+"+classLetter);

    //name assigned_class guid id number_in_class
	alert(res);
    var students = JSON.parse(res);
	alert(students);
    var i;
    for(i=0; i<students.length; i++){
	    if(students[i].assigned_class == classNum+classLetter){
			
			var loc = httpGet("/current_attendances/student/"+students[i].id);
			var jsonStudent = JSON.parse(res);
			
            addStudentRow(table, students[i].name, students[i].number_in_class, "ENT", jsonStudent.room.toString(), students[i].id);
            var row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.colSpan = 4;
            cell.appendChild(document.createElement("HR"));
        }
    }
	//ime klas nomer vlqzul posl
}

function updateTeachersPresence(){
	var table = document.getElementById('teachersTable');
    table.innerHTML = "<tr class='title'><td width='30%'>Name</td><<td>Entered</td><td>Last location</td></tr>";
	var res = httpGet("/static/teachers");
    var teachers = JSON.parse(res);
	var i;
    for(i=0; i<teachers.length; i++){
		var loc = httpGet("/static/current_attendances/teacher/"+teachers[i].id);
		var jsonTeacher = JSON.parse(res);
		addTeacherRow(table, teachers[i].name, "IN", loc);
	}
}

function addTeacherRow(table, name, isIn, lLoc){
	var row = table.insertRow(-1);
	
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	
	cell1.innerHTML = name;
	cell2.innerHTML = isIn;
	cell3.innerHTML = lLoc;
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
    var absc = httpGet("/static/attendances/student/"+uid);
    document.getElementById("pop-name").innerHTML = name;
    document.getElementById("att").innerHTML = absc;
	document.getElementById('pop').style.display='block';
}

// /tendences/student/
// /attendances/student/(id) <--
// /schedule
// /class

// /teachers

// /current_attendances/(student/teacher)/id

function changeClassNum(num, type){
    var arr = document.getElementsByClassName("classItemNum");
    var i=0;
    for(i=0; i<arr.length; i++){
        arr[i].setAttribute("class", "classItemNum");
    }
    var elem = document.getElementById(num);
    elem.className += (" selected");
    var currentClassLetter = document.getElementsByClassName("classItemLetter selected")[0].id;
	if(type=="students")updateStudentsPresence(num, currentClassLetter);
	else updateSchedule(num, currentClassLetter);
}

function changeClassLetter(letter, type){
    var arr = document.getElementsByClassName("classItemLetter");
    var i=0;
    for(i=0; i<arr.length; i++){
        arr[i].setAttribute("class", "classItemLetter");
    }
    var elem = document.getElementById(letter);
    elem.className += (" selected");

    var currentClassNum = document.getElementsByClassName("classItemNum selected")[0].id;

	if(type=="students")updateStudentsPresence(currentClassNum, letter);
	else updateSchedule(currentClassNum, letter);
}

function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
