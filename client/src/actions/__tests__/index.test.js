import {fetchUser} from '../'
import { FETCH_USER } from '../types'

describe('actions', () => {
    describe('fetchUser', () => {
        it('should have the correct type', () => {
            const action = fetchUser();

            expect(action.type).toEqual(FETCH_USER)
        })
        
    })
    
})