import React, { Component } from "react";
import { getClient, addClient, deleteClient } from "./Functions";
import $ from "jquery";
import DataTable from "datatables.net";
import "jquery";
import axios from "axios";
class List extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      term: [],
      first_name: "",
      email: "",
      phone_number: "",
      last_name: "",
      editDisabled: false,
      items: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleClientFirstName = this.handleClientFirstName.bind(this);
    this.handleClientLastName = this.handleClientLastName.bind(this);
    this.handleClientEmail = this.handleClientEmail.bind(this);
    this.handleClientPhoneNumber = this.handleClientPhoneNumber.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  handleTableStyle() {
    $(document).ready(function () {
      $("#proxy-table").DataTable();
    });
  }

  handleClientFirstName = (e) => {
    this.setState({
      first_name: e.target.value,
      editDisabled: "disabled",
    });
  };

  handleClientLastName = (e) => {
    this.setState({
      last_name: e.target.value,
      editDisabled: "disabled",
    });
  };

  handleClientEmail = (e) => {
    this.setState({
      email: e.target.value,
      editDisabled: "disabled",
    });
  };

  handleClientPhoneNumber = (e) => {
    this.setState({
      phone_number: e.target.value,
      editDisabled: "disabled",
    });
  };
  getAll = () => {
    getClient().then((data) => {
      this.setState(
        {
          term: [],
          items: [...data],
        },
        () => {
          console.log(this.state.term);
        }
      );
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.state.term = [
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.phone_number,
    ];
    this.setState({ editDisabled: "" });
    addClient(this.state.term).then(() => {
      this.getAll();
    });
  };
  onDelete = (val, e) => {
    e.preventDefault();
    deleteClient(val);
    this.getAll();

    var data = [...this.state.items];
    data.filter((item, index) => {
      if (item[1] === val) {
        data.splice(index, 1);
      }
      return true;
    });
    this.setState({ items: [...data] });
  };
  onUpdate = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="col-md-12">
        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="file"
              onChange={this.onUpdate}
            />
            <label className="custom-file-label" htmlFor="file">
              {this.state.file_placeholder}
            </label>
          </div>
        </div>
        <button
          type="button"
          className="col-md-12"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#updateModal"
        >
          Add Client
        </button>
        <table
          class="display table responsvive text-left mt-4"
          id="proxy-table"
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone number</th>
              <th scope="col">Email</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item[0]}</td>
                <td className="text-left">{item[1]}</td>
                <td className="text-left">{item[2]}</td>
                <td className="text-left">{item[3]}</td>
                <td className="text-left">{item[4]}</td>
                <td className="text-right">
                  <button
                    className="btn btn-danger"
                    disabled={this.state.editDisabled}
                    onClick={this.onDelete.bind(this, item[0])}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.handleTableStyle()}

        <div
          class="modal fade"
          id="updateModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-8 offset-md-2">First name</div>
                      <div className="col-md-8 offset-md-2">
                        <input
                          type="text"
                          className="form-control"
                          name="input1"
                          value={this.state.first_name || ""}
                          onChange={this.handleClientFirstName.bind(this)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-8 offset-md-2">Last name</div>
                      <div className="col-md-8 offset-md-2">
                        <input
                          type="text"
                          className="form-control"
                          name="input2"
                          value={this.state.last_name || ""}
                          onChange={this.handleClientLastName.bind(this)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-8 offset-md-2">Email</div>
                      <div className="col-md-8 offset-md-2">
                        <input
                          type="text"
                          className="form-control"
                          name="input3"
                          value={this.state.email || ""}
                          onChange={this.handleClientEmail.bind(this)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-8 offset-md-2">Phone number</div>
                      <div className="col-md-8 offset-md-2">
                        <input
                          type="text"
                          className="form-control"
                          name="input4"
                          value={this.state.phone_number || ""}
                          onChange={this.handleClientPhoneNumber.bind(this)}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  className="col-md-2 offset-md-5 btn btn-success btn-block"
                  type="submit"
                  onClick={this.onSubmit.bind(this)}
                  data-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
