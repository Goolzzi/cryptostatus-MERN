import React from 'react'

import { Cell } from 'fixed-data-table'

export default class StatCell extends React.Component {
  constructor() {
    super()

    this.timer = null

    this.state = {
      className: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value > this.props.value) {
      this.showPositiveTicker()
    }

    if (nextProps.value < this.props.value) {
      this.showNegativeTicker()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  showPositiveTicker() {
    const positiveColor = this.props.colorblind ? 'blue-ticker' : 'green-ticker'
    this.flashTicker(positiveColor)
  }

  showNegativeTicker() {
    this.flashTicker('red-ticker')
  }

  flashTicker(colorClassName) {
    this.setState({ className: `ticker ${colorClassName}` })

    this.timer = setTimeout(() => {
      this.setState({ className: '' })
    }, 1500)
  }

  render() {
    const { value, colorblind } = this.props
    let color = 'black'

    if (typeof value === 'number') {
      const positiveColor = colorblind ? '#3a77d8' : '#1daa16'
      color = value > 0 ? positiveColor : '#eb2c2c'
    }

    // eslint-disable-next-line eqeqeq
    if (value == '0.00') {
      color = 'black'
    }

    return (
      <Cell className={this.state.className} {...this.props.cellProps}>
        <span style={{ color }}>
          {value}
        </span>
      </Cell>
    )
  }
}
