import React from 'react'
import Provider from '@anew/provider'
import classNames from 'classnames'

import './Quran.css'

import { onKeyDown } from 'utils/events'
import { onKey } from 'utils/keys'

import history from 'config/history'
import QuranPage from './QuranPage'
import ClassNames from './Quran.module.scss'

class Quran extends React.Component {
  state = {
    blurPage: false,
    showExplanation: false,
  }

  static mapStateToProps = ({ get }) => ({
    explanations: get.explanations.explanations(),
    sections: get.sections.sections(),
    chapters: get.chapters.chapters(),
    verses: get.verses.verses(),
    pages: get.pages.pages(),
    isFetching: get.isFetching(),
  })

  static mapMethodsToProps = ({ dispatch }) => ({
    fetchData: dispatch.fetchData,
  })

  /**
   * -------------------
   * Getter Methods
   * -------------------
   */

  getPage = () => {
    let page = +history.location.pathname.replace('/', '') || 1

    if (page < 1) {
      page = 1
      history.push('/1')
    } else if (page > 604) {
      page = 604
      history.push('/604')
    }

    return page
  }

  /**
   * -------------------
   * Action Methods
   * -------------------
   */

  nextPage = () => {
    const { getPage } = this
    const nextActivePageKey = getPage() + 2
    if (nextActivePageKey > 604) return

    history.push(`/${nextActivePageKey}`)
  }

  prevPage = () => {
    const { getPage } = this
    const nextActivePageKey = getPage() - 2
    if (nextActivePageKey < 1) return

    history.push(`/${nextActivePageKey}`)
  }

  /**
   * -------------------
   * Toggle Methods
   * -------------------
   */

  toggleBlurPage = () => {
    this.setState({
      blurPage: !this.state.blurPage,
    })
  }

  toggleShowExplanation = () => {
    this.setState({
      showExplanation: !this.state.showExplanation,
    })
  }

  /**
   * -------------------
   * Hanlder Methods
   * -------------------
   */

  handleKeyDown = (event) => {
    const { prevPage, nextPage } = this

    onKey(event, {
      right: prevPage,
      left: nextPage,
    })
  }

  /**
   * -------------------
   * Lifecycle Methods
   * -------------------
   */

  componentDidMount() {
    this.props.fetchData()
    this.removeKeyDownListener = onKeyDown(this.handleKeyDown)
  }

  componentWillUnmount() {
    this.removeKeyDownListener()
  }

  render() {
    const {
      getPage,
      nextPage,
      prevPage,
      toggleBlurPage,
      toggleShowExplanation,
      state: { blurPage, showExplanation },
      props: { isFetching, verses, pages, chapters, sections, explanations },
    } = this

    const page = getPage()
    const classes = classNames(ClassNames.Quran)

    return isFetching ? (
      <div className={ClassNames.QuranLoading}>Loading...</div>
    ) : (
      <div className={classes}>
        {!((page + 1) % 2) ? (
          <>
            <QuranPage
              page={pages[page + 1]}
              verses={verses}
              chapters={chapters}
              sections={sections}
              explanations={explanations}
              showExplanation={showExplanation}
              blurPage={blurPage}
            />
            <QuranPage
              page={pages[page]}
              verses={verses}
              chapters={chapters}
              sections={sections}
              explanations={explanations}
              showExplanation={showExplanation}
              blurPage={blurPage}
            />
          </>
        ) : (
          <>
            <QuranPage
              page={pages[page]}
              verses={verses}
              chapters={chapters}
              sections={sections}
              explanations={explanations}
              showExplanation={showExplanation}
              blurPage={blurPage}
            />
            <QuranPage
              page={pages[page - 1]}
              verses={verses}
              chapters={chapters}
              sections={sections}
              explanations={explanations}
              showExplanation={showExplanation}
              blurPage={blurPage}
            />
          </>
        )}
        <div className={ClassNames.QuranButtons}>
          <button onClick={toggleShowExplanation}>
            {!showExplanation ? 'Show' : 'Hide'} Explanation
          </button>
          <button onClick={nextPage}>Next</button>
          <button onClick={prevPage}>Previous</button>
          <button onClick={toggleBlurPage}>
            {blurPage ? 'Show' : 'Hide'} Verses
          </button>
        </div>
      </div>
    )
  }
}

export default Provider.connect(Quran)
