import React from 'react'
import classNames from 'classnames'

import { toArabicNumber } from 'utils/toArabicNumber'
import { FONT_URL } from 'constants/app'
import QuranVerse from './QuranVerse'
import ClassNames from './QuranPage.module.scss'
import { last } from 'utils/array'

export default class QuranPage extends React.Component {
  static defaultProps = {
    fontSize: 28,
    page: {
      verses: [],
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
    const {
      pageRef,
      props: {
        setFontSize,
        page: { number },
      },
    } = this

    setFontSize(pageRef.clientHeight * 0.036117381)

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
    const {
      page,
      verses,
      chapters,
      sections,
      explanations,

      fontSize,
      blurVerses,
      showExplanation,
    } = this.props

    const styles = {
      fontSize,
      maxWidth: fontSize / 0.0698,
      fontFamily: `font_page_${page.number}`,
    }

    const classes = classNames(ClassNames.QuranPage, `page_${page.number}`, {
      [ClassNames.isBlur]: blurVerses,
      [ClassNames.isExplanation]: showExplanation,
    })

    return (
      <div
        className={classes}
        style={styles}
        ref={(pageNode) => (this.pageRef = pageNode)}
      >
        <div className={ClassNames.QuranPageChapterAndSection}>
          <div className={ClassNames.QuranPageChapter}>
            {chapters &&
              page.chapters &&
              chapters[last(page.chapters)].arabic_unicode}
          </div>
          <div className={ClassNames.QuranPageSection}>
            الجزء{' '}
            {sections &&
              page.sections &&
              toArabicNumber(sections[last(page.sections)].id)}
          </div>
        </div>
        <div className={ClassNames.QuranPageContent}>
          {page.verses.map((verseKey) => (
            <QuranVerse
              key={verseKey}
              verse={verses[verseKey]}
              chapters={chapters}
              sections={sections}
              explanations={explanations}
              blurVerses={blurVerses}
              showExplanation={showExplanation}
              fontSize={fontSize}
            />
          ))}
        </div>
        <div className={ClassNames.QuranPageNumber}>
          {toArabicNumber(page.number)}
        </div>
      </div>
    )
  }
}
