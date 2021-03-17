/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/state-in-constructor */
import * as React from 'react';
import isEmailFn from './isEmail';
import './style.css';

class ReactMultiEmail extends React.Component {
  emailInputRef = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.propsEmails !== nextProps.emails) {
      return {
        propsEmails: nextProps.emails || [],
        emails: nextProps.emails || [],
        inputValue: '',
        focused: false
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      emails: [],
      inputValue: ''
    };

    this.emailInputRef = React.createRef();
  }

  findEmailAddress = (value, isEnter) => {
    const { validateEmail } = this.props;
    let validEmails = [];
    let inputValue = '';
    const re = /[ ,;]/g;
    const isEmail = validateEmail || isEmailFn;

    const addEmails = (email) => {
      const { emails } = this.state;
      for (let i = 0, l = emails.length; i < l; i++) {
        if (emails[i] === email) {
          return false;
        }
      }
      validEmails.push(email);
      return true;
    };

    if (value !== '') {
      if (re.test(value)) {
        let splitData = value.split(re).filter((n) => {
          return n !== '' && n !== undefined && n !== null;
        });

        const setArr = new Set(splitData);
        let arr = [...setArr];

        do {
          if (isEmail(`${arr[0]}`)) {
            addEmails(`${arr.shift()}`);
          } else {
            // eslint-disable-next-line no-lonely-if
            if (arr.length === 1) {
              inputValue = `${arr.shift()}`;
            } else {
              arr.shift();
            }
          }
        } while (arr.length);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (isEnter) {
          if (isEmail(value)) {
            addEmails(value);
          } else {
            inputValue = value;
          }
        } else {
          inputValue = value;
        }
      }
    }

    this.setState({
      // eslint-disable-next-line react/destructuring-assignment
      emails: [...this.state.emails, ...validEmails],
      inputValue
    });

    // eslint-disable-next-line react/destructuring-assignment
    if (validEmails.length && this.props.onChange) {
      this.props.onChange([...this.state.emails, ...validEmails]);
    }
  }

  onChangeInputValue = (value) => {
    this.findEmailAddress(value);
  }

  removeEmail = (index, isDisabled) => {
    if (isDisabled) {
      return;
    }
    this.setState(
      (prevState) => {
        return { emails: [...prevState.emails.slice(0, index), ...prevState.emails.slice(index + 1)] };
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.emails);
        }
      }
    );
  }

  handleOnKeydown = (e) => {
    switch (e.which) {
      case 13:
        // case 9:
        e.preventDefault();
        break;
      case 8:
        if (!e.currentTarget.value) {
          this.removeEmail(this.state.emails.length - 1, false);
        }
        break;
      default:
    }
  }

  handleOnKeyup = (e) => {
    switch (e.which) {
      case 13:
        // case 9:
        this.findEmailAddress(e.currentTarget.value, true);
        break;
      default:
    }
  }

  handleOnChange = (e) => this.onChangeInputValue(e.currentTarget.value)

  handleOnBlur = (e) => {
    this.setState({ focused: false });
    this.findEmailAddress(e.currentTarget.value, true);
  }

  handleOnFocus = () => this.setState({ focused: true });

  render() {
    const { focused, emails, inputValue } = this.state;
    const { style, getLabel, className = '', noClass, placeholder } = this.props;

    // removeEmail

    return (
      <div
        className={`${className} ${noClass ? '' : 'react-multi-email'} ${focused ? 'focused' : ''} ${inputValue === '' && emails.length === 0 ? 'empty' : ''}`}
        style={style}
        onClick={() => {
          if (this.emailInputRef.current) {
            this.emailInputRef.current.focus();
          }
        }}
      >
        {placeholder ? <span data-placeholder>{placeholder}</span> : null}
        {emails.map((email, index) => getLabel(email, index, this.removeEmail))}
        <input
          ref={this.emailInputRef}
          type="text"
          value={inputValue}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeydown}
          onKeyUp={this.handleOnKeyup}
        />
      </div>
    );
  }
}

export default ReactMultiEmail;
