import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
        <div className={styles.commentForm}>
            <h1 className="text-center mt-5 mb-3">Create Comment</h1>
            
            <div className="card card-info">
                <div className="card-header bg-info text-white">Make a comment...</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <TextAreaFieldGroup
                                placeholder="Comments"
                                name="text"
                                value={this.state.text}
                                onChange={this.onChange}
                                error={errors.text}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">
                            Submit
                        </button>
                        <Link to="/events" className="btn btn-light">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {addComment})(withRouter(CommentForm)); 
