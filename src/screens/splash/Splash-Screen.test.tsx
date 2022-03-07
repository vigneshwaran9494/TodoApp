import React from 'react';
import {cleanup, render} from '@testing-library/react-native';

import SplashScreen from './Splash-screen';

afterAll(cleanup);

describe('SplashScreen', () => {
  //Should render logo
  it('should render app logo', () => {
    const logoTestIdName = 'logoTestText';
    const {getByTestId} = render(<SplashScreen />);
    const foundLogo = getByTestId(logoTestIdName);
    expect(foundLogo).toBeTruthy();
  });

  //should show app version
  it('should show version', () => {
    const versionText = 'Version 1.0';
    const {toJSON, getByText} = render(<SplashScreen />);
    const foundVersionText = getByText(versionText);
    expect(foundVersionText.props.children).toEqual(versionText);
    expect(toJSON()).toMatchSnapshot();
  });
});
