import React from 'react'

import ClassNames from './QuranVerse.module.scss'

export default class QuranVerse extends React.Component {
  render() {
    const { verse } = this.props

    return (
      <span className={ClassNames.QuranVerse}>
        {verse.arabic_unicodes.map((arabic_unicode) => (
          <span key={arabic_unicode}>{arabic_unicode}</span>
        ))}
      </span>
    )
  }
}
