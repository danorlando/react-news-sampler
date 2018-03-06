import React, {Component} from 'react';
import AdvancedSearch from '../components/newsfeed/AdvancedSearch'
import { Link } from 'react-router-dom'


class NewsFinder extends Component {

  render() {

    return (
      <div> 
      <p>Here you can apply more advanced search options. Here are some 
        keyword phrase ideas that you can use to narrow your results: </p>
      <ul>
        <li>Surround phrases with quotes (") for exact match.</li>
        <li>Prepend words or phrases that must appear with a + symbol. Eg: +bitcoin</li>
        <li>Prepend words that must not appear with a - symbol. Eg: -bitcoin</li>
        <li>Alternatively you can use the AND / OR / NOT keywords, and optionally group these with parenthesis. Eg: crypto AND (ethereum OR litecoin) NOT bitcoin.</li>
      </ul>
        <AdvancedSearch />
      </div>
    )
  }
}

export default NewsFinder;