
function updateStudentsPresence(classNum, classLetter){
	var table = document.getElementById('studentsTable');
    table.innerHTML = "<tr class='title'><td width='30%'>Name</td><td>Number</td><td>Entered</td><td>Last location</td></tr>";
    var res = httpGet("/students?assigned_class="+classNum+"+"+classLetter);

    //name assigned_class guid id number_in_class
	//alert(res);

    var students = JSON.parse(res);
	//alert(students);
    var i;
    for(i=0; i<students.length; i++){
	    if(students[i].assigned_class == classNum+classLetter){

			var loc = httpGet("/current_attendaces/student/"+students[i].id);
			var jsonStudent = JSON.parse(res);

            addStudentRow(table, students[i].name, students[i].number_in_class, "ENT", students[i].room, students[i].id);
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
	var res = httpGet("/teachers");
    var teachers = JSON.parse(res);
	var i;
    for(i=0; i<teachers.length; i++){
		var loc = httpGet("/current_attendances/teacher/"+teachers[i].id);
		var jsonTeacher = JSON.parse(res);
		addTeacherRow(table, teachers[i].name, "IN", loc);
		var row = table.insertRow(-1);
        var cell = row.insertCell(-1);
        cell.colSpan = 3;
        cell.appendChild(document.createElement("HR"));
	}
}

function updateSchedule(num, letter){
	if(num.toString()=="11" && letter=="a"){
		document.getElementById("a1").innerHTML = "Math";
		document.getElementById("a2").innerHTML = "Math";
		document.getElementById("a3").innerHTML = "History";
		document.getElementById("a4").innerHTML = "History";
		document.getElementById("a5").innerHTML = "Programming";
		document.getElementById("a6").innerHTML = "Programming";

		document.getElementById("b1").innerHTML = "English";
		document.getElementById("b2").innerHTML = "English";
		document.getElementById("b3").innerHTML = "English";
		document.getElementById("b4").innerHTML = "Philosophy";
		document.getElementById("b5").innerHTML = "Philosophy";
		document.getElementById("b6").innerHTML = "Philosophy";

		document.getElementById("c1").innerHTML = "Programming";
		document.getElementById("c2").innerHTML = "Programming";
		document.getElementById("c3").innerHTML = "Literature";
		document.getElementById("c4").innerHTML = "Literature";
		document.getElementById("c5").innerHTML = "Web Design";
		document.getElementById("c6").innerHTML = "Web Design";

		document.getElementById("d1").innerHTML = "Science";
		document.getElementById("d2").innerHTML = "Science";
		document.getElementById("d3").innerHTML = "Math";
		document.getElementById("d4").innerHTML = "Math";
		document.getElementById("d5").innerHTML = "English";
		document.getElementById("d6").innerHTML = "English";

		document.getElementById("e1").innerHTML = "Literature";
		document.getElementById("e2").innerHTML = "Literature";
		document.getElementById("e3").innerHTML = "Programming";
		document.getElementById("e4").innerHTML = "Programming";
		document.getElementById("e5").innerHTML = "Russian";
		document.getElementById("e6").innerHTML = "Russian";
	}else{
		document.getElementById("a1").innerHTML = "";
		document.getElementById("a2").innerHTML = "";
		document.getElementById("a3").innerHTML = "";
		document.getElementById("a4").innerHTML = "";
		document.getElementById("a5").innerHTML = "";
		document.getElementById("a6").innerHTML = "";

		document.getElementById("b1").innerHTML = "";
		document.getElementById("b2").innerHTML = "";
		document.getElementById("b3").innerHTML = "";
		document.getElementById("b4").innerHTML = "";
		document.getElementById("b5").innerHTML = "";
		document.getElementById("b6").innerHTML = "";

		document.getElementById("c1").innerHTML = "";
		document.getElementById("c2").innerHTML = "";
		document.getElementById("c3").innerHTML = "";
		document.getElementById("c4").innerHTML = "";
		document.getElementById("c5").innerHTML = "";
		document.getElementById("c6").innerHTML = "";

		document.getElementById("d1").innerHTML = "";
		document.getElementById("d2").innerHTML = "";
		document.getElementById("d3").innerHTML = "";
		document.getElementById("d4").innerHTML = "";
		document.getElementById("d5").innerHTML = "";
		document.getElementById("d6").innerHTML = "";

		document.getElementById("e1").innerHTML = "";
		document.getElementById("e2").innerHTML = "";
		document.getElementById("e3").innerHTML = "";
		document.getElementById("e4").innerHTML = "";
		document.getElementById("e5").innerHTML = "";
		document.getElementById("e6").innerHTML = "";
	}
}

function addTeacherRow(table, name, isIn, lLoc){
	var row = table.insertRow(-1);
    row.classList.add('teacher-row');

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
    var absc = httpGet("/attendances/student/"+uid.toString());
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
