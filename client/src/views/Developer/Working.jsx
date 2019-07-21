import React from "react";

class WorkingDeveloper extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("working-developer");
    }

    componentWillMount() {
        document.body.classList.toggle("working-developer");
    }

    render() {
        return (
            <div className="content">
            <p>This is Working Developer Page!</p>
          </div>
        )
    }
}

export default WorkingDeveloper;