import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusObj = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class LanguageDetail extends Component {
  state = {languageDetail: {}, apiStatus: apiStatusObj.initial}

  componentDidMount() {
    this.getLanguageDetail()
  }

  reRenderApi = () => {
    this.getLanguageDetail()
  }

  getLanguageDetail = async () => {
    this.setState({apiStatus: apiStatusObj.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const formattedData = {
        description: data.course_details.description,
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        languageDetail: formattedData,
        apiStatus: apiStatusObj.success,
      })
    } else {
      this.setState({apiStatus: apiStatusObj.failure})
    }
  }

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

  renderSuccessView = () => {
    const {languageDetail} = this.state
    const {name, imageUrl, description} = languageDetail
    return (
      <div className="language-detail-bg-container">
        <div className="language-detail-cart">
          <img src={imageUrl} alt={name} className="language-image" />
          <div className="description-container">
            <h1 className="heading">{name}</h1>
            <p className="para">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader color="#4656a1" type="ThreeDots" />
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusObj.success:
        return this.renderSuccessView()
      case apiStatusObj.failure:
        return this.renderFailureView()
      case apiStatusObj.inProgress:
        return this.renderLoadingView()
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

export default LanguageDetail
