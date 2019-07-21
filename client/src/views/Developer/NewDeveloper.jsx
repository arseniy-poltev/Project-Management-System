import React from "react";
import { connect } from "react-redux"
class NewDeveloper extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("new-developer");
    }

    componentWillMount() {
        document.body.classList.toggle("new-developer");
    }

    render() {
        return (
            <div className="content">
                <p>This is New Developer Page!</p>
            </div>
        )
    }
}

// export default NewDeveloper;

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
      user,
      users
    };
  }
  
  export default connect(mapStateToProps)(NewDeveloper)
  