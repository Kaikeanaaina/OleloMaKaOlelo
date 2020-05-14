import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { fetchHuaolelo } from '../../../actions'
 
import WordGroupCard from '../WordGroupCard';
import createMockStore from 'redux-mock-store';
 
let store;
let component;
 
beforeEach(() => {

});

describe('My Connected React-Redux Component', () => {
 
  it('renders', () => {
    const store = createMockStore()
    store.dispatch(fetchHuaolelo())

    const root = mount(<WordGroupCard unuhi='test sample' store={store} />)

    expect(root.find('span')[1]).toEqual('test sample')
  });
 
  it('should dispatch an action on button click', () => {

  });
});