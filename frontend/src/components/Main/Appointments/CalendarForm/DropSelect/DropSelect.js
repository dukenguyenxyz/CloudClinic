import React, { useState, useEffect } from 'react';
import { motion, useCycle } from 'framer-motion';
import styled from 'styled-components';
import Icon from './Icon';

const DropSelect = ({
  doctorList,
  handleSelect,
  setClientFormState,
  clientFormState,
  setSelectedDoctor,
  setUnavailabilities,
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [pull, cyclePull] = useCycle({ translateX: 61 }, { translateX: 16 });

  useEffect(() => {
    if (clientFormState.doctor) {
      cyclePull();
    }
  }, [clientFormState.doctor]);

  useEffect(() => {
    const searchDoctorResults = doctorList.filter(doctor => {
      const doctorName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
      return doctorName.includes(searchValue.toLowerCase());
    });
    setSearchResults(searchDoctorResults);
  }, [searchValue]);

  const handleOpen = e => {
    if (e.currentTarget.dataset.tag === undefined) setOpen(!open);
  };

  const hanldeRemoveDoctor = e => {
    e.stopPropagation();
    setClientFormState({
      ...clientFormState,
      doctor: '',
    });
    setSelectedDoctor({});
    setUnavailabilities([]);
    setSearchValue('');
    cyclePull();
  };

  const handleInputChange = e => {
    if (!open) {
      setOpen(!open);
      setSearchValue(e.currentTarget.value);
    } else {
      setSearchValue(e.currentTarget.value);
    }
  };

  const handleKeyDown = e => {
    if (e.keyCode === 8) {
      setClientFormState({
        ...clientFormState,
        doctor: '',
      });
      cyclePull();
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
          >
            <Input
              placeholder="Select a doctor"
              value={searchValue || clientFormState.doctor}
              onChange={e => handleInputChange(e)}
              tabIndex={2}
              onKeyDown={e => handleKeyDown(e)}
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
                onClick={e => {
                  handleSelect(e, doctor);
                  setSearchValue('');
                  setOpen(!open);
                }}
                tabIndex={index + 3}
              >
                <div>
                  <img src={doctor.profileImage} alt="" />
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

const DropSelectWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const Select = styled.div`
  border: 1px solid #dde2e5;
  border-radius: 4px;
  height: ${props => (props.isOpen ? '24rem' : '3rem')};
  transition: height 0.5s ease-in-out;
  overflow: scroll;
  background: #ffffff;
  cursor: pointer;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin-bottom: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LabelContainer = styled.div`
  position: absolute;
  display: flex;
  height: 2.9rem;
  align-items: center;
  justify-content: space-between;
  width: 99.6%;
  padding: 0 16px;
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
  width: inherit;
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
      color: #dde2e5;
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
  background: #dde2e5;
  margin: 0 0.25rem;
`;

const Chevron = styled.div`
  transition: transform 0.2s ease-in-out;
  transform-origin: center;
  transform: ${props =>
    props.isOpen
      ? 'translateY(-4px) rotate(-180deg)'
      : 'translateY(4px) rotate(0deg)'};
`;

const OptionsContainer = styled.ul`
  margin-top: 48px;
`;

const Option = styled.li`
  display: flex;
  padding: 1rem;
  font-size: 14px;
  border-bottom: 1px solid #dde2e5;
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
