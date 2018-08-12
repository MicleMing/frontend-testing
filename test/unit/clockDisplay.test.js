import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import ClockDisplay from '../../src/components/ClockDisplay';

import { sleep } from '../shared';


describe('clock display', async () => {
  let props;
  let mountedClockDisplay;
  const clockDisplay = () => {
    if (!mountedClockDisplay) {
      mountedClockDisplay = mount(
        <ClockDisplay {...props} />
      )
    }
    return mountedClockDisplay;
  }

  afterEach(() => {
    if(mountedClockDisplay) {
      mountedClockDisplay.unmount();
      mountedClockDisplay = undefined;
    }
  })

  it('call componentDidMount once', () => {
    sinon.spy(ClockDisplay.prototype, 'componentDidMount');
    const mountedClockDisplay = clockDisplay();
    expect(ClockDisplay.prototype.componentDidMount.callCount).toEqual(1)
    // const time1 = mountedClockDisplay.state('now');
    // await sleep(1000);
    // const time2 = mountedClockDisplay.state('now')
    // expect(time1.getTime()).toEqual(time2.getTime());
  });

  it('call componentWillUnmount once', () => {
    sinon.spy(ClockDisplay.prototype, 'componentWillUnmount');
    const clockDisplayEntity = clockDisplay();
    clockDisplayEntity.unmount();
    expect(ClockDisplay.prototype.componentWillUnmount.callCount).toEqual(1)
  })

})
