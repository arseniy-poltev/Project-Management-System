import React from "react";

class InProgress extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("inprogress-projects");
    }

    componentWillMount() {
        document.body.classList.toggle("inprogress-projects");
    }

    render() {
        return (
            <div className="content">
            <p>This is In Progress Project Page!</p>
          </div>
        )
    }
}

export default InProgress;