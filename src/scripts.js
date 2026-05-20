import { getStudents, postStudent, deleteStudent } from './api.js';
/* 1. Extraer los valores de los campos */
const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const age = document.getElementById('age');
const description = document.getElementById('description');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('repeatPassword');
const result = document.getElementById('result');
const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
/* 3. Crea un EventListener en el formulario que ejecute una función al enviarlo */
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
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
    const student = {
        id: null,
        firstname: firstname === null || firstname === void 0 ? void 0 : firstname.value,
        lastname: lastname === null || lastname === void 0 ? void 0 : lastname.value,
        email: email === null || email === void 0 ? void 0 : email.value,
        phone: phone === null || phone === void 0 ? void 0 : phone.value,
        age: parseInt(age === null || age === void 0 ? void 0 : age.value),
        description: description === null || description === void 0 ? void 0 : description.value,
        password: password === null || password === void 0 ? void 0 : password.value
    };
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
    async function callPostStudent(student) {
        const res = await postStudent(student);
        console.log(res);
    }
    callPostStudent(student);
});
/* 8. Obten los estudiantes del backend */
const buttonStudents = document.getElementById('buttonStudents');
const resultStudents = document.getElementById('resultStudents');
buttonStudents === null || buttonStudents === void 0 ? void 0 : buttonStudents.addEventListener('click', async () => {
    const students = await getStudents();
    console.log(students);
    resultStudents.innerHTML = `
    ${students.map((student) => `
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
            const studentId = e.target.getAttribute('id');
            if (studentId) {
                deleteStudent(Number(studentId));
                alert(`Estudiante con id  ${studentId} eliminado`);
                window.location.reload();
            }
        });
    });
});
/* 10. Actualiza un estudiante por su id */
const formUpdate = document.getElementById('form-update');
const id = document.getElementById('id');
formUpdate === null || formUpdate === void 0 ? void 0 : formUpdate.addEventListener('submit', (e) => {
    e.preventDefault();
    const newStudent = {
        id: Number(id === null || id === void 0 ? void 0 : id.value),
        firstname: firstname === null || firstname === void 0 ? void 0 : firstname.value,
        lastname: lastname === null || lastname === void 0 ? void 0 : lastname.value,
        email: email === null || email === void 0 ? void 0 : email.value,
        phone: phone === null || phone === void 0 ? void 0 : phone.value,
        age: Number(age === null || age === void 0 ? void 0 : age.value),
        description: description === null || description === void 0 ? void 0 : description.value,
        password: password === null || password === void 0 ? void 0 : password.value
    };
    async function callUpdateStudent(student) {
        const res = await postStudent(student);
        console.log(res);
        alert(`Estudiante con id ${student.id} actualizado`);
        window.location.href = 'students.html';
    }
    callUpdateStudent(newStudent);
});
