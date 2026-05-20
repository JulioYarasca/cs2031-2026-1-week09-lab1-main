import {
  getStudents,
  postStudent,
  deleteStudent
} from './api.js'

/* 1. Extraer los valores de los campos */
const form: HTMLFormElement | null = document.getElementById('form') as HTMLFormElement;
const firstname: HTMLInputElement | null = document.getElementById('firstname') as HTMLInputElement;
const lastname: HTMLInputElement | null = document.getElementById('lastname') as HTMLInputElement;
const email: HTMLInputElement | null = document.getElementById('email') as HTMLInputElement;
const phone: HTMLInputElement | null = document.getElementById('phone') as HTMLInputElement;
const age: HTMLInputElement | null = document.getElementById('age') as HTMLInputElement;
const description: HTMLInputElement | null = document.getElementById('description') as HTMLInputElement;
const password: HTMLInputElement | null = document.getElementById('password') as HTMLInputElement;
const repeatPassword: HTMLInputElement | null = document.getElementById('repeatPassword') as HTMLInputElement;
const result: HTMLElement | null = document.getElementById('result') as HTMLElement;

/* 2. Crea una interfaz con la forma y tipo de datos de los campos del formulario */
interface Student {
  id: number | null;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  age: number;
  description: string;
  password: string;
}

const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

/* 3. Crea un EventListener en el formulario que ejecute una función al enviarlo */
form?.addEventListener('submit', (e) => {
  e.preventDefault();

  /* 4. Realiza una validación de la entrada de los datos */
  if (firstname.value.length < 3) {
    alert('Firstname must be at least 3 characters');
    return;
  }

  if (lastname.value.length < 3) {
    alert('Lastname must be at least 3 characters');
    return;
  }

  if (email.value.length < 3) {
    alert('Email must be at least 3 characters');
    return;
  }

  if (!validateEmail(email.value)) {
    alert('Email is not valid');
    return;
  }

  if (phone.value.length < 9) {
    alert('Phone must be at least 9 characters');
    return;
  }

  if (parseInt(age.value) < 13) {
    alert('Age must be at least 13');
    return;
  }

  if (description.value.length < 10) {
    alert('Description must be at least 10 characters');
    return;
  }

  if (password.value.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }

  if (password.value !== repeatPassword.value) {
    alert('Passwords do not match');
    return;
  }

  const student: Student = {
    id: null,
    firstname: firstname?.value,
    lastname: lastname?.value,
    email: email?.value,
    phone: phone?.value,
    age: parseInt(age?.value),
    description: description?.value,
    password: password?.value
  }

  /* 5. Imprimir en consola los datos rellenados*/
  // console.log(student);

  /* 6. Muestra los datos rellenados en el documento HTML */
  result.innerHTML = `
    <h2 class="text-xl font-bold">student Info</h2>
    <p><b>Firstname:</b> ${student.firstname}</p>
    <p><b>Lastname:</b> ${student.lastname}</p>
    <p><b>Email:</b> ${student.email}</p>
    <p><b>Phone:</b> ${student.phone}</p>
    <p><b>Age:</b> ${student.age}</p>
    <p><b>Description:</b> ${student.description}</p>
    <p><b>Password:</b> ${student.password}</p>
  `;

  /* 7. Envia los datos al backend */
  async function callPostStudent(student: Student) {
    const res = await postStudent(student);
    console.log(res);
  }

  callPostStudent(student);
});

/* 8. Obten los estudiantes del backend */
const buttonStudents: HTMLElement | null = document.getElementById('buttonStudents') as HTMLElement;
const resultStudents: HTMLElement | null = document.getElementById('resultStudents') as HTMLElement;


buttonStudents?.addEventListener('click', async () => {
  const students = await getStudents();
  console.log(students);

  resultStudents.innerHTML = `
    ${students.map((student: Student) => `
      <li class="bg-slate-300 p-4 rounded-xl mb-2 flex justify-between">
        <div>
          <p><b>ID:</b> ${student.id}</p>
          <p><b>Firstname:</b> ${student.firstname}</p>
          <p><b>Lastname:</b> ${student.lastname}</p>
          <p><b>Email:</b> ${student.email}</p>
          <p><b>Phone:</b> ${student.phone}</p>
          <p><b>Age:</b> ${student.age}</p>
          <p><b>Description:</b> ${student.description}</p>
        </div>
        <div class="flex flex-col justify-between">
          <a href="update.html"><button class=" bg-slate-200 px-4 py-1 rounded-full hover:bg-slate-300">Edit</button></a>
          <button class="delete-button bg-slate-200 px-4 py-1 rounded-full hover:bg-slate-300" id="${student.id}">Delete</button>
        </div>
      </li>
    `).join('')}
  `;

  /* 9. Eliminar un estudiante por su id */
  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const studentId = (e.target as HTMLButtonElement).getAttribute('id');
      if (studentId) {
        deleteStudent(Number(studentId));
        alert(`Estudiante con id  ${studentId} eliminado`);
        window.location.reload();
      }
    });
  });
});

/* 10. Actualiza un estudiante por su id */
const formUpdate: HTMLFormElement | null = document.getElementById('form-update') as HTMLFormElement;
const id: HTMLInputElement | null = document.getElementById('id') as HTMLInputElement;

formUpdate?.addEventListener('submit', (e) => {
  e.preventDefault();

  const newStudent: Student = {
    id: Number(id?.value),
    firstname: firstname?.value,
    lastname: lastname?.value,
    email: email?.value,
    phone: phone?.value,
    age: Number(age?.value),
    description: description?.value,
    password: password?.value
  }

  async function callUpdateStudent(student: Student) {
    const res = await postStudent(student);
    console.log(res);
    alert(`Estudiante con id ${student.id} actualizado`);
    window.location.href = 'students.html';
  }

  callUpdateStudent(newStudent);
});