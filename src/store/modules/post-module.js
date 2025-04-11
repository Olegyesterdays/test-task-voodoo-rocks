import api from '@/services/api.js';

const state = () => ({
  posts: [],
  comments: []
});

const getters = {
  getAllPosts(state) {
    return state.posts;
  },

  getCommentsByPost: state => postId => {
    return state.comments.filter(comment => comment.postId === postId);
  }
};

const mutations = {
  setPosts(state, { posts }) {
    state.posts = posts;
  },

  setComments(state, { comments }) {
    state.comments = comments;
  }
};

const actions = {
  getPost({ commit }) {
    Promise.all([api.get('/posts'), api.get('/users')])
      .then(([postsResponse, usersResponse]) => {
        const posts = postsResponse.data;
        const users = usersResponse.data;

        // Создаем мапу пользователей по id
        const usersMap = new Map();
        users.forEach(user => usersMap.set(user.id, user));

        // Объединяем каждый пост с его пользователем
        const mergedPosts = posts.map(post => {
          return {
            ...post,
            user: usersMap.get(post.userId) || null
          };
        });

        commit('setPosts', { posts: mergedPosts });
      })
      .catch(e => console.error(e));
  },

  fetchComments({ commit }, postId) {
    api
      .get(`/comments?postId=${postId}`)
      .then(response => {
        commit('setComments', { comments: response.data });
      })
      .catch(e => console.error(e));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
