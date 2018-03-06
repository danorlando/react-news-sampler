import React, { Component } from 'react';
import axios from 'axios';
import Display from './Display';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu';
import CountrySelector from '../common/CountrySelector'

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 200,
      
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    formHelperText: {
        fontSize: '17px'
    },
    textField: {
       padding: 0,
       margin: 0,

        width: 300,
      },
    inputLabel: {
       
    },
  });

class FeedSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: [],
            source: this.props.source,
            keyword: '',
            category: '',
            byKeyword: false,
            byCategory: false,
            country: '',
            byCountry: false,
        }
        this.onChangeSource = this.onChangeSource.bind(this);
        this.onSubmitKeywordSearch = this.onSubmitKeywordSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.sourceListApiUrl = 'https://newsapi.org/v2/sources?language=en&apiKey=04aab5204fb74b38974c5843de3467ff'
        this.handleChange = this.handleChange.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
    }

    // Handle the Select Change from the Select Options
    onChangeSource(event) {
        this.setState({ 
            byKeyword: false,
            byCategory: false,
            byCountry: false,
            source: event.target.value });
    }

    componentDidMount() {
        axios.get(this.sourceListApiUrl)
            .then((response) => {
                console.log(response)
                let sourcesData = response.data;
                this.setState({ sourceData: sourcesData.sources });
            })
    }

    onChangeCountry(e) {
        this.setState({ 
            byKeyword: false,
            byCategory: false,
            byCountry: true,
            country: e.target.value });
    }

    onChangeCategory(e) {
        this.setState({ 
            byKeyword: false,
            byCategory: true,
            byCountry: false,
            category: e.target.value });
    }

    onSubmitKeywordSearch(e) {
        this.setState({
            byKeyword: true,
            keyword: e.target.value
        })
    }

    onChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };

    // Render Method
    render() {
        const allSources = this.state.sourceData;
        const {classes} = this.props;
        return (
            <div className="row">
            <div className="col-lg-12">
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                <Select
                    native
                    value={this.state.source}
                    onChange={this.onChangeSource}>
                        { Object.keys(allSources).map(paper => <option key={paper} value={allSources[paper].id}>{allSources[paper].name}</option>)}
                </Select>
                <FormHelperText className={classes.formHelperText}>Select by Source</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                <Select
                    native
                    value={this.state.category}
                    onChange={this.onChangeCategory}>   
                     <option value="">None Selected</option> 
                    <option value={"business"}>Business</option>
                    <option value={"entertainment"}>Entertainment</option>
                    <option value={"general"}>General</option>   
                    <option value={"health"}>Health</option>
                    <option value={"science"}>Science</option>
                    <option value={"sports"}>Sports</option>    
                    <option value={"technology"}>Technology</option>   
                </Select>
                <FormHelperText className={classes.formHelperText}>Select by Category</FormHelperText>
               </FormControl>
               <CountrySelector onChange={this.onChangeCountry} country={this.state.country} />
                <FormControl className={classes.formControl}>
                <TextField required
                    id="keyword"
                    className={classes.textField}
                    value={this.state.keyword}
                    onChange={this.onSubmitKeywordSearch}
                    margin="normal"
                    /> 
                    <FormHelperText className={classes.formHelperText}>Search by Keyword or Phrase</FormHelperText>
                </FormControl>
                </div>
              <br />
              <div className="row">
                    <br />
                    <Display source={this.state.source} 
                        keyword={this.state.keyword}
                        category={this.state.category}
                        country={this.state.country}
                        byCategory={this.state.byCategory} 
                        byKeyword={this.state.byKeyword}
                        byCountry={this.state.byCountry}
                        advancedSearch={false}/>
                </div>
            </div>
            </div>
        );
    }
}

export default withStyles(styles)(FeedSelect);