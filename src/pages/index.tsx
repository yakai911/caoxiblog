import { useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { NextRouter, withRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PostGrid, PostMasonry } from '../components/blog'
import Carousel from '../components/carousel/Carousel'
import Footer from '../components/common/Footer'
import { PopulatedCardBlog } from '../generated/graphql-request'
import { sdk } from '../generated/sdk'
import { ServerSideTranslations } from '../types'

interface IndexPageProps {
    router: NextRouter
    recent: PopulatedCardBlog[]
    trending: PopulatedCardBlog[]
    featured: PopulatedCardBlog[]
}

const Index: React.FC<IndexPageProps> = ({
    router,
    recent,
    trending,
    featured,
}) => {
    const titleText = `Home | ${process.env.NEXT_PUBLIC_APP_NAME}`
    const { t } = useTranslation('common')

    const head = useMemo(() => {
        return (
            <Head>
                <title>{titleText}</title>
                <meta
                    name="description"
                    content="Cruel Literature,novels,poemes,and else"
                />
                <link
                    rel="canonical"
                    href={`${process.env.NEXT_PUBLIC_DOMAIN}${router.pathname}`}
                />
                <meta
                    property="twitter:image"
                    content={`${process.env.NEXT_PUBLIC_DOMAIN}/images/recent.jpg`}
                />
                <meta
                    property="twitter:title"
                    content={`Cruel Literature,novels,poemes,and else | ${process.env.NEXT_PUBLIC_APP_NAME}`}
                />
                <meta
                    property="og:title"
                    content={`Cruel Literature,novels,poemes,and else | ${process.env.NEXT_PUBLIC_APP_NAME}`}
                />
                <meta
                    property="og:description"
                    content="Cruel Literature,novels,poemes,and else"
                />
                <meta property="og:type" content="webiste" />
                <meta
                    property="og:url"
                    content={`${process.env.NEXT_PUBLIC_DOMAIN}${router.pathname}`}
                />
                <meta
                    property="og:site_name"
                    content={`${process.env.NEXT_PUBLIC_APP_NAME}`}
                />

                <meta
                    property="og:image"
                    content={`${process.env.NEXT_PUBLIC_DOMAIN}/images/recent.jpg`}
                />
                <meta
                    property="og:image:secure_url"
                    content={`${process.env.NEXT_PUBLIC_DOMAIN}/images/recent.jpg`}
                />
                <meta property="og:image:type" content="image/jpg" />
                <meta name="theme-color" content="#eff3f8" />
            </Head>
        )
    }, [router.pathname, titleText])

    return (
        <>
            {head}
            <main className="home">
                <Carousel />
                <section className="featured-posts-container">
                    <div>
                        <Link href="/categories/featured">
                            <h1>{t('featured')}</h1>
                        </Link>
                        <PostMasonry
                            imgFor="featured"
                            posts={featured.slice(0, 5)}
                            columns={4}
                            tagsOnTop={true}
                        />
                    </div>
                </section>

                {recent && (
                    <section className="bg-white">
                        <div className="recent-container">
                            <Link href="/categories/recent-post">
                                <h1>{t('recent-post')}</h1>
                            </Link>
                            <PostGrid posts={recent} />
                        </div>
                    </section>
                )}

                <section className="trending-posts-container">
                    <div>
                        <Link href="/categories/trending">
                            <h1>{t('trending')}</h1>
                        </Link>
                        <PostMasonry
                            imgFor="trending"
                            posts={trending.slice(0, 5)}
                            columns={3}
                            tagsOnTop={true}
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export const getStaticProps: GetStaticProps<ServerSideTranslations> = async ({
    locale,
}) => {
    const { getCatBlogs: trending } = await sdk.GetCatBlogs({
        getCatBlogsSlug: 'trending',
    })

    const { getCatBlogs: recent } = await sdk.GetCatBlogs({
        getCatBlogsSlug: 'recent-post',
    })

    const { getCatBlogs: featured } = await sdk.GetCatBlogs({
        getCatBlogsSlug: 'featured',
    })
    return {
        props: {
            recent,
            trending,
            featured,
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
        revalidate: 10,
    }
}

export default withRouter(Index)
