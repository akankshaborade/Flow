// import axios from "./axios";

// // Register
// export const registerUser = async (data) => {
//   const res = await axios.post("/auth/register", data);
//   return res.data;
// };

// // Login
// export const loginUser = async (data) => {
//   const res = await axios.post("/auth/login", data);
//   return res.data;
// };

// // Dashboard
// export const getDashboard = async () => {
//   const res = await axios.get("/dashboard");
//   return res.data;
// };

// // Projects 
 
// export const getProjects = async () => {
//   const res = await axios.get("/projects");
//   return res.data;
// };
 
// export const createProject = async (data) => {
//   const res = await axios.post("/projects", data);
//   return res.data;
// };
 
// export const updateProject = async (id, data) => {
//   const res = await axios.put(`/projects/${id}`, data);
//   return res.data;
// };
 
// export const deleteProject = async (id) => {
//   const res = await axios.delete(`/projects/${id}`);
//   return res.data;
// };
 

// // Clients
 
// export const getClients = () => axios.get("/clients");
 
// export const createClient = (data) => axios.post("/clients", data);
 
// export const updateClient = (id, data) => axios.put(`/clients/${id}`, data);
 
// export const deleteClient = (id) => axios.delete(`/clients/${id}`);

import axios from "./axios";

// ── Auth ───────────────────────────────────────────────────────────────────────

export const registerUser = async (data) => {
  const res = await axios.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post("/auth/login", data);
  return res.data;
};

// ── Dashboard ──────────────────────────────────────────────────────────────────

export const getDashboard = async () => {
  const res = await axios.get("/dashboard");
  return res.data;
};

// ── Projects ───────────────────────────────────────────────────────────────────

export const getProjects = async () => {
  const res = await axios.get("/projects");
  return res.data;
};

export const createProject = async (data) => {
  const res = await axios.post("/projects", data);
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await axios.put(`/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await axios.delete(`/projects/${id}`);
  return res.data;
};

// ── Clients ────────────────────────────────────────────────────────────────────

export const getClients = async () => {
  const res = await axios.get("/clients");
  return res.data;
};

export const createClient = async (data) => {
  const res = await axios.post("/clients", data);
  return res.data;
};

export const updateClient = async (id, data) => {
  const res = await axios.put(`/clients/${id}`, data);
  return res.data;
};

export const deleteClient = async (id) => {
  const res = await axios.delete(`/clients/${id}`);
  return res.data;
};