import React from "react";

class NewProject extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("new-projects");
    }

    componentWillMount() {
        document.body.classList.toggle("new-projects");
    }

    render() {
        return (
            <div className="content">
                <p>This is New Project Page!</p>
            </div>
        )
    }
}

export default NewProject;