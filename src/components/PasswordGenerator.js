import React, { useState, useEffect } from 'react';
import { numbers, upperCaseLetters, lowerCaseLetters, symbols, nonASCII } from './Characters'
import { toast, ToastContainer } from 'react-toastify'
import { ONE_OPTION, NOTHING_TO_COPY, COPY_SUCCESS } from './Messages';
import 'react-toastify/dist/ReactToastify.css';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import ReactTooltip from 'react-tooltip';



export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [includeNonASCII, setIncludeNonASCII] = useState(true)
  const [generateSpin, setGenerateSpin] = useState(false)
  const [radio, setRadio] = useState('all-characters')

  useEffect(() => {
    handleGeneratePassword();
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols, includeNonASCII, radio]) // eslint-disable-line react-hooks/exhaustive-deps


  const handleGeneratePassword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols &&
      !includeNonASCII
    ) {
      notify('error', ONE_OPTION)
    }
    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + numbers
    }

    if (includeSymbols) {
      characterList = characterList + symbols
    }

    if (includeNonASCII) {
      characterList = characterList + nonASCII
    }

    setPassword(createPassword(characterList))
  }

  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 1; i <= passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }

    if (radio === 'easy-to-read') {
      const characterIndex = Math.round(Math.random() * characterListLength)
      let newPass = password.replace(/[Il1|0O|]+/g, characterList.charAt(characterIndex))
      return newPass
    } else {
      return password
    }
  }

  const animate = () => {
    setGenerateSpin(true);
    setTimeout(() => setGenerateSpin(false), 400);
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('error', NOTHING_TO_COPY)
    } else {
      copyToClipboard()
      notify('success', COPY_SUCCESS)
    }
  }

  const notify = (type, message) => {
    if (type === 'error') {
      toast.error(message)
    }
    if (type === 'success') {
      toast.success(message)
    }
  }

  return (
    <div>
      <div className="page-password-generator">
        <section className="intro ">
          <div className="basic-hero"></div>
          <span className="eyebrow">PASSWORD GENERATOR TOOL</span>

          <h1>Generate a secure password</h1>
          <div className="intro__copy">
            <h4>
              Use this online password generator to instantly create a secure, random password.
            </h4>
          </div>
        </section>
        <div className="pg ">
          <div className="pg-generated-password" data-module="passwordGenerator">
            <form id="GENERATED-PASSWORD-FORM">
              <input
                id="GENERATED-PASSWORD"
                spellCheck='false'
                className="pg-generated-password__input"
                type="text"
                value={password}
                onChange={e => { setPassword(e.target.value); }}
              />
            </form>
            <div className="pg-generated-password__icon-wrapper">
              <button
                onClick={handleCopyPassword}
                className="pg-generated-password__icon pg-generated-password__icon-copy"
                data-tip='Copy'
              >

              </button>
              <button
                onClick={() => { handleGeneratePassword(); animate(); }}
                className={`pg-generated-password__icon pg-generated-password__icon-generate ${generateSpin ? `generate-spin` : null}`}
                data-tip='Generate'
              >
              </button>
            </div>
            <div className="pg-generated-password__strength-wrapper">
              <PasswordStrengthMeter password={password} />
            </div>


          </div>
          <form id="PG-FORM" className="pg-settings">
            <h3 className="pg-settings__title">Customize your password</h3>
            <div className="custom-range__wrapper">
              <label className="custom-range__label" htmlFor="pg-password-length">
                Password Length
              </label>
              <div className="custom-range__inner">
                <input
                  value={passwordLength}
                  onChange={e => { setPasswordLength(e.target.value); }}
                  className="custom-range__number"
                  step="1"
                  id="pg-password-length"
                  type="number"
                  min="0"
                  max="32" />
                <div className='custom-range'>
                  <input
                    type='range'
                    min='0'
                    max='32'
                    className='range-input'
                    value={passwordLength}
                    onChange={e => { setPasswordLength(e.target.value); }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="pg-settings__radio-wrap">
                <div className="radio">
                  <input
                    className="radio__input"
                    id="pg-easy-to-say"
                    name="encryption-style"
                    type="radio"
                    value="easy-to-say"
                    checked={radio === 'easy-to-say'}
                    onChange={e => { setRadio(e.target.value); setIncludeLowercase(true); setIncludeUppercase(true); setIncludeNumbers(false); setIncludeSymbols(false); setIncludeNonASCII(false) }}
                  />
                  <label className="radio__label" htmlFor="pg-easy-to-say">
                    Easy to say
                  </label>
                  <div
                    className="icon__info"
                    data-tip='Avoid numbers and special characters'
                  >
                  </div>
                </div>
                <div className="radio">
                  <input
                    className="radio__input"
                    id="pg-easy-to-read"
                    name="encryption-style"
                    type="radio"
                    value="easy-to-read"
                    checked={radio === 'easy-to-read'}
                    onChange={e => { setRadio(e.target.value); setIncludeLowercase(true); setIncludeUppercase(true); setIncludeNumbers(false); setIncludeSymbols(false); setIncludeNonASCII(false) }}
                  />
                  <label className="radio__label" htmlFor="pg-easy-to-read">
                    Easy to read
                  </label>
                  <div
                    className="icon__info"
                    data-tip='Avoid ambiguous characters such as I, l, 1, |, O, and 0'
                  >
                  </div>

                </div>
                <div className="radio">
                  <input
                    className="radio__input"
                    id="pg-all-characters"
                    name="encryption-style"
                    type="radio"
                    value="all-characters"
                    checked={radio === 'all-characters'}
                    onChange={e => { setRadio(e.target.value); setIncludeUppercase(true); setIncludeUppercase(true); setIncludeNumbers(true); setIncludeSymbols(true); setIncludeNonASCII(true) }}
                  />
                  <label className="radio__label" htmlFor="pg-all-characters">
                    All characters
                  </label>
                  <div
                    className="icon__info"
                    data-tip='Any character combination'
                  >
                  </div>
                </div>
              </div>
              <div className="pg-settings__checkbox-wrap">
                <div className="checkbox">
                  <input
                    className="checkbox__input"
                    id="pg-uppercase"
                    type="checkbox"
                    name="uppercase"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                  />
                  <label className="checkbox__label" htmlFor="pg-uppercase">
                    Uppercase
                  </label>
                </div>
                <div className="checkbox">
                  <input
                    className="checkbox__input"
                    id="pg-lowercase"
                    type="checkbox"
                    name="lowercase"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                  />
                  <label className="checkbox__label" htmlFor="pg-lowercase">
                    Lowercase
                  </label>
                </div>
                <div className="checkbox">
                  <input
                    className="checkbox__input"
                    id="pg-numbers"
                    type="checkbox"
                    name="numbers"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    disabled={radio === 'easy-to-say'}
                  />
                  <label className="checkbox__label" htmlFor="pg-numbers">
                    Numbers
                  </label>
                </div>
                <div className="checkbox">
                  <input
                    className="checkbox__input"
                    id="pg-symbols"
                    type="checkbox"
                    name="symbols"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    disabled={radio === 'easy-to-say'}
                  />
                  <label className="checkbox__label" htmlFor="pg-symbols">
                    Symbols
                  </label>
                </div>
                <div className="checkbox">
                  <input
                    className="checkbox__input"
                    id="pg-nonASCII"
                    type="checkbox"
                    name="nonASCII"
                    checked={includeNonASCII}
                    onChange={(e) => setIncludeNonASCII(e.target.checked)}
                    disabled={radio === 'easy-to-say'}
                  />
                  <label className="checkbox__label" htmlFor="pg-nonASCII">
                    Non ASCII
                  </label>
                </div>
              </div>
            </div>
          </form>
          <div className="pg-copy-password">
            <button
              className="pg-copy-password__button button button__red button__jumbo"
              onClick={handleCopyPassword} >
              Copy Password
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position='bottom-center'
        bodyClassName="toast-font-size-15"
        theme="dark"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />

      <ReactTooltip
        place="right"
        type="light"
        effect="solid"
        className="pg-tooltip-content"
        arrowColor="transparent"
        globalEventOff="click"
      />
    </div >
  );
}