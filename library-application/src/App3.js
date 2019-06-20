import React from 'react';
import axios from 'axios';
import Post from './components/post';
import './App.css';


class App3 extends React.Component {
    constructor(props) {
        super(props);

    }
    state = {
        posts: []
    };
    async componentDidMount() {
        const promise = await axios.get('http://jsonplaceholder.typicode.com/posts');
        this.setState({ posts: promise.data });
        console.log(this.state.posts);
    }
    handleAdd = async () => {
        const obj = { title: 'my first title', body: 'my first body', userId: 1 }
        const result = await axios.post('http://jsonplaceholder.typicode.com/posts', obj);

        const posts = [result.data, ...this.state.posts];

        this.setState({ posts });
    }
    handleDelete = async post => {

        const originalposts = this.state.posts;
        let extractedpost = this.state.posts.filter(p => p.id != post.id);
        let posts = [...extractedpost];
        this.setState({ posts });
        try {
            const result = await axios.delete('http://jsonplaceholder.typicode.com/posts1/' + post.id);
        }
        catch (ex) {
            if (ex.response && ex.response.status == 404)
                alert('The resource has already been deleted');
            alert('Delete operation not successful');
            this.setState({ posts: originalposts });
        }

    }
    handleUpdate = async post => {

        const tmppost = this.state.posts.filter(p => p.id == post.id);
        tmppost[0].title = 'Updated title';
        const result = await axios.put('http://jsonplaceholder.typicode.com/posts/' + post.id, tmppost[0]);
        let extractedpost = this.state.posts.filter(post => post.id != tmppost[0].id);
        let posts = [result.data, ...extractedpost];
        this.setState({ posts });
    }

    render() {
        return (
            <React.Fragment>
                <Post posts={this.state.posts} onAdd={this.handleAdd} onUpdate={this.handleUpdate} onDelete={this.handleDelete} />
            </React.Fragment >
        );
    }
}

export default App3;
