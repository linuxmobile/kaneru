<script setup lang="ts">
import { format } from 'date-fns'

definePageMeta({
  path: '/blog/:page(\\d+)?'
})

const route = useRoute()
const page = computed(() => {
  return route.params.page ? parseInt(route.params.page as string) : 1
})
const limit = 10

const { data: latestArticles } = await useAsyncData(`articles-page-${page.value}`, () =>
  queryCollection('blog')
    .skip(limit * (page.value - 1))
    .limit(limit)
    .order('date', 'DESC')
    .all()
)

const { data: allArticles } = await useAsyncData('all-articles', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
)

const totalArticles = computed(() => allArticles.value?.length || 0)
const totalPages = computed(() => Math.ceil(totalArticles.value / limit))

const formatDate = (date: string) => {
  return format(new Date(date), "do MMM yyyy")
}

const getArticleNumber = (index: number) => {
  const articleNumber = totalArticles.value - ((page.value - 1) * limit + index)
  return String(articleNumber).padStart(2, '0')
}
</script>

<template>
  <div class="flex flex-col gap-y-20 px-6 md:px-20 py-20">
    <div class="w-full flex items-start relative">
      <span
        class="absolute font-jp dark:text-jp-purple text-jp-white text-5xl -bottom-1 left-0 mix-blend-difference">ブログ</span>
      <h1 class="text-jp-blue dark:text-jp-purple font-alt text-9xl">Blog</h1>
    </div>

    <section class="w-full flex flex-col gap-y-8">
      <div class="flex items-center w-full gap-x-12 pb-12">
        <div class="relative bg-jp-blue dark:bg-jp-purple px-2 py-1">
          <p class="font-jp text-2xl text-jp-white dark:text-jp-purple mix-blend-difference absolute bottom-5 left-0">
            記事一覧</p>
          <h3 class="font-bold text-jp-white dark:text-jp-dark-primary">Articles</h3>
        </div>
        <div class="flex-1 bg-jp-dark-secondary dark:bg-jp-dark-secondary h-0.3"></div>
      </div>

      <div class="flex flex-col gap-y-6">
        <article v-for="(post, index) in latestArticles" :key="post.path"
          class="text-sm border-b-1 border-gray-800 pb-6 last:border-0">
          <NuxtLink :to="post.path" class="flex items-start justify-start gap-x-3 w-full">
            <p class="text-gray-300 dark:text-gray-700">#0<span class="text-jp-blue dark:text-jp-purple">{{
              getArticleNumber(index) }}</span></p>
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
              <h2 class="truncate max-w-lg">{{ post.title }}</h2>
              <p class="text-sm">{{ formatDate(post.date) }}</p>
            </div>
          </NuxtLink>
        </article>
      </div>

      <nav class="flex justify-center gap-x-4 mt-12">
        <NuxtLink :to="page > 2 ? `/blog/${page - 1}` : '/blog'"
          class="px-4 py-2 border-1 border-jp-blue dark:border-jp-purple text-sm transition-colors"
          :class="{ 'opacity-50 cursor-not-allowed': page === 1, 'hover:bg-jp-blue dark:hover:bg-jp-purple hover:text-white': page > 1 }"
          :tabindex="page === 1 ? -1 : 0"
          @click.prevent="page === 1 ? null : navigateTo(page > 2 ? `/blog/${page - 1}` : '/blog')">
          Previous
        </NuxtLink>
        <NuxtLink :to="`/blog/${page + 1}`"
          class="px-4 py-2 border-1 border-jp-blue dark:border-jp-purple text-sm transition-colors"
          :class="{ 'opacity-50 cursor-not-allowed': page >= totalPages, 'hover:bg-jp-blue dark:hover:bg-jp-purple hover:text-white': page < totalPages }"
          :tabindex="page >= totalPages ? -1 : 0"
          @click.prevent="page >= totalPages ? null : navigateTo(`/blog/${page + 1}`)">
          Next
        </NuxtLink>
      </nav>
    </section>
  </div>
</template>
