import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import PostCard from "../components/postCard";
import "./css/ViewProtest.css";
import leftarrow from "./img/left.png";
import { Link } from "react-router-dom";

class ViewProtest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            protestData: ""
        }
    }

    componentDidMount() {
        const protestID = queryString.parse(this.props.location.search).protestID;
        
        if (protestID !== "") {
            console.log(`http://localhost:8000/get_protest?protestID=${protestID}`);
            fetch(`http://localhost:8000/get_protest?protestID=${protestID}`)
                .then(response => response.json())
                .then(data => this.setState({ protestData: data }));
        }
    }

    render() {
        if (this.state.protestData === "") {
            return null;
        }
        const data = this.state.protestData;
        const Posts = data.posts.map(post => <PostCard {...post} />)
        let ProtestorList = "";
        for (let i = 0; i < Object.keys(data.protestors); i++) {
            ProtestorList += `${data.protestors[i]}, `;
        }
        // You can find all of the fields in the response in the README in the server folder
        return (
            <div className="protest-view">
                <Link to={{ pathname: "/browse-protests" }}>
                <div className="backarrow-container">
                    <img className="img" src={leftarrow}></img>
                    <h2>BACK</h2>
                </div>
                </Link>
                <div className="protest-info">
                    <h1 className="title" style={{fontSize: "60px"}}>{data.name}</h1>
                    <h2>{data.organizer}</h2>
                    <h2>{data.date} at {data.location}</h2>
                    <h3>{data.description}</h3>
                    <div className="mapImage">
                        <p>eventually there will be an image of the map here and this is a placeholder</p>
                    </div>
                    <p className="protestors">{ProtestorList}</p>
                </div>
                <div className="protest-posts">
                    {Posts}
                </div>
            </div>
        )
    }
}

export default withRouter(ViewProtest);