<template>
    <div class="container bg-body-tertiary ">
        <input type="text" v-model="searchQuery" placeholder="Search news..." @input="searchArticles" class="form-control my-3 p-2" style="width: 200px; padding: 0.375rem 0.75rem; font-size: 0.875rem;">

        <div v-if="isLoading" class="skeleton-loading">
            <div class="skeleton-item"></div>
            <div class="skeleton-item"></div>
            <div class="skeleton-item"></div>
            <div class="skeleton-item"></div>
        </div>

        <div v-else class="row ">
            <div class="col-md-6 news-item p-2">
                <div v-if="articles.length > 0" class="">
                    <div v-if="isArticleRead(articles[0])" class="read-article">
                        <img :src="articles[0].urlToImage" alt="Article Image" class="article-image">
                        <div class="article-details">
                            <h2>{{ articles[0].title }}</h2>
                            <a :href="articles[0].url" target="_blank"
                                @click.prevent="openArticleInNewTab(articles[0])">Read More</a>
                        </div>
                    </div>
                    <div v-else>
                        <img :src="articles[0].urlToImage" alt="Article Image" class="article-image">
                        <div class="article-meta">
                            <p><strong>Name:</strong> {{ articles[0].source.name }}</p>
                            <p><strong>Author:</strong> {{ articles[0].author }}</p>
                        </div>
                        <div class="article-details">
                            <h2>{{ articles[0].title }}</h2>
                            <p class="article-description">{{ articles[0].description }}</p>
                            <a :href="articles[0].url" target="_blank"
                                @click.prevent="openArticleInNewTab(articles[0])">Read More</a>
                            <div class="published-at">{{ formatPublishedAt(articles[0].publishedAt) }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="row">
                    <div v-for="(article, index) in articles.slice(1, 5)" :key="`${article.publishedAt}-${index}`"
                        class="col-md-6 news-item p-2">
                        <div v-if="isArticleRead(article)" class="read-article ">
                            <img :src="article.urlToImage" alt="Article Image" class="article-image">
                            <div class="article-details">
                                <h2>{{ article.title }}</h2>
                                <a :href="article.url" target="_blank"
                                    @click.prevent="openArticleInNewTab(article)">Read More</a>
                            </div>
                        </div>
                        <div v-else>
                            <div class="article-meta">
                                <img :src="article.urlToImage" alt="Article Image" class="article-image">
                                <p><strong>Name:</strong> {{ article.source.name }}</p>
                                <p><strong>Author:</strong> {{ article.author }}</p>
                            </div>
                            <div class="article-details">
                                <h2>{{ article.title }}</h2>
                                <p class="article-description">{{ article.description }}</p>
                                <a :href="article.url" target="_blank"
                                    @click.prevent="openArticleInNewTab(article)">Read More</a>
                                <div class="published-at">{{ formatPublishedAt(article.publishedAt) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="row">
                    <div v-for="(article, index) in articles.slice(1, 5)" :key="`${article.publishedAt}-${index}`"
                        class="col-md-6 news-item p-2">
                        <div v-if="isArticleRead(article)" class="read-article ">
                            <img :src="article.urlToImage" alt="Article Image" class="article-image">
                            <div class="article-details">
                                <h2>{{ article.title }}</h2>
                                <a :href="article.url" target="_blank"
                                    @click.prevent="openArticleInNewTab(article)">Read More</a>
                            </div>
                        </div>
                        <div v-else>
                            <div class="article-meta">
                                <img :src="article.urlToImage" alt="Article Image" class="article-image">
                                <p><strong>Name:</strong> {{ article.source.name }}</p>
                                <p><strong>Author:</strong> {{ article.author }}</p>
                            </div>
                            <div class="article-details">
                                <h2>{{ article.title }}</h2>
                                <p class="article-description">{{ article.description }}</p>
                                <a :href="article.url" target="_blank"
                                    @click.prevent="openArticleInNewTab(article)">Read More</a>
                                <div class="published-at">{{ formatPublishedAt(article.publishedAt) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 news-item p-2">
                <div v-if="articles.length > 0" class="">
                    <div v-if="isArticleRead(articles[0])" class="read-article">
                        <img :src="articles[0].urlToImage" alt="Article Image" class="article-image">
                        <div class="article-details">
                            <h2>{{ articles[0].title }}</h2>
                            <a :href="articles[0].url" target="_blank"
                                @click.prevent="openArticleInNewTab(articles[0])">Read More</a>
                        </div>
                    </div>
                    <div v-else>
                        <div class="article-meta">
                            <p><strong>Name:</strong> {{ articles[0].source.name }}</p>
                            <p><strong>Author:</strong> {{ articles[0].author }}</p>
                        </div>
                        <div class="article-details">
                            <h2>{{ articles[0].title }}</h2>
                            <p class="article-description">{{ articles[0].description }}</p>
                            <a :href="articles[0].url" target="_blank"
                                @click.prevent="openArticleInNewTab(articles[0])">Read More</a>
                            <div class="published-at">{{ formatPublishedAt(articles[0].publishedAt) }}</div>
                            <img :src="articles[0].urlToImage" alt="Article Image" class="article-image">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import '../assets/NewList.css';

export default {
    name: 'NewList',
    data() {
        return {
            articles: [],
            isLoading: true,
            searchQuery: '', 
            readArticles: [] 
        };
    },
    mounted() {
        this.fetchNews(); 
        this.loadReadArticles(); 
    },
    methods: {
        formatPublishedAt(dateString) {
            const options = { weekday: 'short', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        },
        fetchNews() {
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`;
            if (this.searchQuery) {
                url = `https://newsapi.org/v2/everything?q=${this.searchQuery}&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`;
            }

            axios.get(url)
                .then(response => {
                    this.articles = response.data.articles;
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    this.isLoading = false;
                });
        },
        searchArticles() {
            this.isLoading = true;
            this.fetchNews();
        },
        openArticleInNewTab(article) {
            this.markArticleAsRead(article);
            window.open(article.url, '_blank');
        },
        markArticleAsRead(article) {
            this.readArticles.push(article);
            this.saveReadArticles();
        },
        saveReadArticles() {
            localStorage.setItem('readArticles', JSON.stringify(this.readArticles));
        },
        loadReadArticles() {
            const storedArticles = localStorage.getItem('readArticles');
            if (storedArticles) {
                this.readArticles = JSON.parse(storedArticles);
            }
        },
        isArticleRead(article) {
            return this.readArticles.some(readArticle => readArticle.url === article.url);
        }
    }
};
</script>

<style scoped>

</style>