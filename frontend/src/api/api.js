import axios from "./axios";

// ── AUTH ──────────────────────────────────────────────────────────────────────
export const registerUser = (data) => axios.post("/auth/register", data).then(r => r.data);
export const loginUser    = (data) => axios.post("/auth/login",    data).then(r => r.data);

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
export const getDashboard = () => axios.get("/dashboard").then(r => r.data);

// ── CLIENTS ───────────────────────────────────────────────────────────────────
export const getClients   = ()        => axios.get("/clients").then(r => r.data);
export const createClient = (data)    => axios.post("/clients", data).then(r => r.data);
export const updateClient = (id, data)=> axios.put(`/clients/${id}`, data).then(r => r.data);
export const deleteClient = (id)      => axios.delete(`/clients/${id}`).then(r => r.data);

// ── PROJECTS ──────────────────────────────────────────────────────────────────
export const getProjects   = ()        => axios.get("/projects").then(r => r.data);
export const createProject = (data)    => axios.post("/projects", data).then(r => r.data);
export const updateProject = (id, data)=> axios.put(`/projects/${id}`, data).then(r => r.data);
export const deleteProject = (id)      => axios.delete(`/projects/${id}`).then(r => r.data);

// ── TASKS ─────────────────────────────────────────────────────────────────────
// Backend expects: { title, dueDate, projectId } — projectId links task to project
export const getTasksByProject = (projectId) => axios.get(`/tasks/project/${projectId}`).then(r => r.data);
export const createTask        = (data)       => axios.post("/tasks", data).then(r => r.data);
export const updateTask        = (id, data)   => axios.put(`/tasks/${id}`, data).then(r => r.data);
export const deleteTask        = (id)         => axios.delete(`/tasks/${id}`).then(r => r.data);
export const markTaskComplete  = (id)         => axios.patch(`/tasks/${id}/complete`).then(r => r.data);