import React from 'react'

import ClassNames from './QuranVerse.module.scss'

export default class QuranVerse extends React.Component {
  render() {
    const { verse, chapters } = this.props
    const chapter = chapters[verse.chapter]

    return (
      <>
        {verse.number === 1 && (
          <>
            <div className={ClassNames.QuranChapterTitle}>
              {chapter.arabic_unicode}
            </div>
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
      </>
    )
  }
}
