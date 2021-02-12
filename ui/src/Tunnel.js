import React, { Component } from "react";
import { nextClient, updateClient,updateSocietyName, sendMail } from "./Functions";
import "jquery";


class Tunnel extends Component {
  constructor() {
    super();
    this.state = {
      id: 1,
      term: [],
      siren_number: "",
      email: "",
      phone_number: "",
      last_name: "",
      items: [],
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.handleClientSirenNumber = this.handleClientSirenNumber.bind(this);
    this.IncrementItem = this.IncrementItem.bind(this);
    this.SendMailFunction = this.SendMailFunction.bind(this);
  }

  componentDidMount() {
    this.nextClientFunction(this.state.id);
  }

  handleClientSirenNumber = (e) => {
    this.setState({
      siren_number: e.target.value,
    });
  };

  nextClientFunction = (id) => {
    nextClient(id).then((data) => {
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

  IncrementItem = () => {
    this.setState({ id: this.state.id + 1 });
    this.nextClientFunction(this.state.id);
  };

  SendMailFunction = () => {
    this.sendMail(this.state.id);
  };

  onUpdate = (e) => {
    e.preventDefault();
    if (this.state.id > 1) {
      this.state.id = this.state.id - 1;
    }
    updateClient(this.state.siren_number, this.state.id);
    this.nextClientFunction(this.state.id);
    updateSocietyName(this.state.id);
  };

  render() {
    return (
      <div className="col-md-12">
        <button
          type="button"
          className="col-md-12"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#updateModal"
        >
          Add Siren
        </button>
         <table
          class="display table responsvive text-left mt-4"
          id="proxy-table"
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Phone number</th>
              <th scope="col">Email</th>
              <th scope="col">Siren number</th>
              <th scope="col">Society name</th>
              <th scope="col">Next Client</th>
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
                <td className="text-left">{item[5]}</td>
                <td className="text-left">{item[6]}</td>
                <td className="text-right">
                  <button
                    className="btn btn-danger"
                    onClick={this.IncrementItem.bind(this)}
                  >
                    Next
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
           className="col-md-2 offset-md-5 btn btn-success btn-block"
           type="submit"
           onClick={this.SendMailFunction.bind(this)}
        >
          Generate pdf
        </button>
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
                <form onSubmit={this.onUpdate}>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-8 offset-md-2">Siren number</div>
                      <div className="col-md-8 offset-md-2">
                        <input
                          type="text"
                          className="form-control"
                          name="input1"
                          value={this.state.siren_number || ""}
                          onChange={this.handleClientSirenNumber.bind(this)}
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
                  onClick={this.onUpdate.bind(this)}
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

export default Tunnel;
