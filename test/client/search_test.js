/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

// import components
import Search from '../../src/components/common/Search';
// import App from '../../src/app';

describe('Search tests', () => {

  it('should render a form', done => {

    const wrapper = shallow(<Search />);
    expect(wrapper.find('form').length).to.equal(1);
    done();
  });

  it('should render an input', done => {

    const wrapper = shallow(<Search />);
    expect(wrapper.find('input').length).to.equal(1);
    done();
  });

});
