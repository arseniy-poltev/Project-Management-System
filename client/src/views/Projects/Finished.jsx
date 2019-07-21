import React from "react";

class Finished extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("finished-projects");
    }

    componentWillMount() {
        document.body.classList.toggle("finished-projects");
    }

    render() {
        return (
            <div className="content">
            <p>This is Finished Project Page!</p>
          </div>
        )
    }
}

export default Finished;