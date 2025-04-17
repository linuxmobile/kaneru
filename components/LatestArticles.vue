<script setup lang="ts">
import { useFormatTime } from '~/composables/useFormatTime'

const articles = ref(null)
const total = ref(null)

onMounted(async () => {
  const [latestResult, totalResult] = await Promise.all([
    queryCollection('blog')
      .order('date', 'DESC')
      .limit(6)
      .all(),
    queryCollection('blog')
      .order('date', 'DESC')
      .all()
  ])

  articles.value = latestResult
  total.value = totalResult
})

const getArticleNumber = (index: number): string => {
  const totalCount = total.value?.length || 0
  const articleNumber = totalCount - index
  return String(articleNumber).padStart(1, '0')
}

const { formatTimeAgo } = useFormatTime()
</script>

<template>
  <section v-if="articles" class="w-full flex flex-col gap-y-2">
    <div class="flex items-center justify-center w-full gap-x-12 pb-12">
      <div class="relative bg-jp-blue dark:bg-jp-purple px-2 py-1 whitespace-nowrap">
        <p class="font-jp text-2xl text-jp-white dark:text-jp-purple mix-blend-difference absolute bottom-5 left-0">
          最新の記事</p>
        <h3 class="font-bold text-jp-white dark:text-jp-dark-primary">Latest</h3>
      </div>
      <div class="flex-1 bg-jp-dark-secondary dark:bg-jp-dark-secondary h-0.3"></div>
    </div>
    <article v-for="(article, index) in articles" :key="article.path" class="text-sm">
      <NuxtLink :to="article.path" class="flex items-start justify-start gap-x-3 w-full">
        <p class="text-gray-300 dark:text-gray-700">#0<span class="text-jp-blue dark:text-jp-purple">{{
          getArticleNumber(index) }}</span>
        </p>
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
          <h2 class="truncate max-w-lg">{{ article.title }}</h2>
          <p class="text-sm">{{ formatTimeAgo(new Date(article.date)) }}</p>
        </div>
      </NuxtLink>
    </article>
    <NuxtLink to="/blog"
      class="self-end mt-8 px-4 py-2 border-1 border-jp-blue dark:border-jp-purple text-sm hover:bg-jp-blue dark:hover:bg-jp-purple hover:text-white transition-colors">
      All Articles
    </NuxtLink>
  </section>
</template>
