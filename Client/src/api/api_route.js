// Client / src / api/ api_route.js

const API_ROUTES = {
  COMPANY: {
    REGISTER: "/api/company/register",
    LOGIN: "/api/company/login",
    COMPANY: "/api/company/company",
    POST_JOB: "/api/company/post-job",
    LIST_JOBS: "/api/company/list-jobs",
    CHANGE_VISIBILITY: "/api/company/change-visiblity",
    UPDATE_JOB: (id) => `/api/company/update-job/${id}`,
    DELETE_JOB: "/api/company/delete-job",
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
