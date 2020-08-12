import React from 'react';
import './AuthInput.scss';
import {
  User,
  Lock,
  Mail,
  BookOpen,
  Clipboard,
  Calendar,
  Phone,
  Hash,
  Home,
  MapPin,
  Navigation,
  AlignLeft,
  Activity,
  AlertCircle,
  ToggleRight,
  CreditCard,
  FileText,
  Briefcase,
  MessageCircle,
  Map,
  CheckCircle,
  XCircle,
  Upload,
} from 'react-feather';

const AuthInput = ({
  placeholder,
  onValueChange,
  type,
  icon,
  value,
  isDate,
  max,
  min,
  pattern,
  minLength,
  maxLength,
  isMobile,
  onKeyUp,
  validationIcon,
  onKeyPress,
  onInput,
  id,
  accept,
  dataCypress,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'username':
        return <User color="#212429" size={14} />;
      case 'password':
        return <Lock color="#212429" size={14} />;
      case 'email':
        return <Mail color="#212429" size={14} />;
      case 'education':
        return <BookOpen color="#212429" size={14} />;
      case 'clipboard':
        return <Clipboard color="#212429" size={14} />;
      case 'calendar':
        return <Calendar color="#212429" size={14} />;
      case 'phone':
        return <Phone color="#212429" size={14} />;
      case 'hash':
        return <Hash color="#212429" size={14} />;
      case 'home':
        return <Home color="#212429" size={14} />;
      case 'mapPin':
        return <MapPin color="#212429" size={14} />;
      case 'navArrow':
        return <Navigation color="#212429" size={14} />;
      case 'textArea':
        return <AlignLeft color="#212429" size={14} />;
      case 'condition':
        return <Activity color="#212429" size={14} />;
      case 'alertCircle':
        return <AlertCircle color="#212429" size={14} />;
      case 'medication':
        return <ToggleRight color="#212429" size={14} />;
      case 'licence':
        return <CreditCard color="#212429" size={14} />;
      case 'fileText':
        return <FileText color="#212429" size={14} />;
      case 'briefcase':
        return <Briefcase color="#212429" size={14} />;
      case 'language':
        return <MessageCircle color="#212429" size={14} />;
      case 'postcode':
        return <Map color="#212429" size={14} />;
      case 'upload':
        return <Upload color="#212429" size={14} />;
      default:
        return '';
    }
  };

  const getValidationIcon = () => {
    switch (validationIcon) {
      case 'success':
        return <CheckCircle color="#28cc28" size={14} />;
      case 'error':
        return <XCircle color="#ff3f3f" size={14} />;
      default:
        return null;
    }
  };
  return (
    <div
      className={`auth-input-wrapper ${isDate ? 'auth-date' : ''} ${
        isMobile ? 'auth-mobile' : ''
      } `}
    >
      <label className={value ? 'active' : null} htmlFor={placeholder}>
        {placeholder}
      </label>
      <i>{getIcon()}</i>
      <input
        type={type}
        name={placeholder}
        value={value}
        autoComplete="off"
        required
        onChange={onValueChange}
        max={max}
        min={min}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        onKeyUp={onKeyUp}
        checked={value && true}
        onKeyPress={onKeyPress}
        onInput={onInput}
        id={id}
        accept={accept}
        data-cy={dataCypress}
      />
      <i className="icon-validation">{getValidationIcon()}</i>
    </div>
  );
};

export default AuthInput;
