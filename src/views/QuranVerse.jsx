import React from 'react'

export default class QuranVerse extends React.Component {
  render() {
    const { verse } = this.props

    return (
      <span>
        {verse.arabic_unicodes.map((arabic_unicode) => (
          <span key={arabic_unicode}>{arabic_unicode}</span>
        ))}
      </span>
    )
  }
}
