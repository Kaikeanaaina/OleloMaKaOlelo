//when writing code for test, this is what to brainstorm
// what tags rendering are you expecting?
// what props/states rendering are you expecting?

//integration tests than unit tests


// import React from 'react'
// import { mount } from 'enzyme'
// import Landing from '../components/Landing'

// //this is called a spread attributes
// //spread operator
// const props = { note: {text: 'text note'}}

// //console.log({...props})

// // ===============================
// const triplePrint= (a,b,c,) => {
//     //console.log(`${a} ${b} ${c}`)
// }
// const message =[ 'react', 'is', 'awesome']

// //an example why spread operators are helpful,
// // it could cleanly show everything in the array with more simple code
// triplePrint('react', 'is', 'awesome')
// triplePrint(message[0], message[1], message[2])
// triplePrint(...message)

// // =================================

// describe('Landing', () => {
//     let landing = mount(<Landing />)
//     //let landing = mount(<Landing {...props} />)

//     it ('rendered the Landing text', () => {
//       //console.log(landing.debug())
//       expect(landing.find('h1').text()).toEqual('Landing')

//     })
// })


//////////////////////////////////////////////

import React from 'react'
import { mount, shallow } from 'enzyme'
import App from '../App'
import Root from '../Root'
import Header from '../components/Header'
import Login from '../components/Login'

let wrapped;
let wrapper;

beforeEach(() => {
    wrapped = mount(
        <Root>
            <App />
        </Root>
    )

    wrapper = shallow(
        <Root>
            <App />
        </Root>
    )
    
})

//console.logs have to be within a it statement, or withing beforeEach/afterEach statements

afterEach(() => {
    wrapped.unmount();
});

//it('will confirm the fetchUser')

//it 'should bring a log a user in

describe('<App />', () => {
    it('should have app component', () => {
        expect(wrapper.find(App).length).toEqual(1)
    })
    
    it('should have a header component', () => {
        expect(wrapped.find(Header).length).toEqual(1)
    })

    //it 'should render Login Component

    //it 'should render Logout Component

    //it 'should render Landing, Dashboard, HuaoleloDashboard

    //it 'should render Page404
})
