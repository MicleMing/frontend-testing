import React from 'react';
import { mount } from 'enzyme';

import LockScreen from '../../src/components/LockScreen';
import ClockDisplay from '../../src/components/ClockDisplay';
import SlideToUnlock from '../../src/components/SlideToUnlock';
import TopOverlay from '../../src/components/TopOverlay';

describe('lock screen', () => {
  let props;
  let mountedLockScreen;
  const lockScreen = () => {
    if (!mountedLockScreen) {
      mountedLockScreen = mount(
        <LockScreen {...props} />
      );
    }
    return mountedLockScreen;
  }
  beforeEach(() => {
    props = {
      wallpaperPath: undefined,
      userInfoMessage: undefined,
      onUnlocked: undefined,
    };
    mountedLockScreen = undefined;
  });

  it('always renders a div', () => {
    const divs = lockScreen().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('The rendered div contains everything else that gets rendered', () => {
    const divs = lockScreen().find('div');
    const screen1 = divs.first();
    const screen2 = lockScreen().children();
    expect(screen1).toEqual(screen2);
  });

  it('always renders a `ClockDisplay`', () => {
    const clockDisplay = lockScreen().find(ClockDisplay);
    expect(clockDisplay.length).toEqual(1);
  });

  it('always renders a `SlideToUnlock`', () => {
    const slideToUnlock = lockScreen().find(SlideToUnlock);
    expect(slideToUnlock.length).toEqual(1);
  });

  describe('check `onUnlocked`', () => {
    it("sets the rendered `SlideToUnlock`'s `onSlide` prop to the same value as `onUnlocked`", () => {
      props.onUnlocked = jest.fn();
      const slideToUnlock = lockScreen().find(SlideToUnlock);
      expect(slideToUnlock.props().onSlide).toEqual(props.onUnlocked);
    });

    it("sets the rendered `SlideToUnlock`'s `onSlide` prop to undefined", () => {
      props.onUnlocked = undefined;
      const slideToUnlock = lockScreen().find(SlideToUnlock);
      expect(slideToUnlock.props().onSlide).toBeUndefined();
    })
  });

  describe('when `wallpaperPath` is passed', () => {
    beforeEach(() => {
      props.wallpaperPath = 'test.png';
    })

    it('applies that wallpaper as a background-image on the wrapping div', () => {
      const wrappingDiv = lockScreen().find('div').first();
      expect(wrappingDiv.props().style.backgroundImage).toBe(`url(${props.wallpaperPath})`);
    })
  })

  describe('when `userInfoMessage` is passed', () => {
    beforeEach(() => {
      props.userInfoMessage = 'This is my favorite phone!';
    });

    it('renders a `TopOverlay`', () => {
      expect(lockScreen().find(TopOverlay).length).toBe(1);
    });

    it('passes `userInfoMessage` to the rendered `TopOverlay` as `children`', () => {
      const topOverlay = lockScreen().find(TopOverlay);
      expect(topOverlay.props().children).toBe(props.userInfoMessage);
    });
  });

  describe('when `userInfoMessage` is undefined', () => {
    beforeEach(() => {
      props.userInfoMessage = undefined;
    });

    it('does not render a `TopOverlay`', () => {
      expect(lockScreen().find(TopOverlay).length).toBe(0);
    });
  });
})
