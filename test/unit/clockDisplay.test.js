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

  it('call componentDidMount once and set timer', () => {
    sinon.spy(ClockDisplay.prototype, 'componentDidMount');
    const instance = clockDisplay().instance();
    expect(ClockDisplay.prototype.componentDidMount.callCount).toEqual(1);
    expect(instance.updateInterval).toMatchObject({
      _repeat: 500
    });
  });

  it('call componentWillUnmount once and clear timer', () => {
    sinon.spy(ClockDisplay.prototype, 'componentWillUnmount');
    const instance = clockDisplay().instance();
    mountedClockDisplay.unmount();
    expect(ClockDisplay.prototype.componentWillUnmount.callCount).toEqual(1);
    expect(instance.updateInterval).toMatchObject({
      _repeat: null
    })
  });

  it('call setInterval with 500 ms', () => {
    jest.useFakeTimers();
    clockDisplay();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 500);
  });

})
