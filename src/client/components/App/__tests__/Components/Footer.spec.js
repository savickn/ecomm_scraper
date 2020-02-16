//import test from 'ava';

import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from '../../components/Footer/Footer';

let { it, expect } = global;

it('renders the footer properly', (done) => {
  const wrapper = shallow(
    <Footer />
  );

  expect(wrapper.find('p').length).toEqual(2);
  expect(wrapper.find('p').first().text()).toBe('© 2016 · Hashnode · LinearBytes Inc.');
});
