import React from 'react';
import { mount } from 'enzyme';
import Bot from './../components/Bot/Bot.js';
import * as api from '../api';

test('check message to bot ', ()=> {
    const fakeSubmit = jest.fn();
    const wrapper = mount(<Bot onSubmit={fakeSubmit}/>)
    expect(wrapper.find('[type="text"]')).toHaveLength(1)
    wrapper.find('[type="text"]').simulate('change', { target: { name:'userMessage', value:'hallo!'}})
    expect(wrapper.find('form')).toHaveLength(1)
    wrapper.find('form').simulate('submit')
    expect(wrapper.state('messages')).toEqual([{"bot": false, "message": "hallo!"}])
    expect(wrapper.state('typing')).toEqual(true)
})

test('should get a reply from bot on submit', (done) => {
    const wrapper = mount(<Bot />);
    const botMessage = { message: 'foo', bot: true };
    api.botReply = jest.fn(() => Promise.resolve(botMessage));
    const userMessage = { target: { name: 'userMessage', value: 'bar' } }
    const input = wrapper.find('input[type="text"]');
    const form = wrapper.find('form');
    input.simulate('change', userMessage)
    form.simulate('submit');

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.state('messages')).toHaveLength(2);
    done();
  });
});
