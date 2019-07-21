import React from "react";

class RejectedDeveloper extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("rejected-developer");
    }

    componentWillMount() {
        document.body.classList.toggle("rejected-developer");
    }

    render() {
        return (
            <div className="content">
            <p>This is Rejected Developer Page!</p>
          </div>
        )
    }
}

export default RejectedDeveloper;