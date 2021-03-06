import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Book.css';
import * as api from '../utils/api';

const Book = ({ book, shelves, updateBookShelf }) => {
  const [storedBook, setStoredBook] = useState({ shelf: 'none' });

  useEffect(() => {
    let mounted = true;
    async function getBook(id) {
      const storedBook = await api.get(id);
      if (mounted) setStoredBook(storedBook);
    }

    getBook(book.id);

    return () => {
      mounted = false;
    };
  }, [book]);

  return (
    <li>
      <div className="book">
        <div className="book-top">
          {book.imageLinks.smallThumbnail && (
            <img
              src={book.imageLinks.smallThumbnail}
              alt={book.title}
              className="book-cover"
            />
          )}
          {!book.imageLinks.smallThumbnail && (
            <div className="book-cover-title">{book.title}</div>
          )}
          <div className="book-shelf-changer">
            <select
              name="options"
              value={storedBook.shelf}
              onChange={async (e) => {
                updateBookShelf(book, e.target.value);
                setStoredBook({ shelf: e.target.value });
              }}
            >
              <option value="moveto" disabled>
                Move To...
              </option>
              {shelves.map((shelf) => (
                <option key={shelf.id} value={shelf.id}>
                  {shelf.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && (
          <div className="book-authors">{book.authors.join(', ')}</div>
        )}
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelves: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default Book;
