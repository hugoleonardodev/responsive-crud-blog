import React, { Component } from 'react';
import MyCardArticles from '../components/MyCardArticles';
// import M from 'materialize-css';
import MyBackToHomeBtn from '../components/MyBackToHomeBtn';
import MyCreateArticleBtn from '../components/MyCreateArticleBtn';
import MyFilterInputText from '../components/MyFilterInputText';

import './List.styles.css';

let position = -1;
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      rows: [0, 1, 2],
      cols: [0, 1, 2, 3],
      filter: '',
    };

    this.inputFilter = this.inputFilter.bind(this);
  }

  getLocalStorage() {
    const blog = JSON.parse(localStorage.getItem('blog'));
    this.setState({
      articles: blog.articles,
    });
  }

  inputFilter(event) {
    event.preventDefault();
    this.setState({
      filter: event.target.value,
    });
    position = -1;
  }

  componentDidMount() {
    // this.initMyCarousel();
    this.getLocalStorage();
  }

  componentWillUnmount() {
    position = -1;
  }
  render() {
    const { articles, rows, cols, filter } = this.state;

    // console.log(position);
    const filteredArticles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(filter) ||
        article.words.toLowerCase().includes(filter),
    );
    // console.log('filteredArticles', filteredArticles);

    return (
      <div className="articles-list">
        <MyFilterInputText inputFilter={this.inputFilter} filter={filter} />
        {articles.length > 0 &&
          rows.map((r, i) => {
            return (
              <div className="row" key={r} data-testid={`card-row-${r}`}>
                {cols.map((col, j) => {
                  // console.log(position);
                  if (position > filteredArticles.length - 2) {
                    return null;
                  }
                  position += 1;
                  return (
                    <div className="col s12 m6 l3" key={col * 100}>
                      {/* {console.log(filteredArticles[position].title)} */}
                      <MyCardArticles
                        title={filteredArticles[position].title}
                        image={filteredArticles[position].image}
                        words={filteredArticles[position].words}
                        position={position}
                        key={j}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        <MyBackToHomeBtn />
        <MyCreateArticleBtn />
      </div>
    );
  }
}
