// O'quvchilar obyekti: har bir sinf alohida massiv
let students = {
  "1A": [],
  "2A": [],
  "3A": [],
  "4A": [],
  "5A": [],
  "6A": [],
  "7A": [],
  "8A": [],
  "9A": [],
  "10A": [],
  "11A": []
};

// LocalStorage'dan oldingi ma'lumotni yuklash
if(localStorage.getItem("attendance")){
  students = JSON.parse(localStorage.getItem("attendance"));
}

// Jadvalni render qilish
function renderTable(classStudents){
  const table = document.getElementById("attendanceTable");
  table.innerHTML = "<tr><th>Ism</th><th>Familiya</th><th>Davomat</th></tr>";

  classStudents.forEach((s, index) => {
    const row = table.insertRow();
    row.insertCell(0).innerText = s.name;
    row.insertCell(1).innerText = s.surname;

    const selectCell = row.insertCell(2);
    const select = document.createElement("select");
    ["Bor","Yo'q","Sababli"].forEach(opt=>{
      const option = document.createElement("option");
      option.value = opt;
      option.innerText = opt;
      if(s.status === opt) option.selected = true;
      select.appendChild(option);
    });
    selectCell.appendChild(select);
    s.selectElement = select; // saqlash uchun
  });
}

// Sinfni yuklash
function loadClass() {
  const className = document.getElementById("classSelect").value;
  const classStudents = students[className] || [];
  renderTable(classStudents);
}

// O'quvchi qo'shish
function addStudent() {
  const className = document.getElementById("classSelect").value;
  const name = document.getElementById("studentName").value.trim();
  const surname = document.getElementById("studentSurname").value.trim();
  if(!name || !surname) return alert("Iltimos ism va familiyani kiriting");

  const newStudent = {name, surname};
  if(!students[className]) students[className] = [];
  students[className].push(newStudent);
  renderTable(students[className]);

  document.getElementById("studentName").value = "";
  document.getElementById("studentSurname").value = "";
}

// Davomatni saqlash
function saveAttendance(){
  for(let className in students){
    students[className].forEach(s=>{
      if(s.selectElement) s.status = s.selectElement.value;
      delete s.selectElement;
    });
  }
  localStorage.setItem("attendance", JSON.stringify(students));
  alert("Davomat saqlandi!");
}

// Sahifa ochilganda avtomatik 1-A sinfni yuklash
window.onload = function(){
  loadClass();
};
