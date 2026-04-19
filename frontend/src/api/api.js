import axios from "./axios";

// Register
export const registerUser = async (data) => {
  const res = await axios.post("/auth/register", data);
  return res.data;
};

// Login
export const loginUser = async (data) => {
  const res = await axios.post("/auth/login", data);
  return res.data;
};

// Dashboard
export const getDashboard = async () => {
  const res = await axios.get("/dashboard");
  return res.data;
};

// Projects
export const getProjects = async () => {
  const res = await axios.get("/projects");
  return res.data;
};

// GET all clients
export const getClients = () => axios.get("/clients");

// CREATE client
export const createClient = (data) => axios.post("/clients", data);

// // UPDATE client
// export const updateClient = (id, data) =>
//   axios.put(`/clients/${id}`, data);

// // DELETE client
// export const deleteClient = (id) =>
//   axios.delete(`/clients/${id}`);


// // UPDATE project (Used for changing payment status)
// export const updateProject = async (id, data) => {
//   const res = await axios.put(`/projects/${id}`, data);
//   return res.data;
// };


export const updateClient = (id, data) => axios.put(`/clients/${id}`, data); 
export const deleteClient = (id) => axios.delete(`/clients/${id}`); 

export const updateProject = async (id, data) => {
  const res = await axios.put(`/projects/${id}`, data); 
  return res.data; 
};