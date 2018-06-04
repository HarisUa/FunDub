import { Component, PropTypes } from 'react'

import { generateNonDupInt } from 'utils'

const style = {
  marginLeft: '1em',
}

export default class UserNumber extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.number !== this.props.number
  }

  render() {
    return (
      <div
        className={`ui large pink circular label ${getClassName()}`}
        style={style}>
        <i className="users icon"></i>
        {this.props.number}
      </div>
    )
  }
}

UserNumber.propTypes = {
  number: PropTypes.number.isRequired
}

function getClassName() {
  // generate a random non duplicated
  // animate class name
  const classArray = [
    'bounce',
    'flash',
    'pulse',
    'rubberBand',
    'shake',
    'swing',
    'tada',
    'wobble',
    'jello',
  ]
  const index = generateNonDupInt(0, classArray.length - 1)
  return `animated ${classArray[index]}`
}
