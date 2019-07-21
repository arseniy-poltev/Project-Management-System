import React from "react";

class Expired extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("expired-projects");
    }

    componentWillMount() {
        document.body.classList.toggle("expired-projects");
    }

    render() {
        return (
            <div className="content">
            <p>This is Expired Project Page!</p>
          </div>
        )
    }
}

export default Expired;