import React from 'react'
import Provider from '@anew/provider'

import './Quran.css'

import { onKeyDown } from 'utils/events'
import { onKey } from 'utils/keys'

import QuranPage from './QuranPage'
import QuranChapter from './QuranChapter'
import ClassNames from './Quran.module.scss'

class Quran extends React.Component {
  state = {
    isSmallScreen: null,
    fontSize: 28,
    blurVerses: false,
    showExplanation: false,
  }

  static mapStateToProps = ({ get }) => ({
    pathname: get.router.pathname(),
    explanations: get.explanations.explanations(),
    sections: get.sections.sections(),
    chapters: get.chapters.chapters(),
    verses: get.verses.verses(),
    pages: get.pages.pages(),
    isFetching: get.isFetching(),
  })

  static mapMethodsToProps = ({ dispatch }) => ({
    fetchData: dispatch.fetchData,
    push: dispatch.router.push,
  })

  /**
   * -------------------
   * Getter Methods
   * -------------------
   */

  getPage = () => {
    const { pathname, push } = this.props
    let page = +pathname.replace('/', '') || 1

    if (page < 1) {
      page = 1
      push(() => '/1')
    } else if (page > 604) {
      page = 604
      push(() => '/604')
    }

    return page
  }

  /**
   * -------------------
   * Action Methods
   * -------------------
   */

  nextPage = () => {
    const {
      getPage,
      state: { isSmallScreen },
      props: { push },
    } = this

    const nextActivePageKey = getPage() + (isSmallScreen ? 1 : 2)

    if (nextActivePageKey > 604) return

    push(() => `/${nextActivePageKey}`)
  }

  prevPage = () => {
    const {
      getPage,
      state: { isSmallScreen },
      props: { push },
    } = this

    const nextActivePageKey = getPage() - (isSmallScreen ? 1 : 2)

    if (nextActivePageKey < 1) return

    push(() => `/${nextActivePageKey}`)
  }

  goToPage = (pageNumber) => {
    const { push } = this.props
    if (pageNumber < 1 || pageNumber > 604) return

    push(() => `/${pageNumber}`)
  }

  /**
   * -------------------
   * State Methods
   * -------------------
   */

  decFontSize = () => {
    this.setState({
      fontSize: this.state.fontSize - 1,
    })
  }

  incFontSize = () => {
    this.setState({
      fontSize: this.state.fontSize + 1,
    })
  }

  setFontSize = (fontSize) => {
    this.setState({
      fontSize: Math.round(fontSize),
    })
  }

  toggleBlurVerses = () => {
    this.setState({
      blurVerses: !this.state.blurVerses,
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

    if (this.contentRef.clientWidth < 768) {
      this.setState({ isSmallScreen: true })
      this.setFontSize(this.contentRef.clientWidth * 0.0698)
    } else {
      this.setState({ isSmallScreen: false })
      this.setFontSize((this.contentRef.clientHeight - 10) * 0.036117381)
    }
  }

  componentWillUnmount() {
    this.removeKeyDownListener()
  }

  render() {
    const {
      getPage,
      nextPage,
      prevPage,
      goToPage,
      toggleBlurVerses,
      toggleShowExplanation,
      decFontSize,
      incFontSize,
      state: { blurVerses, showExplanation, fontSize, isSmallScreen },
      props: { isFetching, verses, pages, chapters, sections, explanations },
    } = this

    const page = getPage()

    return isFetching ? (
      <div className={ClassNames.QuranLoading}>Loading...</div>
    ) : (
      <div className={ClassNames.Quran}>
        <div className={ClassNames.QuranReader}>
          <div
            className={ClassNames.QuranContent}
            ref={(contentNode) => (this.contentRef = contentNode)}
          >
            {!((page + 1) % 2) ? (
              <>
                {!isSmallScreen && (
                  <QuranPage
                    page={pages[page + 1]}
                    verses={verses}
                    chapters={chapters}
                    sections={sections}
                    explanations={explanations}
                    fontSize={fontSize}
                    showExplanation={showExplanation}
                    blurVerses={blurVerses}
                  />
                )}
                <QuranPage
                  page={pages[page]}
                  verses={verses}
                  chapters={chapters}
                  sections={sections}
                  explanations={explanations}
                  fontSize={fontSize}
                  showExplanation={showExplanation}
                  blurVerses={blurVerses}
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
                  fontSize={fontSize}
                  showExplanation={showExplanation}
                  blurVerses={blurVerses}
                />
                {!isSmallScreen && (
                  <QuranPage
                    page={pages[page - 1]}
                    verses={verses}
                    chapters={chapters}
                    sections={sections}
                    explanations={explanations}
                    fontSize={fontSize}
                    showExplanation={showExplanation}
                    blurVerses={blurVerses}
                  />
                )}
              </>
            )}
          </div>
          <div className={ClassNames.QuranButtons}>
            <button onClick={nextPage}>Next</button>
            <button onClick={prevPage}>Previous</button>
            <button
              className={ClassNames.QuranFontSizeSmall}
              onClick={decFontSize}
            />
            <button
              className={ClassNames.QuranFontSizeLarge}
              onClick={incFontSize}
            />
            <button onClick={toggleShowExplanation}>
              {!showExplanation ? 'Show' : 'Hide'} Explanation
            </button>
            <button onClick={toggleBlurVerses}>
              {blurVerses ? 'Show' : 'Hide'} Verses
            </button>
          </div>
        </div>
        <div className={ClassNames.QuranChapters}>
          {Object.values(chapters).map((chapter) => (
            <QuranChapter
              key={chapter.number}
              page={page}
              chapter={chapter}
              goToPage={goToPage}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Provider.connect(Quran)
