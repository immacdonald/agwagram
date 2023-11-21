const API_BASE: string = "http://localhost:8080";
export const API_URL: string = `${API_BASE}/api/v1`;

export const formatDate = (input: Date | string): string => {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
