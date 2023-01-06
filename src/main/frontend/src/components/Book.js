import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Book() {
    const {id} = useParams();
  return (
    <>
      <h1>Book {id}</h1>
    </>
  );
}

export default Book;