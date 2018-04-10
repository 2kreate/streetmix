import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, Modal, Button, Alert } from 'react-bootstrap'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      dob: '',
      emailSuccess: null,
      nameSuccess: null,
      dobSuccess: null,
      msg: null,
      alertStatus: null
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    fetch('/api/v1/admin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        dob: this.state.dob
      })
    }).then(response => {
      if (response.status === 400) {
        this.setState({ alertStatus: 'danger' })
      } else if (response.status === 201) {
        this.setState({ alertStatus: 'success' })
      }
      return response.json()
    }).then(data => this.setState({ msg: data.msg }))
  }

  render () {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Please enter your details: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="emailGroup" validationState={this.state.emailSuccess}>
                  <ControlLabel>Please enter your email:</ControlLabel>
                  <FormControl
                    type="email"
                    name="email"
                    value={this.state.email}
                    placeholder="Enter your email here"
                    onChange={this.handleInputChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="nameGroup" validationState={this.state.nameSuccess}>
                  <ControlLabel>Please enter your full name:</ControlLabel>
                  <FormControl
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Enter your full name here"
                    onChange={this.handleInputChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="dobGroup" validationState={this.state.dobSuccess}>
                  <ControlLabel>Please enter your date of birth:</ControlLabel>
                  <FormControl
                    type="date"
                    name="dob"
                    value={this.state.dob}
                    onChange={this.handleInputChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <Button bsStyle="primary" type="submit">Submit</Button>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Alert bsStyle={this.state.alertStatus}>{this.state.msg}</Alert>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    )
  }
}

export default Admin
