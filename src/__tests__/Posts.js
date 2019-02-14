import React from 'react';
import * as api from '../api';
import { render, shallow, mount} from 'enzyme';
import Posts from '../components/Posts.js';
import CreateNewPost from './../components/CreateNewPost.js'
import fakePosts from './../fakePosts.js'

beforeEach(() =>{
  localStorage.clear();
});

afterEach(() =>{
  localStorage.clear();
});

test('renders posts', () => {
  const post = api.createPostObject('En liten titel', 'med content', 'Zac')
  api.storePostObject([post])
  const wrapper = mount(<Posts currentPersona='Esmeralda'/>);
  expect(wrapper.find('article')).toHaveLength(1)
});

test('sets posts from localStorage', ()=>{
  const post = api.createPostObject('En titel', 'Lite content', 'Zac')

  api.storePostObject([post])
  const wrapper = mount(<Posts currentPersona='Zac'/>)
  expect(wrapper.state().posts).toMatchObject([{title:'En titel'}])
})

test('create new post', () => {
const fakeUpdate = jest.fn()
const {id, author } = fakePosts.data[0];
const wrapper = mount(
  <Posts currentPersona={author} >
    <CreateNewPost author={author} updatePosts={fakeUpdate}/>
  </Posts>
)
expect(wrapper.find('#title')).toHaveLength(1)
wrapper.find('#title').simulate('change', { target: { name:'title', value:'A beautiful title'}})
expect(wrapper.find('#content').simulate('change', { target: { name:'content', value:'This is the content'}}))
expect(wrapper.find('form')).toHaveLength(1)
wrapper.find('form').simulate('submit')
console.log(wrapper.state('posts'))
expect(wrapper.state('posts')).toMatchObject([{ title: 'A beautiful title', content:'This is the content'}] )
})



test('it removes a post', ()=>{
  const fakeRemove = jest.fn()
  const post = api.createPostObject('En titel', 'Lite content', 'Zac')
  api.storePostObject([post])

  const wrapper = mount(<Posts currentPersona='Zac' key={post.id} onClick={fakeRemove}/>)
  expect(wrapper.find('Button')).toHaveLength(1)

  console.log(wrapper.state('posts'))
  expect(wrapper.state('posts')).toMatchObject([{title:'En titel'}])
  expect(wrapper.state('posts')).toHaveLength(1)

  wrapper.find('Button').simulate('click')

  const posts = api.fetchAllPosts()
  const thePosts = wrapper.state('posts')
  console.log(thePosts)
  expect(thePosts).not.toMatchObject([{title:'En titel'}]);
    expect(wrapper.state('posts')).toHaveLength(0)

})
