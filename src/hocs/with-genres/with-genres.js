import React, {Component} from 'react';
import PropTypes from 'prop-types';

const withGenres = (WrappedComponent) => {
  class WithGenres extends Component {
    constructor(props) {
      super(props);
      this.state = {
        genres: [],
      };
    }

    componentWillMount() {
      this.getGenres(this.props.films);
    }

    getGenres(films) {
      const filmGenresCollection = films.map((film) => film.genre);
      this.setState({
        genres: [`All genres`, ...new Set(filmGenresCollection)]
      });
    }

    render() {
      return <WrappedComponent
        genres={this.state.genres}
        {...this.props} />;
    }
  }

  WithGenres.propTypes = {
    films: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      genre: PropTypes.string,
      title: PropTypes.string,
      preview: PropTypes.string,
    })).isRequired,
  };

  return WithGenres;
};

export default withGenres;