import React from 'react'
import classNames from 'classnames'

import { FONT_URL } from 'constants/app'
import QuranVerse from './QuranVerse'
import ClassNames from './QuranPage.module.scss'

export default class QuranPage extends React.Component {
  static defaultProps = {
    page: {},
  }

  addPageFont = () => {
    const { page } = this.props
    const pageId = `page_${page.number}`

    if (document.querySelector(`style#${pageId}`)) return

    const style = document.createElement('style')
    const head = document.head || document.querySelector('head')
    const css = `
      @font-face {
        font-family: 'font_page_${page.number}';
        src: url(${FONT_URL.replace('{}', page.number)}) format('truetype');
      }
    `

    head.appendChild(style)
    style.type = 'text/css'
    style.id = pageId

    if (style.styleSheet) {
      // This is required for IE8 and below.
      style.styleSheet.cssText = css
    } else {
      style.appendChild(document.createTextNode(css))
    }
  }

  componentDidMount() {
    this.addPageFont()
  }

  componentDidUpdate() {
    this.addPageFont()
  }

  render() {
    const { page, verses, chapters } = this.props
    const classes = classNames(ClassNames.QuranPage, `page_${page.number}`)
    const styles = { fontFamily: `font_page_${page.number}` }

    return (
      <div className={classes} style={styles}>
        <div className={ClassNames.QuranPageContent}>
          {page.verses.map((verseKey) => (
            <QuranVerse
              key={verseKey}
              verse={verses[verseKey]}
              chapters={chapters}
            />
          ))}
        </div>
        <div className={ClassNames.QuranPageNumber}>{page.number}</div>
      </div>
    )
  }
}
