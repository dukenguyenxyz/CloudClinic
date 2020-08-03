import React from 'react';
import Card from '../../../Card/Card';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import sampleEvents from '../../Appointments/Samples/sampleEvents';

const localizer = momentLocalizer(moment);

const Upcoming = ({ user }) => {
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Availability</h2>
        </div>
        <div className="user-details-wrapper">
          <div className="user-info">
            <span>Openning Time </span>
            <span>
              {moment(user.doctorInfo.workSchedule.openningTime).format(
                'hh:mm a'
              )}
            </span>
          </div>
          <div className="user-info">
            <span>Closing Time </span>
            <span>
              {moment(user.doctorInfo.workSchedule.closingTime).format(
                'hh:mm a'
              )}
            </span>
          </div>
        </div>
        <Calendar
          events={sampleEvents}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
          defaultView="work_week"
          views={['work_week']}
          // min={
          //   user.doctorInfo.workSchedule.openningTime
          //     ? moment(user.doctorInfo.workSchedule.openningTime).toDate()
          //     : undefined
          // }
          // max={
          //   user.doctorInfo.workSchedule.closingTime
          //     ? moment(user.doctorInfo.workSchedule.closingTime).toDate()
          //     : undefined
          // }
          min={moment(user.doctorInfo.workSchedule.openningTime).toDate()}
          max={moment(user.doctorInfo.workSchedule.closingTime).toDate()}
        />
      </div>
    </Card>
  );
};

export default Upcoming;
