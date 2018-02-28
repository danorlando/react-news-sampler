import React from 'react';

const Article = (props) => {
    const { details } = props;
    return (
      <div style={{height: details.itemHeight, width: details.itemWidth}}>
        <div className="card">
            <img className="card-img-top" style={{height: details.height, width: details.itemWidth}} src={details.urlToImage} alt="NewsImage" />
            <div className="card-block">
                <h6 className="card-title">
                <a href={details.url} target="_blank">
                {details.title}
                </a>
                </h6>
                <p className="card-text">{details.description}</p>
            </div>
        </div>
      </div>
    )
}

export default Article;