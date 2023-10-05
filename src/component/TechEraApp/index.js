import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import LanguageItem from '../LanguageItem'

import './index.css'

const apiStatusObj = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TechEraApp extends Component {
  state = {languageList: [], apiStatus: apiStatusObj.initial}

  componentDidMount() {
    this.getLanguageDetails()
  }

  reRenderApi = () => {
    this.getLanguageDetails()
  }

  getLanguageDetails = async () => {
    this.setState({apiStatus: apiStatusObj.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.courses.map(eachItem => ({
        id: eachItem.id,
        logoUrl: eachItem.logo_url,
        name: eachItem.name,
      }))
      this.setState({
        languageList: formattedData,
        apiStatus: apiStatusObj.success,
      })
    } else {
      this.setState({apiStatus: apiStatusObj.failure})
    }
  }

  renderLanguageList = () => {
    const {languageList} = this.state
    return (
      <ul className="language-list-container">
        {languageList.map(eachItem => (
          <LanguageItem key={eachItem.id} languageDetail={eachItem} />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => (
    <div className="TechEraBgContainer">
      <h1 className="Heading">Courses</h1>
      {this.renderLanguageList()}
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        data-testid="retry"
        onClick={this.reRenderApi}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader color="#4656a1" type="ThreeDots" />
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusObj.inProgress:
        return this.renderLoaderView()
      case apiStatusObj.success:
        return this.renderSuccessView()
      case apiStatusObj.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderResultView()}
      </>
    )
  }
}

export default TechEraApp
