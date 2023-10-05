import {Link} from 'react-router-dom'

import './index.css'

const LanguageItem = props => {
  const {languageDetail} = props
  const {name, logoUrl, id} = languageDetail
  return (
    <li className="item-container">
      <Link to={`/courses/${id}`} className="link">
        <img src={logoUrl} alt={name} className="logo-image" />
        <p className="name">{name}</p>
      </Link>
    </li>
  )
}

export default LanguageItem
