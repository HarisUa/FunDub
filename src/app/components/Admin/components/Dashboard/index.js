import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  CardText,
  Col,
  Row,
  Table,
  Input,
} from 'reactstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      data: [],
      banuser: '',
    };

    this._handleChange = this._handleChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleChange(name) {
    if (name.target.value) { 
      this.setState({ banuser: name.target.value }); 
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    if(this.state.banuser) { 
      fetch('/admin/api/ban', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            banname: this.state.banuser,
          })
        })
    }
  }

    componentDidMount() {
        fetch('/admin/api/global')
            .then(res => res.json())
            .then(data => {this.setState({ data })});
    }

    componentDidUpdate() {
        fetch('/admin/api/global')
            .then(res => res.json())
            .then(data => {this.setState({ data })});
    }

  render() {
    let table = (this.state.data.vStat && this.state.data.vStat.length != 0) ? 
        this.state.data.vStat.map(vid =>
          <tr>
            <td className="text-center">
              <div>
                <a href={'https://youtu.be/' + vid.video.id.videoId }>
                    <img src={vid.video.snippet.thumbnails.default.url} className="img-avatar" alt="" />
                </a>
              </div>
            </td>
            <td>
              <div>{vid.video.snippet.title}</div>
            </td>
            <td className="text-center">
              <strong>{vid.count}</strong>
            </td>
          </tr>
    )
    : <tr><td><div>No Added Videos</div></td><td></td><td></td></tr>

    return (
      <div className="animated fadeIn container" style={{ marginTop: '10px' }}>
        <Row>
          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info text-center">
              <CardBody className="pb-0">
                <div className="text-value">{ this.state.data.rooms }</div>
                <div>Rooms Created</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <i className="desktop icon" style={{ fontSize: '4em' }}/>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-primary text-center">
              <CardBody className="pb-0">
                <div className="text-value">{ this.state.data.users }</div>
                <div>Members Online</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <i className="users icon" style={{ fontSize: '4em' }}/>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-warning text-center">
              <CardBody className="pb-0">
                <div className="text-value">{ this.state.data.sVideos }</div>
                <div>Session Video Played</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <i className="video icon" style={{ fontSize: '4em' }}/>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table hover responsive className="table-outline d-sm-table">
              <thead className="thead-light">
              <tr>
                <th className="text-center"><i className="video icon"></i></th>
                <th>Title</th>
                <th className="text-center">Count</th>
              </tr>
              </thead>
              <tbody>
                  { table }
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
            <Col>
                <Card body outline color="danger">
                    <CardTitle>Ban User</CardTitle>
                    <CardText>Use the "Ban User" control to block spammers, offensive commenters and/or those who violate our commenting policy. This will block the user from using service.</CardText>
                    <Row>
                        <Col>
                            <Input onChange={this._handleChange}/>
                        </Col>
                        <Col>
                            <Button sm="12" color="danger" onClick={this._handleSubmit}>Ban User</Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
