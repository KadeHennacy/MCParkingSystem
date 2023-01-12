import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BookList from './components/BookList';
import Book from './components/Book';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';


function App() {
  return (
    <>
      <header>
        <p> Hello World! </p>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>

        {/* React Router knows what url the browser is on, so if you're on the root page it will automatically render the home page */}
        {/* Whaterver is set as the element is what is rendered if the url matches that path, but you can render stuff that stays consisten such as a nav bar also */}

        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>

        {/* Nested routes */}

        {/* 
        <Route path="/books" element={<BookList />}></Route>
        <Route path="/books/:id" element={<Book />}></Route> 
        Below does same thing
        */}

        <Route path="books" element={<BookList/>}>
          <Route path=":id" element={<Book />}></Route>
        </Route>


        {/* 404 page */}

        <Route path="*" element={<h1>404 Page not found!</h1>} />

      </Routes>
    </>
  );
}

export default App;
