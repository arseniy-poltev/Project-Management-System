import React from "react";

class NoneWorkingDeveloper extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("notworking-developer");
    }

    componentWillMount() {
        document.body.classList.toggle("notworking-developer");
    }

    render() {
        return (
            <div className="content">
            <p>This is All Developer Page!</p>
          </div>
        )
    }
}

export default NoneWorkingDeveloper;