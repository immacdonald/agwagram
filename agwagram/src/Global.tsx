const API_BASE: string =
  window.location.origin == "http://localhost:8000"
    ? "http://localhost:8080"
    : window.location.origin;
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

export const GRAPH_COLORS = ["#143aa2", "#a31444", "#a37a14", "#11a2a3"];

export const graphColor = (index: number): string => {
  return GRAPH_COLORS[index % GRAPH_COLORS.length];
};

export const VERSION: string = "1.5.0";
