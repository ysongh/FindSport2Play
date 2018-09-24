import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';

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

    console.log(this.state.text);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
        <div className="comment-form mb-3">
            <h1 className="text-center">Create Comment</h1>
            <Link to="/events" className="btn btn-light mb-3">
                Back
            </Link>
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
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

export default CommentForm;
