// fetch the data from the server with axios
const axios = require("axios");

const API_ENDPOINT = "http://localhost:5005/";

// Task 10:
// Add the code for getting the list of books available in the shop (done in Task 1)
// using Promise callbacks or async-await with Axios.

const getBooks = async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Task 11:
// Add the code for getting the book details based on ISBN (done in Task 2)
// using Promise callbacks or async-await with Axios.

const getBookByISBN = async (isbn) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}isbn/${isbn}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Task 12:
// Add the code for getting the book details based on Author (done in Task 3)
// using Promise callbacks or async-await with Axios.

const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}author/${author}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Task 13:
// Add the code for getting the book details based on Title (done in Task 4)
// using Promise callbacks or async-await with Axios.

const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}title/${title}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
