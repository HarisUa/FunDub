import { Component, PropTypes } from 'react'
import NotificationSystem from 'react-notification-system'

export default class Notification extends Component {
  componentDidMount() {
    this.props.onReady(this.refs.notification)
  }

  render() {
    return (
      <NotificationSystem ref="notification"/>
    )
  }
}

Notification.propTypes = {
  onReady: PropTypes.func.isRequired
}
