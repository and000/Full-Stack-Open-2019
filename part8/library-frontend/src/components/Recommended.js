import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';

const ME = gql`
  {
    me {
      username
      favoriteGenre
    }
  }
`;

const Books = props => {
  const [fillter, setFillter] = useState('');

  // ! this way, the query can be called async or in a useEffect hook! using the client hool
  const client = useApolloClient();

  useEffect(() => {
    client.query({ query: ME }).then(response => {
      console.log(response.data);
      if (response.data.me) setFillter(response.data.me.favoriteGenre);
    });
  }, [client]);

  if (!props.show) {
    return null;
  }

  const books = props.books.data.allBooks;

  console.log('PROPS', props);

  const filteredBooks = () => {
    if (!fillter) return books;
    return books.filter(book => book.genres.includes(fillter));
  };

  return (
    <div>
      <h2>books in your favourite genre {fillter}</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks().map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
