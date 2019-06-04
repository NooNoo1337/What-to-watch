import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import FilmsList from '../../components/films-list/films-list.jsx';
import GenreList from '../../components/genre-list/genre-list.jsx';
import SignIn from '../../components/sign-in/sign-in.jsx';

import withActiveCard from '../../hocs/with-active-card/with-active-card.js';
import withFormData from '../../hocs/with-form-data/with-form-data.js';

import {ActionCreators as DataActionCreators} from '../../reducer/data/data.js';
import {ActionCreators as UserActionCreators, Operations as UserOperations} from '../../reducer/user/user.js';

import {getUniqGenres, getActiveGenre, getFilteredFilms} from '../../reducer/data/selectors.js';

const FilmListWithActiveCard = withActiveCard(FilmsList);
const SignInWithFormData = withFormData({'user-email': ``, 'user-password': ``})(SignIn);

class App extends Component {
  render() {
    const {isAuthenticationRequired} = this.props;

    return (
      <>
        <div className="visually-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <symbol id="add" viewBox="0 0 19 20">
              <title>+</title>
              <desc>Created with Sketch.</desc>
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"/>
              </g>
            </symbol>
            <symbol id="full-screen" viewBox="0 0 27 27">
              <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7"/>
            </symbol>
            <symbol id="in-list" viewBox="0 0 18 14">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5"/>
            </symbol>
            <symbol id="pause" viewBox="0 0 14 21">
              <title>Artboard</title>
              <desc>Created with Sketch.</desc>
              <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"/>
                <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"/>
              </g>
            </symbol>
            <symbol id="play-s" viewBox="0 0 19 19">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
            </symbol>
          </svg>
        </div>

       {
         (isAuthenticationRequired) ? this.renderLoginScreen() : this.renderMainScreen()
       }
      </>
    );
  }

  renderLoginScreen() {
    return (
      <SignInWithFormData onSignInSubmit={this.props.onSignInSubmit}/>
    );
  }

  renderMainScreen() {
    const {
      films,
      genres,
      activeGenre,
      accountData,
      onGenreChange,
      onCardTitleClick,
      onSignInClick,
    } = this.props;

    return (
      <>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              {
                accountData ?
                  (
                    <div className="user-block__avatar">
                      <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                    </div>
                  ) :
                  (
                    <div className="user-block">
                      <a href="sign-in.html" className="user-block__link" onClick={onSignInClick}>Sign in</a>
                    </div>
                  )
              }
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327"/>
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">Drama</span>
                  <span className="movie-card__year">2014</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <GenreList genres={genres} activeGenre={activeGenre} onGenreChange={onGenreChange} />
            <FilmListWithActiveCard films={films} onCardTitleClick={onCardTitleClick}/>
            <div className="catalog__more">
              <button className="catalog__button" type="button">Show more</button>
            </div>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    'id': PropTypes.number,
    'background_color': PropTypes.string,
    'background_image': PropTypes.string,
    'description': PropTypes.string,
    'director': PropTypes.string,
    'genre': PropTypes.string,
    'is_favorite': PropTypes.bool,
    'name': PropTypes.string,
    'poster_image': PropTypes.string,
    'preview_image': PropTypes.string,
    'preview_video_link': PropTypes.string,
    'rating': PropTypes.number,
    'released': PropTypes.number,
    'run_time': PropTypes.number,
    'scores_count': PropTypes.number,
    'starring': PropTypes.array,
    'video_link': PropTypes.string,
  })).isRequired,
  accountData: PropTypes.shape(({
    'id': PropTypes.number,
    'email': PropTypes.string,
    'name': PropTypes.string,
    'avatar_url': PropTypes.string,
  })),
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string,
  isAuthenticationRequired: PropTypes.bool,
  isUserAuthenticated: PropTypes.bool,
  onCardTitleClick: PropTypes.func,
  onGenreChange: PropTypes.func,
  onSignInClick: PropTypes.func,
  onSignInSubmit: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    films: getFilteredFilms(state),
    genres: getUniqGenres(state),
    activeGenre: getActiveGenre(state),
    isAuthenticationRequired: state[`USER`].isAuthenticationRequired,
    isUserAuthenticated: state[`USER`].isUserAuthenticated,
    accountData: state[`USER`].accountData,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (evt, genre) => {
    evt.preventDefault();
    dispatch(DataActionCreators.changeActiveGenre(genre));
    dispatch(DataActionCreators.getFilmsByGenre(genre));
  },

  onSignInSubmit: (evt, data) => {
    evt.preventDefault();
    dispatch(UserOperations.sendUserData(data));
  },

  onSignInClick: (evt) => {
    evt.preventDefault();
    dispatch(UserActionCreators.requireAuthentication(true));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
