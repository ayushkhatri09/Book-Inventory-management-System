// const API_URL = "http://127.0.0.1:8000/api/books";

// async function request(url, options = {}) {
//   const res = await fetch(url, {
//     headers: { "Content-Type": "application/json" },
//     ...options,
//   });

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({}));
//     throw errorData;
//   }

//   if (res.status === 204) return null;
//   return res.json();
// }

// export function getBooks(params = {}) {
//   const query = new URLSearchParams(params).toString();
//   return request(`${API_URL}/?${query}`);
// }

// export function getStats() {
//   return request(`${API_URL}/stats/`);
// }

// export function createBook(data) {
//   return request(`${API_URL}/`, { method: "POST", body: JSON.stringify(data) });
// }

// export function updateBook(id, data) {
//   return request(`${API_URL}/${id}/`, { method: "PUT", body: JSON.stringify(data) });
// }

// export function deleteBook(id) {
//   return request(`${API_URL}/${id}/`, { method: "DELETE" });
// }

// export function bulkCreateBooks(list) {
//   return request(`${API_URL}/bulk/`, { method: "POST", body: JSON.stringify(list) });
// }

// export function getBook(id) {
//   return request(`${API_URL}/${id}/`);
// }

// const BORROW_URL = "http://127.0.0.1:8000/api/borrows";

// export function getBorrows() {
//   return request(`${BORROW_URL}/`);
// }

// export function createBorrow(data) {
//   return request(`${BORROW_URL}/`, { method: "POST", body: JSON.stringify(data) });
// }

// export function returnBorrow(id) {
//   return request(`${BORROW_URL}/${id}/return/`, { method: "POST" });
// }

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const API_URL = `${API_BASE_URL}/api/books`;
const BORROW_URL = `${API_BASE_URL}/api/borrows`;

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw errorData;
  }

  if (res.status === 204) return null;
  return res.json();
}

export function getBooks(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`${API_URL}/?${query}`);
}

export function getStats() {
  return request(`${API_URL}/stats/`);
}

export function createBook(data) {
  return request(`${API_URL}/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateBook(id, data) {
  return request(`${API_URL}/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteBook(id) {
  return request(`${API_URL}/${id}/`, {
    method: "DELETE",
  });
}

export function bulkCreateBooks(list) {
  return request(`${API_URL}/bulk/`, {
    method: "POST",
    body: JSON.stringify(list),
  });
}

export function getBook(id) {
  return request(`${API_URL}/${id}/`);
}

export function getBorrows() {
  return request(`${BORROW_URL}/`);
}

export function createBorrow(data) {
  return request(`${BORROW_URL}/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function returnBorrow(id) {
  return request(`${BORROW_URL}/${id}/return/`, {
    method: "POST",
  });
}