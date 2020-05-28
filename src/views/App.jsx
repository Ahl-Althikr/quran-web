import React from 'react'
import Provider from '@anew/provider'

import { FONT_URL } from 'constants/app'

class App extends React.Component {
  static mapStateToProps = ({ get }) => ({
    verses: get.verses.verses(),
    pages: get.pages.pages(),
    isFetching: get.isFetching(),
  })

  static mapMethodsToProps = ({ dispatch }) => ({
    fetchData: dispatch.fetchData,
  })

  state = {
    activePageKey: +window.location.pathname.replace('/', '') || 1,
    addedStyles: new Set(),
  }

  componentDidMount() {
    this.addPageFont(this.state.activePageKey)
    this.props.fetchData()
  }

  nextPage = () => {
    const nextActivePageKey = this.state.activePageKey + 1
    if (nextActivePageKey > 604) return

    this.addPageFont(nextActivePageKey)
    this.setState({ activePageKey: nextActivePageKey })
  }

  prevPage = () => {
    const nextActivePageKey = this.state.activePageKey - 1
    if (nextActivePageKey < 1) return

    this.addPageFont(nextActivePageKey)
    this.setState({ activePageKey: nextActivePageKey })
  }

  addPageFont = (pageKey) => {
    if (this.state.addedStyles.has(pageKey)) return

    const style = document.createElement('style')
    const head = document.head || document.getElementsByTagName('head')[0]
    const css = `
      @font-face {
        font-family: 'font_page_${pageKey}';
        src: url(${FONT_URL.replace('{}', pageKey)}) format('truetype');
      }

      .page_${pageKey} .verse-ararbic-unicode {
        font-family: 'font_page_${pageKey}';
      }
      .page_${pageKey} {
        font-size: 36px;
        line-height: 195%;
        text-align: center;
        word-wrap: break-word;
        margin: 0 auto;
        max-width: 520px;
      }
    `

    head.appendChild(style)

    style.type = 'text/css'
    if (style.styleSheet) {
      // This is required for IE8 and below.
      style.styleSheet.cssText = css
    } else {
      style.appendChild(document.createTextNode(css))
    }

    this.setState({
      addedStyles: new Set([...this.state.addedStyles, pageKey]),
    })
  }

  render() {
    const { isFetching, verses, pages } = this.props
    const { activePageKey } = this.state

    return isFetching ? (
      <div>Loading...</div>
    ) : (
      <div style={{ textAlign: 'center' }}>
        <div className={`page_${activePageKey}`}>
          {pages[activePageKey] &&
            pages[activePageKey]['verses'].map((verseKey) => (
              <span className="verse" key={verseKey}>
                {verses[verseKey].arabic_unicodes.map((arabic_unicode) => (
                  <span className="verse-ararbic-unicode" key={arabic_unicode}>
                    {arabic_unicode}
                  </span>
                ))}
              </span>
            ))}
        </div>
        <br />
        <button onClick={this.nextPage} style={{ marginRight: 5 }}>
          Next
        </button>
        <button onClick={this.prevPage}>Previous</button>
      </div>
    )
  }
}

export default Provider.connect(App)
