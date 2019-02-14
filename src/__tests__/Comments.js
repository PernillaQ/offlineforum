import React from 'react';
import * as api from '../api';
import { shallow, mount } from 'enzyme';
import Comments from './../components/Comments.js';
import CreateNewComment from './../components/CreateNewComment.js'
import SingleComment from './../components/SingleComment.js'
import fakePosts from './../fakePosts.js'

beforeEach(() => {
  localStorage.clear();
});

afterEach(()=> {
  localStorage.clear();
})

test('create new comment', () => {
    const fakeUpdate = jest.fn()
    const {id, author } = fakePosts.data[0];
    const wrapper = mount(
    <Comments currentPersona={author} postId={id} updateComments={fakeUpdate}/ >
    )
    expect(wrapper.find('#comment')).toHaveLength(1)
    wrapper.find('#comment').simulate('change', { target: { name:'comment', value:'A brand new comment!'}})
    expect(wrapper.find('form')).toHaveLength(1)
    wrapper.find('form').simulate('submit')
    console.log(wrapper.state('comments'))
    expect(wrapper.state('comments')).toMatchObject([{ comment: 'A brand new comment!'}] )
})

test('it removes a comment', () => {
    const fakeUpdate = jest.fn()
    const {id} = fakePosts.data[0];
    const fakeComment = [
    {
    id:'123',
    comment:'fantastic',
    author:'Esmeralda',
    postId:id,
    date:'2019-2-13 21:46:05'
  },
  ]
    localStorage.setItem('comments', JSON.stringify(fakeComment))
    const wrapper = shallow(<Comments currentPersona={'Esmeralda'} postId={id} updateComments={fakeUpdate} />
  )
    console.log(wrapper.state('comments'))
    expect(wrapper.state('comments')).toMatchObject([{ comment: 'fantastic'}] )
    wrapper.instance().removeComment(fakeComment[0].id)

    const theComments= wrapper.state('comments')
    console.log(theComments)
    expect(theComments).not.toMatchObject([{ comment: 'fantastic'}] )
    expect(theComments).toHaveLength(0)
})
