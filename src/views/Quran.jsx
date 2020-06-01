import { Grid, ColumnSizer, AutoSizer } from 'react-virtualized'
import React from 'react'
import Provider from '@anew/provider'

import {
  WIDTH_FROM_HEIGHT,
  FONT_FROM_HEIGHT,
  FONT_FROM_WIDTH,
  WIDTH_POFFSET,
  HEIGHT_NOFFSET,
} from 'constants/quran'
import { sizeof } from 'utils/object'
import { onMediaQuery } from 'utils/events'
import QuranPage from './QuranPage'
import QuranChapter from './QuranChapter'
import ClassNames from './Quran.module.scss'

class Quran extends React.Component {
  state = {
    scrollPageNumber: 1,
    isSmallScreen: false,
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

  getActivePageNumber = () => {
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
   * Lifecycle Methods
   * -------------------
   */

  componentDidMount() {
    this.props.fetchData()
    this.removeOnMediaQuery = onMediaQuery({
      query: '(max-width: 768px)',
      onSuccess: () => {
        this.setState({ isSmallScreen: true })
      },
      onFailure: () => {
        this.setState({ isSmallScreen: false })
      },
    })
  }

  componentWillUnmount() {
    this.removeOnMediaQuery()
  }

  render() {
    const {
      getActivePageNumber,
      goToPage,
      toggleBlurVerses,
      toggleShowExplanation,
      state: { blurVerses, showExplanation, isSmallScreen, scrollPageNumber },
      props: { isFetching, verses, pages, chapters, sections, explanations },
    } = this

    const activePageNumber = getActivePageNumber()
    const scrollPage = pages[scrollPageNumber]
    const pagesCount = sizeof(pages)

    return isFetching ? (
      <div className={ClassNames.QuranLoading}>Loading...</div>
    ) : (
      <div className={ClassNames.Quran}>
        <div className={ClassNames.QuranReader}>
          <div className={ClassNames.QuranContent}>
            <AutoSizer>
              {({ width, height: pageHeight }) => {
                const actualHeight = pageHeight - HEIGHT_NOFFSET
                const pageWidth = isSmallScreen
                  ? width
                  : actualHeight * WIDTH_FROM_HEIGHT + WIDTH_POFFSET
                const fontSize = isSmallScreen
                  ? pageWidth * FONT_FROM_WIDTH
                  : actualHeight * FONT_FROM_HEIGHT

                return (
                  <ColumnSizer
                    width={width}
                    columnMaxWidth={pageWidth}
                    columnMinWidth={pageWidth}
                    columnCount={pagesCount}
                  >
                    {({ adjustedWidth, getColumnWidth, registerChild }) => (
                      <Grid
                        rowCount={1}
                        overscanColumnCount={7}
                        ref={registerChild}
                        columnWidth={getColumnWidth}
                        columnCount={pagesCount}
                        height={pageHeight}
                        rowHeight={pageHeight}
                        className={ClassNames.QuranGrid}
                        width={isSmallScreen ? adjustedWidth : pageWidth * 2}
                        scrollToColumn={
                          604 -
                          activePageNumber -
                          ([1, 604].includes(activePageNumber) ? 0 : 1)
                        }
                        onScroll={(e) => {
                          this.setState({
                            scrollPageNumber:
                              603 -
                              Math.ceil(e.scrollLeft / Math.floor(pageWidth)),
                          })
                        }}
                        cellRenderer={({ columnIndex, key, style }) => (
                          <QuranPage
                            key={key}
                            page={pages[604 - columnIndex]}
                            verses={verses}
                            chapters={chapters}
                            sections={sections}
                            explanations={explanations}
                            fontSize={fontSize}
                            showExplanation={showExplanation}
                            blurVerses={blurVerses}
                            style={style}
                          />
                        )}
                      />
                    )}
                  </ColumnSizer>
                )
              }}
            </AutoSizer>
          </div>
          <div className={ClassNames.QuranButtons}>
            <button
              className={ClassNames.QuranButton}
              onClick={toggleShowExplanation}
            >
              {!showExplanation ? 'Show' : 'Hide'} Explanation
            </button>
            <button
              className={ClassNames.QuranButton}
              onClick={toggleBlurVerses}
            >
              {blurVerses ? 'Show' : 'Hide'} Verses
            </button>
          </div>
        </div>
        <div className={ClassNames.QuranChapters}>
          {Object.values(chapters).map((chapter) => (
            <QuranChapter
              key={chapter.number}
              page={scrollPage}
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
