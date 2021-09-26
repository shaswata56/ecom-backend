import React, { Component } from "react";
import "./compact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ApiService from "../services/ApiService";
import {withRouter} from "react-router-dom";

class Borrower extends Component {
    constructor(props) {
        super(props);
        this.add = props.add;
        this.api = new ApiService(props.token, props.userid, 'borrower')
        this.onChangeName = this.onChangeName.bind(this);
        this.updateBorrower = this.updateBorrower.bind(this);
        this.addBorrower = this.addBorrower.bind(this);
        this.deleteBorrower = this.deleteBorrower.bind(this);

        this.state = {
            currentBorrower: {
                id: null,
                name: "",
                loanNumber: "",
            },
            message: "",
        };
    }

    componentDidMount() {
        if(!this.add) {
            this.api.getOne(this.props.match.params.id)
                .then(resp => {
                    this.setState({
                        currentBorrower: resp
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentBorrower: {
                    ...prevState.currentBorrower,
                    name: name
                }
            };
        });
    }

    updateBorrower() {
        let data = {
            name: this.state.currentBorrower.name,
            loanNo: this.state.currentBorrower.loanNo,
        };

        this.api.updateOne(data, this.state.currentBorrower.id)
            .then(response => {
                console.log(response);
                this.setState(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    addBorrower() {
        let data = {
            name: this.state.currentBorrower.name,
            loanNo: this.state.currentBorrower.loanNo,
        };

        this.api.addOne(data)
            .then(response => {
                console.log(response);
                this.setState(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteBorrower() {
        this.api.deleteOne(this.state.currentBorrower.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/borrowers')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentBorrower } = this.state;

        return (
            <div>
                {currentBorrower ? (
                    <div className="edit-form">
                        <h4>Borrower</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="name"
                                    className="form-control"
                                    id="name"
                                    value={currentBorrower.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">Loan No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    value={currentBorrower.loanNo}
                                    disabled={true}
                                />
                            </div>
                        </form>

                        <div>
                            <br />
                        </div>

                        {this.add ? (
                            <button
                                type="submit"
                                className="btn btn-success"
                                onClick={this.addBorrower}
                            >
                                Save
                            </button>
                        ) : (
                            <div>
                                <button
                                    className="btn btn-danger"
                                    onClick={this.deleteBorrower}
                                >
                                    Delete
                                </button>
                                {"\u00a0\u00a0"}
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.updateBorrower}
                                >
                                    Update
                                </button>
                            </div>
                        )}

                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Borrower...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Borrower);