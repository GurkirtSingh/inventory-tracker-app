const SERVER_CON_REFUSED_MSG = "Unable to connect to server. Try again.";
// Add single Item to the databse
export const addItem = async (data) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/item`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: SERVER_CON_REFUSED_MSG },
    }));
};
// GET All item from database
export const getAllItems = async () => {
  const fetchOptions = {
    method: "GET",
  };
  return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/item`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: SERVER_CON_REFUSED_MSG },
    }));
};

// GET Single Item
export const getItem = async (itemId) => {
  const fetchOptions = {
    method: "GET",
  };
  return await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/item/${itemId}/getOne`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: SERVER_CON_REFUSED_MSG },
    }));
};

// PATCH Single Item
export const updateItem = async (data) => {
  const fetchOptions = {
    method: "PATCH",
  };
  return await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/item?` + new URLSearchParams(data),
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: SERVER_CON_REFUSED_MSG },
    }));
};

// PATCH Single Item
export const deleteItem = async (itemId) => {
  const fetchOptions = {
    method: "DELETE",
  };
  return await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/item/${itemId}`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: SERVER_CON_REFUSED_MSG },
    }));
};

// Add single Warehouse to the databse
export const addWarehouse = async (data) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/warehouse`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: SERVER_CON_REFUSED_MSG },
    }));
};

// Get all the warehouses
export const getAllWarehouses = async () => {
  const fetchOptions = {
    method: "GET",
  };
  return await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/warehouse`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: SERVER_CON_REFUSED_MSG },
    }));
};
