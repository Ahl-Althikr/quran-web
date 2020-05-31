import React from 'react'
import classNames from 'classnames'

import { NEXT_CHAPTER_TITLE } from 'constants/app'
import { last } from 'utils/array'
import ClassNames from './QuranVerse.module.scss'

export default class QuranVerse extends React.Component {
  render() {
    const {
      verse,
      chapters,
      explanations,

      blurVerses,
      showExplanation,
    } = this.props

    const explanation = explanations[verse.explanations[0]]
    const chapter = chapters[verse.chapter]
    const nextChapter = chapters[chapter.number + 1]

    const lastChapterVerseId = last(chapter.verses)
    const includeNextChapterTitle = NEXT_CHAPTER_TITLE.has(chapter.number)
    const includedInPrevChapterTitle = NEXT_CHAPTER_TITLE.has(
      chapter.number - 1
    )

    const classes = classNames(ClassNames.QuranVerse, {
      [ClassNames.isBlur]: blurVerses,
      [ClassNames.isExplanation]: showExplanation,
    })

    return (
      <>
        {verse.number === 1 && (
          <>
            {!includedInPrevChapterTitle && (
              <div className={ClassNames.QuranChapterTitle}>
                <div className={ClassNames.QuranChapter}>
                  {chapter.arabic_unicode}
                </div>
              </div>
            )}
            {chapter.basmalah && (
              <div className={ClassNames.QuranBasmalah}>ﭑﭒﭓﭔ</div>
            )}
          </>
        )}
        <span className={classes}>
          {verse.arabic_unicodes.map((arabic_unicode) => (
            <span key={arabic_unicode}>{arabic_unicode}</span>
          ))}
        </span>
        {showExplanation && (
          <div className={ClassNames.QuranVerseExplanation}>
            {explanation.text}
          </div>
        )}
        {includeNextChapterTitle && verse.id === lastChapterVerseId && (
          <div className={ClassNames.QuranChapterTitle}>
            <div className={ClassNames.QuranChapter}>
              {nextChapter.arabic_unicode}
            </div>
          </div>
        )}
      </>
    )
  }
}
