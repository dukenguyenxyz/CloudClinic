import React, { useState, useEffect } from 'react';
import { motion, useCycle } from 'framer-motion';
import styled from 'styled-components';
import Icon from './Icon';

const DropSelect = ({ doctorList }) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [doctors] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [pull, cyclePull] = useCycle({ translateX: 61 }, { translateX: 16 });

  useEffect(() => {
    if (selectedDoctor) {
      cyclePull();
    }
  }, [selectedDoctor]);

  useEffect(() => {
    const searchDoctorResults = doctorList.filter(doctor => {
      const doctorName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
      return doctorName.includes(searchValue.toLowerCase());
    });
    setSearchResults(searchDoctorResults);
  }, [searchValue, doctors]);

  const selectDoctor = index => {
    setSelectedDoctor(
      `Dr. ${searchResults[index].firstName} ${searchResults[index].lastName}`
    );
    setOpen(!open);
  };

  const handleOpen = e => {
    if (e.currentTarget.dataset.tag === undefined) setOpen(!open);
  };

  const hanldeRemoveDoctor = e => {
    e.stopPropagation();
    setSelectedDoctor(null);
    setSearchValue('');
    cyclePull();
  };

  const handleKeyPress = (e, index) => {
    if (
      (e.keyCode === 8 || e.keyCode === 46) &&
      e.currentTarget.tabIndex === 1 &&
      !searchValue
    ) {
      setSearchValue(''); // reset search value
      setSelectedDoctor(null); // delete key to remove doctor
    }

    if ((e.keyCode === 8 || e.keyCode === 46) && searchValue) {
      setSelectedDoctor(null); // delete key to remove doctor
    }

    if (e.keyCode === 40 && e.currentTarget.tabIndex === 1) setOpen(!open); // open on down arrow
    if (e.keyCode === 38 && e.currentTarget.tabIndex === 1 && open === true)
      // close on up arrow
      setOpen(false);
    if (e.keyCode === 13 && open === true && typeof index === 'number') {
      selectDoctor(index);
      setTimeout(() => {
        setSearchValue('');
      }, 500);
    }

    if (e.keyCode === 27 && e.currentTarget.tabIndex > 1 && open === true) {
      // escape key to close dropdown
      setOpen(false);
    }
  };

  const handleInputChange = e => {
    if (!open) {
      setOpen(!open);
      setSearchValue(e.currentTarget.value);
    } else {
      setSearchValue(e.currentTarget.value);
    }
  };

  return (
    <div>
      <DropSelectWrapper>
        <Select isOpen={open}>
          <LabelContainer
            isOpen={open}
            id="select"
            onClick={e => handleOpen(e)}
            tabIndex={1}
            onKeyUp={e => handleKeyPress(e)}
          >
            <Input
              placeholder="Select a doctor"
              value={selectedDoctor ? selectedDoctor : searchValue}
              onChange={e => handleInputChange(e)}
              tabIndex={2}
            />
            <LabelControls
              animate={pull}
              transition={{ ease: 'easeInOut' }}
              initial={{ translateX: 61 }}
            >
              <LabelButton>
                <Chevron isOpen={open}>
                  <Icon name="ChevronDown" size={20} />
                </Chevron>
              </LabelButton>

              <Divider />
              <LabelButton
                data-tag="close"
                onClick={e => hanldeRemoveDoctor(e)}
              >
                <Icon name="X" size={16} data-tag="close" />
              </LabelButton>
            </LabelControls>
          </LabelContainer>
          <OptionsContainer>
            {searchResults.map((doctor, index) => (
              <Option
                key={doctor.id}
                onClick={() => selectDoctor(index)}
                tabIndex={index + 3}
                onKeyUp={e => handleKeyPress(e, index)}
              >
                <div>
                  <img src={doctor.img} alt="" />
                  <span>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</span>
                </div>
              </Option>
            ))}
          </OptionsContainer>
        </Select>
      </DropSelectWrapper>
    </div>
  );
};

const selectWidth = 300;
const padding = 16;
const labelContainerWidth = selectWidth - padding * 2;

const DropSelectWrapper = styled.div`
  position: relative;
`;

const Select = styled.div`
  border: 1px solid #cccccc;
  border-radius: 4px;
  height: ${props => (props.isOpen ? '24rem' : '3rem')};
  transition: height 0.5s ease-in-out;
  overflow: scroll;
  width: ${selectWidth + 'px'};
  background: #ffffff;
  cursor: pointer;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LabelContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${labelContainerWidth + 'px'};
  padding: ${'0' + ' ' + padding + 'px'};
  background-color: #fff;
  overflow: hidden;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: ${props => (props.isOpen ? '0' : '4px')};
  border-bottom-left-radius: ${props => (props.isOpen ? '0' : '4px')};
`;

const Input = styled.input`
  outline: none;
  border: none;
  ::placeholder {
    text-transform: uppercase;
    font-size: 12px;
  }
`;

const LabelControls = styled(motion.div)`
  display: flex;
  align-items: center;
  transform: translateX(16px);
  svg {
    transition: color 0.15s ease-in-out;
    &:hover {
      color: #cccccc;
    }
  }
`;

const LabelButton = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

const Divider = styled(motion.div)`
  height: 16px;
  width: 1px;
  background: #cccccc;
  margin: 0 0.25rem;
`;

const Chevron = styled.div`
  transition: transform 0.2s ease-in-out;
  transform-origin: center;
  transform: ${props =>
    props.isOpen
      ? 'translateY(-2px) rotate(-180deg)'
      : 'translateY(2px) rotate(0deg)'};
`;

const OptionsContainer = styled.ul`
  margin-top: 48px;
`;

const Option = styled.li`
  display: flex;
  padding: 1rem;
  font-size: 14px;
  border-bottom: 1px solid #cccccc;
  background: #ffffff;
  cursor: pointer;
  align-items: center;
  img {
    max-width: 24px;
    max-height: 24px;
    margin-right: 12px;
    border-radius: 50%;
  }
  div {
    display: flex;
    align-items: center;
  }
  &:hover {
    background-color: rgb(240, 240, 240);
  }
  &:last-child {
    border-bottom: none;
  }
`;

export default DropSelect;
