import * as api from '../api';

beforeEach(() =>{
  localStorage.clear();
});

afterEach(() =>{
  localStorage.clear();
});

test('should get user from localStorage', () => {
    const persona = 'Steffe';
    api.storeCurrentPersona(persona);
    expect(api.fetchCurrentPersona()).toMatch(persona);
});

test('if theres no current persona, return Zac', () => {
    expect(api.fetchCurrentPersona()).toMatch('Zac');
})

test('should create a postobject', () =>{
    const obj = api.createPostObject('En titel', 'Lite content', 'Esmeralda')
    api.storePostObject(obj)
    const allPosts = api.fetchAllPosts()
    expect(allPosts).toMatchObject({title:'En titel'})
})

test('can set and fetch posts from localstorage, if no posts return empty array',() => {
    const thePosts = api.fetchAllPosts();
    expect(thePosts).toEqual(expect.arrayContaining([]))
    const newPost = api.createPostObject('Hello','content','Zac');
    api.storePostObject(newPost);
    const post = api.fetchAllPosts();
    expect(post).toMatchObject({title: "Hello"});
});

test('should create comment object', () => {
    const post = api.createPostObject('En titel', 'Lite content', 'Esmeralda')
    api.storePostObject(post)
    const commentsobj = api.createCommentObject('En fin kommentar', post.id, 'Zac')
    api.storeCommentObject(commentsobj)
    const commentsfetch = api.fetchAllComments()
    expect(commentsfetch).toMatchObject({comment:'En fin kommentar'})
})

test('if there´s no comments return empty array', ()=>{
    const theComments = api.fetchAllComments();
    expect(theComments).toEqual(expect.arrayContaining([]))
})

test('should remove a post', () => {
    const post = api.createPostObject('Titletitle', 'Mer content', 'Esmeralda')
    api.storePostObject([post]) //removePost expects posts as array to filter.
    api.removePost(post.id)
    const posts = api.fetchAllPosts()
    expect(posts).not.toMatchObject({title:'Titletitle'})
})

test('should remove comment', ()=> {
    const post = api.createPostObject('En titel', 'content', 'Esmeralda')
    api.storePostObject(post)
    const commentsobj = api.createCommentObject('En rolig kommentar', post.id, 'Zac')
    api.storeCommentObject([commentsobj])
    api.removeComment(post.id)
    const comments = api.fetchAllComments()
    expect(comments).not.toMatchObject({comments:'En rolig kommentar'})
})

test('it fetches Personas or returnes a empty array', () =>{
    const persons = api.fetchPersonas()
    console.log(persons)
    expect(persons).toEqual(expect.arrayContaining([]))
    const person = 'Alfie';
    localStorage.setItem('personas', person)
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return {personas:'Alfie'}
    })
    const personsAgain = api.fetchPersonas(JSON.parse)
    console.log(personsAgain)
    expect(personsAgain).toMatchObject({personas:'Alfie'})
})
