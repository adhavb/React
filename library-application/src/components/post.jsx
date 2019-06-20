import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
    state = {}
    getTableData() {
        return this.props.posts.map(post =>
            <tr>
                <td>{post.title}</td>
                <td><button className='btn btn-info' onClick={() => this.props.onUpdate(post)}>Update</button></td>
                <td><button className='btn btn-danger' onClick={() => this.props.onDelete(post)}>Delete</button></td>
            </tr>
        );
    }

    render() {
        return (<React.Fragment>
            <div className="container">
                <button className="btn btn-primary" onClick={this.props.onAdd}>Add</button>
                <br />
                <br />

                <table className="table table-striped">
                    <tr>
                        <th className="col-md-8">Title</th>
                        <th className="col-md-2">Update</th>
                        <th className="col-md-2">Delete</th>
                    </tr>

                    {this.getTableData()}

                </table>
            </div>
        </React.Fragment>);
    }
}

export default Post;