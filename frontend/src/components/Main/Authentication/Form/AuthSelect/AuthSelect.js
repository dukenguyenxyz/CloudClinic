import React from 'react';
import './AuthSelect.scss';
import {
  Heart,
  Users,
  Hash,
  User,
  Navigation,
  MessageCircle,
  UserPlus,
} from 'react-feather';
import { v4 as uuidv4 } from 'uuid';

const AuthSelect = ({
  placeholder,
  value,
  onValueChange,
  icon,
  options,
  directive,
  doctorList,
  isDate,
  dataCypress,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'heart':
        return <Heart color="#212429" size={14} />;
      case 'users':
        return <Users color="#212429" size={14} />;
      case 'username':
        return <User color="#212429" size={14} />;
      case 'hash':
        return <Hash color="#212429" size={14} />;
      case 'navArrow':
        return <Navigation color="#212429" size={14} />;
      case 'language':
        return <MessageCircle color="#212429" size={14} />;
      case 'userPlus':
        return <UserPlus color="#212429" size={14} />;
      default:
        return '';
    }
  };

  const getDirective = () => {
    switch (directive) {
      case 'blood':
        return 'Select your blood type';
      case 'allergy':
        return 'Rate the severity out of 5';
      case 'title':
        return 'Select title';
      case 'sex':
        return 'Select sex';
      case 'language':
        return 'Select languages spoken';
      case 'doctor':
        return 'Select a doctor';
      default:
        return 'Choose here';
    }
  };

  const makeSelectItem = item => {
    return (
      <option value={item} key={uuidv4()}>
        {item}
      </option>
    );
  };

  const selectDoctors = (item, id) => {
    return (
      <option value={item} key={id} id={id}>
        {item}
      </option>
    );
  };

  return (
    <div className={`auth-select-wrapper ${isDate ? 'auth-date' : ''}`}>
      {options && (
        <React.Fragment>
          <i>{getIcon()}</i>
          <label className={value ? 'active' : null} htmlFor={placeholder}>
            {placeholder}
          </label>
          <select
            name={placeholder}
            value={value}
            onChange={onValueChange}
            data-cy={dataCypress}
          >
            <option value="" defaultValue disabled hidden>
              {getDirective()}
            </option>
            {doctorList
              ? options.map(item =>
                  selectDoctors(
                    `Dr. ${item.firstName} ${item.lastName}`,
                    item._id
                  )
                )
              : options.map(makeSelectItem)}
          </select>
        </React.Fragment>
      )}
    </div>
  );
};

export default AuthSelect;
