import React from "react";
// reactstrap components
import Select from "react-select";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";
import ImageUpload from "../../components/CustomUpload/ImageUpload";
import { userActions } from "../../_actions";
import { connect } from "react-redux"


class EditAllDevelopers extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            form_state: false,
            gender: null,
            is_active: { value: true, label: "Yes" },
            is_admin: { value: false, label: "No" },
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            country: "",
            age: 0,
            about_me: "",
            update: false,
            avatar: null,
            id: null
        }

        let id = this.props.match.params.id;
        if (id) {
            this.props.dispatch(userActions.get(id));
        }
    }

    handleSubmit = (e) => {
        let user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            country: this.state.country,
            age: this.state.age,
            gender: this.state.gender.value,
            is_active: this.state.is_active.value,
            is_admin: this.state.is_admin.value,
            about_me: this.state.about_me,
            avata: this.state.avatar
        }


        if (this.state.update) {
            delete user.password;
            this.props.dispatch(userActions.update_user(user, this.state.id));
        } else {
            this.props.dispatch(userActions.add_user(user));
        }
    }


    componentWillReceiveProps(next_props) {
        let update_user = next_props.users.user_item;
        if (update_user) {
            let gender_values;
            if (update_user.gender === 'male') {
                gender_values = { value: update_user.gender, label: "Male" };
            } else if (update_user.gender === 'female') {
                gender_values = { value: update_user.gender, label: "Female" };
            }


            this.setState({ update: true })
            this.setState({ id: update_user._id })
            this.setState({ name: update_user.name });
            this.setState({ email: update_user.email });
            this.setState({ gender: gender_values });
            this.setState({ age: update_user.age });
            this.setState({ country: update_user.country });
            this.setState({ is_active: update_user.is_active ? { label: "Yes", value: true } : { label: "No", value: false } });
            this.setState({ is_admin: update_user.is_admin ? { label: "Yes", value: true } : { label: "No", value: false } });
            this.setState({ about_me: update_user.about_me });
            this.setState({ avatar: update_user.avatar });
        }

        let user_avatar = next_props.users.user_avatar;
        if (user_avatar) {
            this.setState({ avatar: user_avatar });
        }
    }

    componentDidUpdate() {
        // console.log(this.ref.imageUpload.handleImageChange())
    }
    render() {
        if (this.props.users.post_user) {
            this.props.history.push("/admin/developer/all");
            // return (<Redirect to="/admin/developer/createnew"/>)
        }

        let header_title = "";
        if (this.state.update) {
            header_title = 'Edit Developer';
        } else {
            header_title = 'Create Developer';
        }

        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <h3 className="title">{header_title}</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row>
                                            <Col className="pr-md-1" md="6">
                                                <FormGroup>
                                                    <label>Name</label>
                                                    <Input
                                                        onChange={e =>
                                                            this.setState({ name: e.target.value })
                                                        }
                                                        type="text"
                                                        value={this.state.name}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-md-1" md="6">
                                                <FormGroup>
                                                    <label>Email</label>

                                                    {this.state.update ? (
                                                        <Input
                                                            onChange={e =>
                                                                this.setState({ email: e.target.value })
                                                            }
                                                            type="text"
                                                            disabled
                                                            value={this.state.email}
                                                        />
                                                    ) : (
                                                        <Input
                                                            onChange={e =>
                                                                this.setState({ email: e.target.value })
                                                            }
                                                            type="text"
                                                            value={this.state.email}
                                                        />
                                                    )}

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col className="pr-md-1" md="6">
                                                <FormGroup>
                                                    <label>Country</label>
                                                    <Input
                                                        onChange={e =>
                                                            this.setState({ country: e.target.value })
                                                        }
                                                        type="text"
                                                        value={this.state.country}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-md-1" md="6">
                                                <FormGroup>
                                                    <label>Gender</label>
                                                    <Select
                                                        className="react-select info"
                                                        classNamePrefix="react-select"
                                                        name="gender"
                                                        value={this.state.gender}
                                                        onChange={value =>
                                                            this.setState({ gender: value })
                                                        }
                                                        options={[
                                                            {
                                                                value: "",
                                                                label: "Single Option",
                                                                isDisabled: true
                                                            },
                                                            { value: "male", label: "Male" },
                                                            { value: "female", label: "Female" }
                                                        ]}
                                                        placeholder=""
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-md-1" md="6">
                                                <FormGroup>
                                                    <label>Age</label>
                                                    <Input
                                                        onChange={e =>
                                                            this.setState({ age: e.target.value })
                                                        }
                                                        type="number"
                                                        value={this.state.age}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>About Me</label>
                                                    <Input
                                                        cols="80"
                                                        placeholder="Here can be your description"
                                                        rows="4"
                                                        type="textarea"
                                                        onChange={e =>
                                                            this.setState({ about_me: e.target.value })
                                                        }
                                                        value={this.state.about_me}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-md-1" md="6">
                                                <FormGroup>
                                                    <label>Active</label>
                                                    <Select
                                                        className="react-select info"
                                                        classNamePrefix="react-select"
                                                        name="is_active"
                                                        value={this.state.is_active}
                                                        onChange={value =>
                                                            this.setState({ is_active: value })
                                                        }
                                                        options={[
                                                            {
                                                                value: "",
                                                                label: "Single Option",
                                                                isDisabled: true
                                                            },
                                                            { value: true, label: "Yes" },
                                                            { value: false, label: "No" }
                                                        ]}
                                                        placeholder=""
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-md-1" md="6">
                                                <FormGroup>
                                                    <label>Admin</label>
                                                    <Select
                                                        className="react-select info"
                                                        classNamePrefix="react-select"
                                                        name="is_admin"
                                                        value={this.state.is_admin}
                                                        onChange={value =>
                                                            this.setState({ is_admin: value })
                                                        }
                                                        defaultValue={this.state.is_admin}
                                                        options={[
                                                            {
                                                                value: "",
                                                                label: "Single Option",
                                                                isDisabled: true
                                                            },
                                                            { value: true, label: "Yes" },
                                                            { value: false, label: "No" }
                                                        ]}
                                                        placeholder=""
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {this.state.update === false ? (
                                            <Row>
                                                <Col className="pr-md-1" md="6">
                                                    <FormGroup>
                                                        <label>Password</label>
                                                        <Input
                                                            onChange={e =>
                                                                this.setState({ password: e.target.value })
                                                            }
                                                            type="password"
                                                            value={this.state.password}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        ) : null
                                        }
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <Button onClick={this.handleSubmit} className="btn-fill pull-right" color="primary" type="submit">
                                        Save
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card className="card-user">
                                <CardBody>
                                    <CardText />
                                    <div className="author">
                                        <div className="block block-one" />
                                        <div className="block block-two" />
                                        <div className="block block-three" />
                                        <div className="block block-four" />
                                        {/* <img
                                            alt="..."
                                            className="avatar"
                                            src={require("assets/img/emilyz.jpg")}
                                            /> */}
                                        <ImageUpload
                                            className="avatar"
                                            addBtnColor="default"
                                            changeBtnColor="default"
                                            avatar
                                            onClick={(e) => { alert('ss') }}
                                        />
                                        {/* <h5 className="title">Mike Andrew</h5> */}
                                        {/* <p className="description">Ceo/Co-Founder</p> */}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}


function mapStateToProps(state) {
    const { users } = state;
    return {
        users
    };
}

export default connect(mapStateToProps)(EditAllDevelopers)
