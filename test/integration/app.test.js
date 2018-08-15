/**
 * integration test
 */

import React from 'react';
import { mount } from 'enzyme';
import LockScreen from '../../src/components/LockScreen';
import ClockDisplay from '../../src/components/ClockDisplay';
import TopOverlay from '../../src/components/TopOverlay';

let wrapper = null;
let props = {
  wallpaperPath: "",
  userInfoMessage: "front test demo",
  onUnlocked: () => alert("unlocked!")
};

function getWrapper() {
  if (wrapper) {
    return wrapper;
  }
  return mount(<LockScreen {...props} />);
}

describe('lock screen app', () => {
  beforeEach(() => {
    wrapper = getWrapper();
  });
  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('show current time', () => {
    const clockDisplay = wrapper.find(ClockDisplay);
    const time = clockDisplay.find('div').first();
    const now = new Date();
    const current = now.toTimeString().slice(0, 8)
    expect(time.text()).toEqual(current);
  });

  it('show top overlay', () => {
    const topOverlay = wrapper.find(TopOverlay);
    const msg = topOverlay.find('div').first();
    expect(msg.text()).toEqual(props.userInfoMessage);
  });

  it('slide to unlock', () => {

  });
})
