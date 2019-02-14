import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './../components/App';
import * as api from '../api';


test('it changes page on stateChange', ()=> {
    const app = shallow(<App />)
    app.setState({currentPage:'home'})
    app.instance().changePage()
    expect(app.state().currentPage).toBe('bot')
    app.setState({ currentPage: 'bot' })
    app.instance().changePage()
    expect(app.state().currentPage).toBe('home')
});

// same but with button onclick
test('if state home it changes page onclick to state bot and from bot - home', ()=>{
    const wrapper = shallow(<App />)
    expect(wrapper.state('currentPage')).toBe('home')
    expect(wrapper.find('Button')).toHaveLength(1)
    wrapper.find('Button').simulate('click')
    expect(wrapper.state().currentPage).toBe('bot')
    wrapper.find('Button').simulate('click')
    expect(wrapper.state().currentPage).toBe('home')
})

test('change persona', () =>{
    const fakeChange = jest.fn()
    const wrapper= mount(<App changePersona={fakeChange} currentPersona='Zac'/>)
    expect(wrapper.find('select')).toHaveLength(1)
    wrapper.find('select').simulate('change', {target:{value:'Morgana'}})
    expect(wrapper.state('currentPersona')).toMatch('Morgana')
    wrapper.find('select').simulate('change', {target:{value:'Esmeralda'}})
    expect(wrapper.state('currentPersona')).toMatch('Esmeralda')
})
