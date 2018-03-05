import React from 'react';
import Card from 'material-ui/Card';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
     },
    card: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 16,
        display: 'inline-block',
        padding: 15,
        textAlign: 'left',
        flexWrap: 'wrap',
    },
    description: {
        marginBottom:16,
        fontSize:14,
        flexWrap: 'wrap',
        display: 'block',
        paddingLeft: 15,
        paddingRight:15,
        textAlign: 'left',
    }

})


const Article = (props) => {
    const { details, classes } = props;
    return (   
      <div style={{height: details.itemHeight, width: details.itemWidth}}>
       <Card className={classes.card} style={{height: details.itemHeight, width: details.itemWidth}}>
          <img className="card-img-top" style={{height: details.height, width: details.itemWidth}} src={details.urlToImage} alt="NewsImage" />
            <div className="card-block">
            <Typography variant="headline" component="h2" className={classes.title}>
                <a href={details.url} target="_blank">
                    {details.title}
                </a>
            </Typography>
            <div className={classes.description}>   
                {details.description}
            </div>
            </div>
        </Card>
      </div>
     
    )
}

export default withStyles(styles)(Article);