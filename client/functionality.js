//grozen kod
function setCookie(value){
	var d = new Date();
	d.setTime(d.getTime() + 30*24*60*60*1000);
	var expires = "expires="+d.toUTCString();
	document.cookie = "style="+value+";"+expires+";path=/";
}

function getCookie(){
	var cookieArray = document.cookie.split(';').toString();
	return cookieArray.substring(6);
}

function switchStyle(style){
    if(getCookie() == "light")style="dark"
    else style="light"

	setCookie(style);
	setStyleInCookie();
}

function setStyleInCookie(){
	var ss = document.getElementsByTagName('link');
	var i;
	for(i=0; i<ss.length; i++){
		if(getCookie() == ss[i].title)ss[i].disabled = false;
		else ss[i].disabled = true;
	}
}

function updateStudentsPresence(){
	var table = document.getElementById('studentsTable');

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

	//ime, predmet, isIn, lLoc
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
