import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function BookList() {
  return (
    <>
      <h1>Books</h1>
      <Link to="/books/1"> Book 1 </Link>
      <Link to="/books/2"> Book 2 </Link>
      <Outlet/>
    </>
  );
}

export default BookList;