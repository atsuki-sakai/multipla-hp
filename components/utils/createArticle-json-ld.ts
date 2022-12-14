import { Blog } from "@service/micro-cms/type/Blog"

const createArticle_JSON_LD = (blog: Blog) => {
    return {__html: `
            {
                "name":"ArticleBlog",
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "${blog.title}",
                "datePublished": "${blog.updatedAt.split('T')[0]}",
                "dateModified": "${blog.updatedAt.split('T')[0]}",
                "image": "${blog.thumbnail.url.toString()}",
                "articleBody": "${blog.text.replace(/(<([^>]+)>)/gi, '')}",
                "publisher": {
                    "@type": "Organization",
                    "name": "Multipla",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://multipla-io.com/images/test-logo.png"
                    }
                },
                "author": {
                    "@type": "Person",
                    "name": "${blog.writer}",
                    "url": "https://multipla-io.com/about-us"
                }
            }
        `};
}

export default createArticle_JSON_LD