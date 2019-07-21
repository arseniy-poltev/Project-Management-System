import React from "react";

class AllProject extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("all-Projects");
    }

    componentWillMount() {
        document.body.classList.toggle("all-Projects");
    }

    render() {
        return (
            <div className="content">
            <p>This is All Project Page!</p>
          </div>
        )
    }
}

export default AllProject;