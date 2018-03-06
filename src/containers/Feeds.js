import React, {Component} from 'react';
import FeedSelect from '../components/newsfeed/FeedSelect'
import { Link } from 'react-router-dom'


class Feeds extends Component {

  render() {

    return (
      <div> 
      <p>View top headlines by source, category, or country. For more search options, 
        check out the <Link to="/find-news">News Finder</Link>
      </p>
        <FeedSelect source="abc-news"/>
      </div>
    )
  }
}

export default Feeds;