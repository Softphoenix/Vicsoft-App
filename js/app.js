// student class represent a Student

class Student {
  constructor (name, course, start_date, end_date, reg_no){
    this.name = name;
    this.course = course;
    this.start_date = start_date;
    this.end_date = end_date;
    this.reg_no = reg_no;
  }

}
// ui class represent ui task

class UI {
  static displayStudents(){
  const students = Store.getStudents()
  students.forEach( (student) => UI.addStudent(student));
  }

  static addStudent(student){
    const list = document.getElementById('students')
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.course}</td>
    <td>${student.start_date}</td>
    <td>${student.end_date}</td>
    <td>${student.reg_no}</td>
    <td><a class='btn btn-danger btn-sm delete' href="#">X</a></td>`;
    list.appendChild(row);
  }

  static deleteStudent(el) {
     if (el.classList.contains('delete')){
        el.parentElement.parentElement.remove()
        UI.showAlert('student deleted successfully', 'danger')
     }

  }

  static clearForm() {
      document.getElementById('name').value = '';
      document.getElementById('course').value = '';  
      document.getElementById('start_date').value = '';
      document.getElementById('end_date').value = '';
      document.getElementById('reg_no').value = '';
  }
  static showAlert(message, className){
      if(document.querySelector('.alert')){
          document.querySelector('.alert').remove()

      }
      const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#students-form')
        container.insertBefore(div, form)
        
        setTimeout(() =>{
          div.remove()
        }, 4000)
  }
}

// Store class - to handle storage in our db

class Store {
  static getStudents() {
    let students; 
    if (localStorage.getItem('students') === null) {
      students = [];
    } else  {
      students = JSON.parse(localStorage.getItem('students'));
    }
    return students;
  } 
  
  static addStudent(student) {
    const students = Store.getStudents();
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
  }

  static deleteStudent(name) {
    const students = Store.getStudents();
    students.map((student, index) => {
    if (student.reg_no === name) {
      students.splice(index, 1);
    }
  });
    localStorage.setItem('students', JSON.stringify(students));
  }
}

// Event - display students(unclick,unpress,DOMContentLoaded,)

document.addEventListener('DOMContentLoaded',UI.displayStudents)

// Event - add new student

document.getElementById('students-form').addEventListener('submit', (e) => {
  // prevent default form summission behaviour
  e.preventDefault()
  // get form values
  const name = document.getElementById('name').value
  const course = document.getElementById('course').value
  const start_date = document.getElementById('start_date').value;
  const end_date = document.getElementById('end_date').value
  const reg_no = document.getElementById('reg_no').value
  
  if (name === '' || course === '' || start_date === '' || end_date === '' || reg_no === '') {
    //Please, fill in all thhe fields
    UI.showAlert('please fill in all field', 'danger');

  } else {
    const student = new Student(name, course, start_date, end_date, reg_no)
    UI.addStudent(student)
    Store.addStudent(student)
    UI.showAlert('student added successfully', 'success')
    UI.clearForm()
  }
})

// Remove A Student
document.getElementById('students').addEventListener('click', (e) => {
  UI.deleteStudent(e.target)

  // Remove From Storage
 Store.deleteStudent(e.target.parentElement.previousElementSibling.textContent)
})





