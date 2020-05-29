import React from 'react'
import classNames from 'classnames'

import { FONT_URL } from 'constants/app'
import QuranVerse from './QuranVerse'
import ClassNames from './QuranPage.module.scss'

export default class QuranPage extends React.Component {
  static defaultProps = {
    page: {
      verses: [],
      chapters: [],
      sections: [],
    },
  }

  addPageFont = (pageNumber = this.props.page.number) => {
    const pageId = `page_${pageNumber}`

    if (
      document.querySelector(`style#${pageId}`) ||
      pageNumber < 1 ||
      pageNumber > 604
    ) {
      return
    }

    const style = document.createElement('style')
    const head = document.head || document.querySelector('head')
    const css = `
      @font-face {
        font-family: 'font_page_${pageNumber}';
        src: url(${FONT_URL.replace('{}', pageNumber)}) format('truetype');
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
    const { number } = this.props.page

    if (number !== 1) {
      this.addPageFont(1)
    }

    ;[...new Array(2)].forEach((v, i) => {
      this.addPageFont(number - i)
      this.addPageFont(number + i)
    })
  }

  componentDidUpdate() {
    this.addPageFont()
  }

  render() {
    const { page, verses, chapters, sections } = this.props
    const classes = classNames(ClassNames.QuranPage, `page_${page.number}`)
    const styles = { fontFamily: `font_page_${page.number}` }

    console.log(sections)

    return (
      <div className={classes} style={styles}>
        <div className={ClassNames.QuranPageChapterAndSection}>
          <div className={ClassNames.QuranPageChapter}>
            {page.chapters
              .map((chapter) => chapters[chapter].arabic_unicode)
              .join(' ← ')}
          </div>
          <div className={ClassNames.QuranPageSection}>
            {page.sections
              .map((section) => sections[section].id)
              .reverse()
              .join(' ← ')}{' '}
            الجزء
          </div>
        </div>
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
