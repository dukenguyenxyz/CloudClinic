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
} from 'react-feather';

const AuthInput = ({
  placeholder,
  value,
  onChange,
  handleKeyPress,
  type,
  icon,
  minLength,
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
      default:
        return '';
    }
  };

  return (
    <div className="auth-input-wrapper">
      <label className={value ? 'active' : null} htmlFor={placeholder}>
        {placeholder}
      </label>
      <i>{getIcon()}</i>
      <input
        type={type}
        name={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={handleKeyPress}
        autoComplete="off"
        required
        minLength={minLength}
      />
    </div>
  );
};

export default AuthInput;
