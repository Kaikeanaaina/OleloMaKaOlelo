import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import WordGroupCard from '../WordGroupCard'
import Root from '../../../Root'
import * as types from '../../../actions/types'
import * as actions from '../../../actions/index'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

let wrappedMount;
let wrapper;

beforeEach(() => {
    wrappedMount = mount(
        <Root>
            <WordGroupCard />
        </Root>
    )
    wrapper = shallow(
        <Root>
            <WordGroupCard />)
        </Root>
    )
})

afterEach(() => {
    wrappedMount.unmount()
})


describe('<WordGroupCard />', () => {
    it('should exist', () => {

        expect(wrappedMount.find(WordGroupCard).length).toEqual(1)
    })

    it('should call componentDidMount', () => {
        console.log(wrappedMount.debug())
    })



})
