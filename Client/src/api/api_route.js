// Client / src / api/ api_route.js

const API_ROUTES = {
  COMPANY: {
    REGISTER: "/api/company/register",
    LOGIN: "/api/company/login",
    COMPANY: "/api/company/company",
    POST_JOB: "/api/company/post-job",
    APPLICANTS: "/api/company/applicants",
    LIST_JOBS: "/api/company/list-jobs",
    CHANGE_VISIBILITY: (id) => `/api/company/change-visibility/${id}`,
    CHANGE_STATUS: (id, status) => `/api/company/change-status/${id}/${status}`,
    UPDATE_JOB: (id) => `/api/company/update-job/${id}`,
    DELETE_JOB: (id) => `/api/company/delete-job/${id}`,
  },
  JOBS: {
    GET: "/api/jobs/get",
    GET_BY_ID: (id) => `/api/jobs/get/${id}`,
  },
  USERS: {
    ME: "/api/users/me",
    APPLY: "/api/users/apply",
    APPLICATIONS: "/api/users/applications",
    RESUME: "/api/users/resume",
  },
};

export default API_ROUTES;
