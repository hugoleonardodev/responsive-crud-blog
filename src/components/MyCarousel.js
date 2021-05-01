import React, { Component } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
import carouselInitialState from '../data/carouselInitialState';

var instanceCarousel;
export default class MyCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };

    this.getLocalStorage = this.getLocalStorage.bind(this);
  }

  getLocalStorage() {
    const blog = JSON.parse(localStorage.getItem('blog'));

    this.setState({
      articles: blog.articles,
    });
  }

  setLocalStorage() {
    const blog = JSON.parse(localStorage.getItem('blog'));

    if (blog === null) {
      localStorage.setItem('blog', JSON.stringify(carouselInitialState));
    }
    // console.log(blog);
    this.getLocalStorage();
  }

  initMyCarousel() {
    const options = {
      duration: 500,
      // fullWidth: true, // another version for the carousel
      // numVisible: 10, // max five
      // onCycleTo: () => {
      //   console.log('New Slide'); // callback when click on new slide
      // },
    };

    M.Carousel.init(this.Carousel, options);
  }

  componentDidMount() {
    this.initMyCarousel();
    this.setLocalStorage();
  }

  componentWillUnmount() {
    const allToolTipsElements = document.querySelectorAll('.tooltipped');
    // console.log(allToolTipsElements);
    allToolTipsElements.forEach((element) => {
      instanceCarousel = M.Tooltip.getInstance(element);
      // console.log(instanceCarousel);
      instanceCarousel.destroy();
    });
  }

  render() {
    const { articles } = this.state;
    // console.log(articles);
    return (
      <div>
        <div
          ref={(Carousel) => {
            this.Carousel = Carousel;
          }}
          className="carousel"
        >
          <div>
            <Link
              className="tooltipped carousel-item"
              data-tooltip={articles.length > 0 ? articles[4].title : 'default'}
              to={`/update/${articles.length}`}
              data-testid={`update-${articles.length - 1}`}
            >
              <img
                alt={articles.length > 0 ? articles[4].title : 'default'}
                src={articles.length > 0 ? articles[4].image : 'default'}
              />
            </Link>
            <Link
              className="tooltipped carousel-item"
              data-tooltip={articles.length > 0 ? articles[3].title : 'default'}
              to={`/update/${articles.length}`}
              data-testid={`update-${articles.length - 2}`}
            >
              <img
                alt={articles.length > 0 ? articles[3].title : 'default'}
                src={articles.length > 0 ? articles[3].image : 'default'}
              />
            </Link>
            <Link
              className="tooltipped carousel-item"
              data-tooltip={articles.length > 0 ? articles[2].title : 'default'}
              to={`/update/${articles.length}`}
              data-testid={`update-${articles.length - 3}`}
            >
              <img
                alt={articles.length > 0 ? articles[2].title : 'default'}
                src={articles.length > 0 ? articles[2].image : 'default'}
              />
            </Link>
            <Link
              className="tooltipped carousel-item"
              data-tooltip={articles.length > 0 ? articles[1].title : 'default'}
              to={`/update/${articles.length}`}
              data-testid={`update-${articles.length - 4}`}
            >
              <img
                alt={articles.length > 0 ? articles[1].title : 'default'}
                src={articles.length > 0 ? articles[1].image : 'default'}
              />
            </Link>
            <Link
              className="tooltipped carousel-item"
              data-tooltip={articles.length > 0 ? articles[0].title : 'default'}
              to={`/update/${articles.length}`}
              data-testid={`update-${articles.length - 5}`}
            >
              <img
                alt={articles.length > 0 ? articles[0].title : 'default'}
                src={articles.length > 0 ? articles[0].image : 'default'}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
