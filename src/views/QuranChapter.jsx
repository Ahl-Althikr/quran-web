import React from 'react'
import classNames from 'classnames'

import { toArabicNumber } from 'utils/toArabicNumber'
import ClassNames from './QuranChapter.module.scss'

export default class QuranChapter extends React.Component {
  static defaultProps = {
    chapter: {},
  }

  render() {
    const { chapter, page, goToPage } = this.props
    const classes = classNames(ClassNames.QuranChapter, {
      [ClassNames.isActive]: chapter.pages.includes(page + ''),
    })

    return (
      <div className={classes} onClick={() => goToPage(chapter.pages[0])}>
        <div className={ClassNames.QuranChapterContent}>
          <div className={ClassNames.QuranChapterInner}>
            <div className={ClassNames.QuranChapterTitle}>
              <div className={ClassNames.QuranChapterHeader}>
                {toArabicNumber(chapter.number)}
              </div>
              {chapter.arabic_unicode}
            </div>
            <div className={ClassNames.QuranChapterAfter}>
              <span>{chapter.name}</span>
              <span className={ClassNames.QuranChapterBadge}>
                {chapter.number}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}