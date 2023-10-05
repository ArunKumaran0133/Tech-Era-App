import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="HeaderBgContainer">
    <Link to="/">
      <img
        className="HeaderImage"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </div>
)

export default withRouter(Header)
