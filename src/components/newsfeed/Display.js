import React, { Component } from 'react';
import axios from 'axios';
import Article from './Article';
import { CSSGrid, layout, makeResponsive } from 'react-stonecutter';
import {calculateTextDimensions} from '../../utils/ui';
import $ from 'jquery';

const Grid = makeResponsive(CSSGrid, { maxWidth: 1440 })

class Display extends Component {
    constructor(props) {
        super(props);

        this.tempProxy = [];
        this.API = '04aab5204fb74b38974c5843de3467ff';
        this.state = {
            articles: [],
            album: {},
            tempPhotos: [],
            photos: [],
            colWidth: 350,
        };
        this.imageLoadComplete = this.imageLoadComplete.bind(this);
        this.calculateAspectRatioFit = this.calculateAspectRatioFit.bind(this);
        this.calculateTextDimensions = this.calculateTextDimensions.bind(this);
    }

    componentDidMount() {
        if(!this.props.advancedSearch) {
            let apiCall = `https://newsapi.org/v2/top-headlines?sources=${this.props.source}&apiKey=${this.API}`
            console.log(apiCall)
             this.getArticles(apiCall);  
        }
    }

    componentWillReceiveProps(nextProps) {
        const {advancedSearch} = this.props;
        if (nextProps !== this.props) {
            if(nextProps.advancedSearchSubmit) {
                console.log(nextProps)
                let key = `https://newsapi.org/v2/everything?q=${nextProps.keyword}`;
                let source = nextProps.source ? `&source=${nextProps.source}` : "";
                let sort = nextProps.sortBy ? `&sortBy=${nextProps.sortBy}&apiKey=${this.API}` : `&apiKey=${this.API}`
                let apiCall = key + source + sort; 
                console.log(apiCall)
                this.getArticles(apiCall);
            }     
            else if(nextProps.byCategory && !advancedSearch) {
                let apiCall = `https://newsapi.org/v2/top-headlines?category=${nextProps.category}&apiKey=${this.API}`
                this.getArticles(apiCall);
            }
            else if(nextProps.byKeyword  && !advancedSearch) {
                let apiCall = `https://newsapi.org/v2/everything?q=${nextProps.keyword}&apiKey=${this.API}`
                this.getArticles(apiCall);
            } 
            else if(nextProps.byCountry  && !advancedSearch) {
                let apiCall = `https://newsapi.org/v2/top-headlines?country=${nextProps.country}&apiKey=${this.API}`
                this.getArticles(apiCall);
            }
            else if(nextProps.source.length > 0 && !advancedSearch){
                let apiCall = `https://newsapi.org/v2/top-headlines?sources=${nextProps.source}&apiKey=${this.API}`
                this.getArticles(apiCall);   
            }
        }
    }

    getArticles(apiCall) {
        var self = this;
        this.tempProxy = [];
        this.setState({photos: [], tempPhotos:[]});

        axios.get(apiCall)
            .then((response)=> {
                this.loadArticleData(response);
            })
            .catch(error => {
            console.log(error);
            })
    }

    loadArticleData(response) {
        var self = this;
        const data = response.data.articles;
        this.setState({tempPhotos: data})
        for (var i in data) {
            var img = new Image();
            img.src = data[i].urlToImage;
            img.onload = self.imageLoadComplete;
        }
        console.log(data);
        this.setState({ articles: data });
    }
   

    calculateTextDimensions(text, classes, escape) {
        classes = classes || [];
        if (escape === undefined) {
            escape = true;
        }
        classes.push('textDimensionCalculation');
        var div = document.createElement('div');
      //  div.setAttribute('style', 'width: ' + this.state.colWidth) 
        div.setAttribute('class', classes.join(' '));
        if (escape) {
            $(div).text(text);
          //  console.log($(div).text)
        } else {
            div.innerHTML = text;
           // console.log(div.innerHTML)

      }
      document.body.appendChild(div);
      var dimensions = {
          width : jQuery(div).outerWidth(),
          height : jQuery(div).outerHeight()
      };
      div.parentNode.removeChild(div);
      return dimensions;
    };

    imageLoadComplete(e) {
        let self = this;
        for (var i in this.state.tempPhotos) {
            let ph = this.state.tempPhotos[i];
            if(e.target.src == this.state.tempPhotos[i].urlToImage) {
            let imageHeight = self.calculateAspectRatioFit(e.target.width, e.target.height);
              ph.height = imageHeight;
              ph.descTextHeight = this.calculateTextDimensions(ph.description, ['description']).height;
              ph.titleTextHeight = this.calculateTextDimensions(ph.title, ['title']).height ;
              ph.itemHeight = ph.height + ph.descTextHeight + ph.titleTextHeight;
              ph.itemWidth = self.state.colWidth;
              this.tempProxy.push(ph);
              
            }
          }
          this.setState({photos: this.tempProxy});
        }

      calculateAspectRatioFit(srcWidth, srcHeight) {
        var ratio = srcWidth / srcHeight;
        var h = this.state.colWidth / ratio;
        return Math.round(h);
    }
    

    render() {
        const articleState = this.state.articles;      
        const {classes} = this.props 
       
        if (articleState && articleState.length > 1) {
           
        }
        return (
            <div style={{height: '100%', width: '100%'}}>
                <Grid 
                    ref="cssgrid"
                    component="ul"
                    columns={3}
                    columnWidth={this.state.colWidth}
                    gutterWidth={5}
                    gutterHeight={5}
                    layout={layout.pinterest}
                    duration={800}
                    easing="ease-out">

                    {this.state.photos.map((photo, i) => 
                        <li key = {i} itemHeight={photo.itemHeight}>
                            <Article key={photo} details={photo} />
                        </li>
                    )}

            </Grid>
            </div>
        )
        
    }
}


export default Display;