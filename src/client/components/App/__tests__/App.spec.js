//import test from 'ava';
//import sinon from 'sinon';

import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';

import { App } from '../App';
import styles from '../App.css';
import { toggleAddPost } from '../AppActions';

let { describe, it, expect } = global;

describe('App Component', () => {
  const children = <h1>Test</h1>;
  const dispatch = jest.fn();
  const props = {
    children,
    dispatch,
  };

  it('renders properly', (done) => {
    const wrapper = shallow(
      <App {...props} />
    );
  
    expect(wrapper.find('Helmet').length).toEqual(1);
    expect(wrapper.find('Header').length).toEqual(1);
    expect(wrapper.find('Footer').length).toEqual(1);
    expect(wrapper.find('Header').prop('toggleAddPost')).toBe(wrapper.instance().toggleAddPostSection);
    expect(wrapper.find('Header + div').hasClass(styles.container)).toBeTruthy();
    expect(wrapper.find('Header + div').children()).toBe(children);
  });

});


/*it('calls componentDidMount', t => {
  sinon.spy(App.prototype, 'componentDidMount');
  mount(
    <App {...props} />,
    {
      context: {
        router: {
          isActive: sinon.stub().returns(true),
          push: sinon.stub(),
          replace: sinon.stub(),
          go: sinon.stub(),
          goBack: sinon.stub(),
          goForward: sinon.stub(),
          setRouteLeaveHook: sinon.stub(),
          createHref: sinon.stub(),
        },
      },
      childContextTypes: {
        router: PropTypes.object,
      },
    },
  );

  t.truthy(App.prototype.componentDidMount.calledOnce);
  App.prototype.componentDidMount.restore();
});

test('calling toggleAddPostSection dispatches toggleAddPost', t => {
  const wrapper = shallow(
    <App {...props} />
  );

  wrapper.instance().toggleAddPostSection();
  t.truthy(dispatch.calledOnce);
  t.truthy(dispatch.calledWith(toggleAddPost()));
});
*/