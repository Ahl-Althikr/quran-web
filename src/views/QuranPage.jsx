import React from 'react'
import classNames from 'classnames'

import { toArabicNumber } from 'utils/toArabicNumber'
import { last } from 'utils/array'
import QuranVerse from './QuranVerse'
import ClassNames from './QuranPage.module.scss'

export default class QuranPage extends React.Component {
  static defaultProps = {
    page: {
      verses: [],
    },
  }

  render() {
    const {
      page,
      verses,
      chapters,
      sections,
      explanations,

      width,
      height,

      fontSize,
      blurVerses,
      showExplanation,
    } = this.props

    const styles = {
      fontSize,
      height: height - 11,
      maxHeight: height - 11,
      minHeight: height - 11,
      width: width,
      maxWidth: width,
      minWidth: width,
      fontFamily: `quran_page_${page.number}`,
    }

    const classes = classNames(ClassNames.QuranPage, {
      [`page_${page.number}`]: page.number,
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
