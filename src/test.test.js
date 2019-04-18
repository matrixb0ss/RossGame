import React from 'react';
import { shallow } from 'enzyme';
import Main from './index';

describe('Main', () => {
  it('should render correctly', () => {
    const component = shallow(<Main />);

    expect(component).toMatchSnapshot();
  });
});
