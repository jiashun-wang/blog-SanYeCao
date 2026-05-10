import rss from '@astrojs/rss';
import { pagesGlobToRssItems } from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection("blog");

    return rss({
        title: "Jiashun Wang's Blog",
        description: "Thoughts, tutorials, and projects by Jiashun Wang.",
        site: context.site,
        items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
        items: posts.map((post) => {
            const [postLang, ...slugParts] = post.id.split("/");
            const slug = slugParts.join("/");

            return ({
                title: post.data.title,
                pubDate: post.data.pubDate,
                description: post.data.description,
                link: `/${postLang}/posts/${slug}/`,
            })
        }),
        customData: `<language>en-us</language>`,
    })
}