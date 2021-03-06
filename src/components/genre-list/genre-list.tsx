import * as React from 'react';
import * as classNames from 'classnames';

interface Props {
  genres: string[],
  activeGenre: string,
  onGenreChange: (evt, genre: string) => void,
}

const GenreList = (props: Props) => {
  const {genres, activeGenre, onGenreChange} = props;
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) =>
        <li className={classNames({
          'catalog__genres-item': true,
          'catalog__genres-item--active': activeGenre === genre,
        })} key={`genre-${genre}`}>
          <a href="#" className="catalog__genres-link" onClick={(evt) => onGenreChange(evt, genre)}>{genre}</a>
        </li>
      )}
    </ul>
  );
};

export default GenreList;
