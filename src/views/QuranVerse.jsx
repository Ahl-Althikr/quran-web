import React from 'react'

import { NEXT_CHAPTER_TITLE } from 'constants/app'
import ClassNames from './QuranVerse.module.scss'
import { last } from 'utils/array'

export default class QuranVerse extends React.Component {
  render() {
    const { verse, chapters } = this.props

    const chapter = chapters[verse.chapter]
    const nextChapter = chapters[chapter.number + 1]

    const lastChapterVerseId = last(chapter.verses)
    const includeNextChapterTitle = NEXT_CHAPTER_TITLE.has(chapter.number)
    const includedInPrevChapterTitle = NEXT_CHAPTER_TITLE.has(
      chapter.number - 1
    )

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
              <div className={ClassNames.QuranBasmalah}>﷽</div>
            )}
          </>
        )}
        <span className={ClassNames.QuranVerse}>
          {verse.arabic_unicodes.map((arabic_unicode) => (
            <span key={arabic_unicode}>{arabic_unicode}</span>
          ))}
        </span>
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
