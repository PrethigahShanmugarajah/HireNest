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
