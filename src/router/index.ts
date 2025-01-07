import MainLayout from '@/layout/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import Post from '@/views/Post.vue'
import ProfileView from '@/views/ProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'Login', component: LoginView },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'Home', component: HomeView },
        { path: '/post/:id', name: 'post', component: Post },
        {path: '/profile/:id', name:'profile', component: ProfileView}
      ],
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach((to, from, next) => {

  const isAuthenticated = localStorage.getItem('accessToken');

  if (to.meta.requiresAuth && !isAuthenticated) {

    next({ name: 'Login' });

  } else if (to.name === 'Login' && isAuthenticated) {

    next({ name: 'Home' });

  } else {

    next();
  }
});


export default router
