const BACKEND_URL = "http://127.0.0.1:8080";
export async function getStudents() {
    try {
        const response = await axios.get(`${BACKEND_URL}/student`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
export async function postStudent(student) {
    try {
        const response = await axios.post(`${BACKEND_URL}/student`, student);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
export async function updateStudent(id, student) {
    try {
        const response = await axios.put(`${BACKEND_URL}/student/${id}`, student);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
export async function deleteStudent(id) {
    try {
        const response = await axios.delete(`${BACKEND_URL}/student/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
