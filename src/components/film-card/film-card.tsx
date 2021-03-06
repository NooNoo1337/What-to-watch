import * as React from 'react';
import {Link} from 'react-router-dom';

// Components
import VideoPlayer from '../video-player/video-player';

// Types
import {Film} from "../../types";

interface Props {
  film: Film,
  onMouseEnter: (evt) => void,
  onMouseLeave: () => void,
  isVideoPlaying: boolean
}

const FilmCard = (props: Props) => {
  const {
    film,
    isVideoPlaying,
    onMouseEnter,
    onMouseLeave,
  } = props;
  return (
    <>
      <article className="small-movie-card catalog__movies-card" data-film-id={film.id} onMouseEnter={onMouseEnter}
               onMouseLeave={onMouseLeave}>
        <Link to={`/film/${film.id}`}>
          <VideoPlayer
            posterSrc={film.preview_image}
            videoSrc={film.preview_video_link}
            videoFormat="video/mp4"
            isVideoPlaying={isVideoPlaying}
            isSoundOff={true}
          />
        </Link>
        <h3 className="small-movie-card__title">
          <Link to={`/film/${film.id}`} className="small-movie-card__link">
            {film.name}
          </Link>
        </h3>
      </article>
    </>
  );
};

export default FilmCard;

