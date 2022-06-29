import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordManager from './components/PasswordManager'

import './App.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'green',
  'orange',
  'skyBlue',
  'red',
]

const initialPasswordManagerList = []

class App extends Component {
  state = {
    PasswordManagerList: initialPasswordManagerList,
    website: '',
    username: '',
    password: '',
    showPassword: false,
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  handleOnChange = () => {
    const {showPassword} = this.state
    this.setState({showPassword: !showPassword})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderPasswordList = () => {
    const {PasswordManagerList, searchInput, showPassword} = this.state
    const searchResultsList = PasswordManagerList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (searchResultsList.length === 0) {
      return (
        <div className="no-pwd-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-pwd-img"
          />
          <p className="txt">No Passwords</p>
        </div>
      )
    }

    return searchResultsList.map(eachPassword => (
      <PasswordManager
        passwordDetails={eachPassword}
        key={eachPassword.id}
        onDeletePassword={this.onDeletePassword}
        showPassword={showPassword}
      />
    ))
  }

  AddPasswordDetails = event => {
    event.preventDefault()
    const {username, password, website, showPassword} = this.state
    const initialBackgroundClassName = `firstLetter ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newPasswordDetails = {
      id: uuidv4(),
      username,
      password,
      website,
      initialClassName: initialBackgroundClassName,
      showPassword,
    }

    this.setState(prevPassword => ({
      PasswordManagerList: [
        ...prevPassword.PasswordManagerList,
        newPasswordDetails,
      ],
      username: '',
      password: '',
      website: '',
    }))
  }

  onDeletePassword = id => {
    const {PasswordManagerList} = this.state
    const updatedPasswordManagerList = PasswordManagerList.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({PasswordManagerList: updatedPasswordManagerList})
  }

  render() {
    const {
      website,
      username,
      password,
      showPassword,
      searchInput,
      PasswordManagerList,
    } = this.state

    return (
      <div className="app-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="log-in-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-logo"
            />
            <div className="password-container">
              <h1 className="heading">Add New Password</h1>
              <form onSubmit={this.AddPasswordDetails}>
                <div className="common-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="logo"
                  />
                  <input
                    className="input-field"
                    placeholder="Enter Website"
                    onChange={this.onChangeWebsite}
                    value={website}
                  />
                </div>
                <div className="common-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="logo"
                  />
                  <input
                    className="input-field"
                    placeholder="Enter Username"
                    onChange={this.onChangeUsername}
                    value={username}
                  />
                </div>
                <div className="common-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="logo"
                  />
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Enter Password"
                    onChange={this.onChangePassword}
                    value={password}
                  />
                </div>
                <div className="button-container">
                  <button className="add-btn" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bottom-container">
          <div className="count-search-container">
            <div className="counter">
              <h1 className="title">Your Passwords</h1>
              <p className="count">{PasswordManagerList.length}</p>
            </div>
            <div className="search-container">
              <button type="button" className="search-btn">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="img-search"
                />
              </button>
              <input
                type="search"
                placeholder="search"
                className="search-input"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="ckb-cont">
            <form>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={this.handleOnChange}
              />
              <label htmlFor="checkbox" className="sh-pwd">
                Show passwords
              </label>
            </form>
          </div>
          <ul className="password-list">{this.renderPasswordList()}</ul>
        </div>
      </div>
    )
  }
}

export default App
