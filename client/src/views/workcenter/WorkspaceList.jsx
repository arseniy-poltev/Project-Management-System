import React, { Component } from "react";
import classNames from "classnames";
// react component for creating dynamic tables
import ReactTable from "react-table";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    Button,
    Modal,
    ModalBody,
    FormGroup,
    Form,
    Input,
} from "reactstrap";

import { workspaceActions } from "../../_actions";
import { connect } from "react-redux"


class WorkspaceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };



        // props.dispatch(workspaceActions.getAll());
    }

    componentDidMount() {
        this.props.dispatch(workspaceActions.getAll())
        document.body.classList.toggle("all-Workcenter");
    }

    componentWillMount() {
        document.body.classList.toggle("all-Workcenter");
    }

    toggleModalClassic = () => {
        this.setState({
            edit_item: null
        });
    };

    render() {
        const { workspaces } = this.props;
        let table_data;
        if (workspaces.workspace_items) {
            table_data = workspaces.workspace_items.data.map((prop, key) => {
                return {
                    id: prop.id,
                    gid: prop.gid,
                    name: prop.name,
                    resource_type: prop.resource_type,
                    actions: (
                        // we've added some custom button actions
                        <div className="actions-right">
                            <Button
                                onClick={() => {
                                    let obj = workspaces.workspace_items.data.find(o => o.id === prop.id);
                                    this.setState({ edit_item: obj });
                                }}
                                color="warning"
                                size="sm"
                                className={classNames("btn-icon btn-link like", {
                                    "btn-neutral": key < 5
                                })}
                            >
                                <i className="fa fa-users" />
                            </Button>
                            <Button
                                onClick={() => {
                                    let obj = workspaces.workspace_items.data.find(o => o.id === prop.id);
                                    this.setState({ edit_item: obj });
                                }}
                                color="warning"
                                size="sm"
                                className={classNames("btn-icon btn-link like", {
                                    "btn-neutral": key < 5
                                })}
                            >
                                <i className="tim-icons icon-pencil" />
                            </Button>
                        </div>
                    )
                };
            });
        }

        return (
            <>
                <div className="content">
                    <Col md={8} className="ml-auto mr-auto">
                        <h2 className="text-center">Workspace Management Moud</h2>
                        <p className="text-center">
                            A powerful Workspace management module provided from {" "}
                            <a
                                href="https://asana.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Asana Service
                  </a>
                            . It is a highly flexible tool, based upon the foundations of
                            progressive enhancement on which you can add advanced interaction
                  controls. Please check out their{" "}
                            <a
                                href="https://asana.com/developers/documentation/examples-tutorials/overview"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                full documentation.
                  </a>
                        </p>
                    </Col>
                    <Row className="mt-5">
                        <Col xs={12} md={12}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Workspace Management</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        data={table_data}
                                        filterable
                                        resizable={false}
                                        columns={[
                                            {
                                                Header: "ID",
                                                accessor: "id"
                                            },
                                            {
                                                Header: "GId",
                                                accessor: "gid"
                                            },
                                            {
                                                Header: "Name",
                                                accessor: "name"
                                            },
                                            {
                                                Header: "Resource Type",
                                                accessor: "resource_type"
                                            },
                                            {
                                                Header: "Actions",
                                                accessor: "actions",
                                                sortable: false,
                                                filterable: false
                                            }
                                        ]}
                                        defaultPageSize={10}
                                        showPaginationTop
                                        showPaginationBottom={false}
                                        className="-striped -highlight"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal
                        isOpen={this.state.edit_item ? true : false}
                        toggle={this.toggleModalClassic}
                    >
                        <div className="modal-header justify-content-center">
                            <button
                                aria-hidden={true}
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={this.toggleModalClassic}
                            >
                                <i className="tim-icons icon-simple-remove" />
                            </button>
                            <h3 className="title title-up"> {this.state.edit_item ? this.state.edit_item.name : null}</h3>
                        </div>
                        <ModalBody className="text-center">
                            {/* <Form>
                                <FormGroup>
                                    <label className="pull-left">ID</label>
                                    <Input type="text"  style={{ color: "black"}}></Input>
                                </FormGroup>
                            </Form> */}
                            <p className="pull-left">You can only edit workspace name.</p>
                            <Input type="text"  style={{ color: "black"}} placeholder="New Workcenter Name" ></Input>

                        </ModalBody>
                        <div className="modal-footer">
                            <Button
                                color="default"
                                type="button"
                                onClick={this.toggleModalClassic}
                            >
                                Save
                          </Button>
                            <Button
                                color="danger"
                                data-dismiss="modal"
                                type="button"
                                onClick={this.toggleModalClassic}
                            >
                                Close
                          </Button>
                        </div>
                    </Modal>
                </div>
            </>
        );
    }
}


function mapStateToProps(state) {
    const { workspaces } = state;
    return {
        workspaces
    };
}

export default connect(mapStateToProps)(WorkspaceList)
