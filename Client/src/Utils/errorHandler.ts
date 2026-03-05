export const getErrorMessage = (error: any) => {
  // Check if it's an Axios error with a response from the backend
  if (error.response) {
    return {
      message: error.response.data.message || "An error occurred",
      status: error.response.status, // e.g., 400, 401, 409
      errors: error.response.data.errors || null // For validation errors (like express-validator)
    };
  }
  // For network errors (backend is down)
  return { message: "Network error. Please check your connection.", status: 503 };
};