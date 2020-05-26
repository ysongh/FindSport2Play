import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Paper, AppBar, Typography, Button } from '@material-ui/core';

import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addComment } from '../../../actions/eventActions';
import styles from './CommentForm.module.css';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    
    const { user } = this.props.auth;

    const commentData = {
      text : this.state.text,
      name: user.name,
    };
    
    this.props.addComment(this.props.match.params.id, commentData);
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
        <Paper className="marginX-5">
            <AppBar className="primary-color pad-1" position="static">
                <Typography variant="h5">Make a comment...</Typography>
            </AppBar>
            <form className={styles.container} onSubmit={this.onSubmit}>
              <TextAreaFieldGroup
                label="Comment"
                placeholder="Your comments"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
              <Button className="primary-color" type="submit" variant="contained">Submit</Button>
            </form>
        </Paper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {addComment})(withRouter(CommentForm)); 