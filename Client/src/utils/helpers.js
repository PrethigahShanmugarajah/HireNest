// Client / src / utils / helpers.js

/* -------- Format text (capitalize words & clean symbols) -------- */
export const formatText = (name = "") => {
  return String(name)
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/* -------- Convert numbers >= 1000 to 'k' format -------- */
export const kConverter = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return num;
  }
};

/* -------- Get time ago: Returns how long ago a date was in simple words -------- */
export const getTimeAgo = (date) => {
  if (!date) return "";

  const now = new Date();
  const postedDate = new Date(date);

  const diffInSeconds = Math.floor((now - postedDate) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
};
