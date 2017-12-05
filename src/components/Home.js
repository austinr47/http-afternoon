import React, { Component } from 'react';
import Hero from './subcomponents/Hero';
import BlogThumb from './subcomponents/BlogThumb';
import axios from 'axios';

// import axios

class Home extends Component{
    constructor(){
        super();
        this.state = {
            featured: '',
            index: 0,
            posts: [{title: "Loading...",image: 'https://unsplash.it/900/400/?random'}]
        }

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    // insert componentWillMount:
    componentWillMount(){
        axios.get('/api/featured').then(results=>{
            this.setState({
                featured: results.data,
                index: (~~(Math.random() * results.data.length) + 0),
                posts: results.data
            })
        }).catch(console.log)   
    }
        render(){
            // map over your recommended blogs here
            const posts = this.state.posts.map((c,i)=><BlogThumb key={i} blog={c}/>)
    
            return(
            <div className="content" >
                <Hero blog={this.state.posts[this.state.index]} />
                <hr/>
                <div className="blog-grid">
                    {/* put your mapped blogs here */}
                    {posts}
                </div>
            </div>
        )
    }
}

export default Home;