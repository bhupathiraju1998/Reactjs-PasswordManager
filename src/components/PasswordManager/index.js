import './index.css'

const PasswordManager = props => {
  const {passwordDetails, onDeletePassword, showPassword} = props
  const {id, username, password, website, initialClassName} = passwordDetails

  const onClickPassword = () => {
    onDeletePassword(id)
  }

  const hiddenPwd =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

  const passwordImg = showPassword ? (
    <p className="text">{password}</p>
  ) : (
    <img src={hiddenPwd} alt="stars" className="stars" />
  )

  return (
    <li className="password-item">
      <div className="item-container">
        <div className={`initial-container ${initialClassName}`}>
          <p className="initial">{username[0].toUpperCase()}</p>
        </div>
        <div className="text-container">
          <p className="text">{website}</p>
          <p className="text">{username}</p>
          {passwordImg}
        </div>
        <button
          type="button"
          className="del-butt"
          onClick={onClickPassword}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="del-img"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordManager
