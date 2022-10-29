
import React from 'react'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

import { Container, BreadcrumbList, Pagination } from "@components/ui"

import { createBreadcrumListJsonLd } from '@components/utils'
import type { BreadcrumbItem } from '@components/utils/createBreadcrumbList-json-ld'
import { MetaHead } from '@components/common'
import { microcmsClient, MICROCMS_ENDPOINT_NEWS } from '@service/micro-cms'
import { motion } from 'framer-motion'
import { News } from '@service/micro-cms/type/News'


const PER_PAGE = 10;

export const getStaticPaths: GetStaticPaths = async () => {

    const repos = await microcmsClient.get({ endpoint: MICROCMS_ENDPOINT_NEWS })
    const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);
    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/news/page/${repo}`);
    return{
        paths: paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async(context) => {
    const id = context.params?.index as string;
    const data = await microcmsClient.get({ endpoint: MICROCMS_ENDPOINT_NEWS, queries: { offset: (parseInt(id) - 1) * PER_PAGE, limit: PER_PAGE } });
    return {
        props:{
            allNews: data.contents,
            id: id,
            totalCount: data.totalCount
        }
    }
}

const items: BreadcrumbItem[] = [
    {name: "ホーム", url:"/"},
    {name: "ニュース一覧", url:"/news/page/1"},
]

const NewsIndex = ({allNews, id, totalCount}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
        <MetaHead
            title='ニュース一覧 | マルチプラ | 丹波篠山市のWEB制作会社'
            description='マルチプラ/Multiplaのニュース一覧ページです。主にマルチプラの活動について発信して行きます。'
        >
            <script type='application/ld+json' dangerouslySetInnerHTML={createBreadcrumListJsonLd(items)}/>
        </MetaHead>
        <Container>
            <BreadcrumbList items={items} />
            <div className='max-w-lg md:max-w-4xl lg:max-w-6xl mx-auto mb-6 md:mb-12'>
                <motion.div
                    initial={{ opacity:0, y:10 }}
                    animate={{ opacity:1, y:0 }}
                    exit={{ opacity:0, y:10 }}
                    transition={{
                        delay:0.3,
                        duration: 0.7,
                    }}
                >
                    <div className='w-fit my-4 md:my-8'>
                            <h3 className="text-gray-700 text-3xl md:text-4xl">News</h3>
                            <div className='h-[2px] w-full bg-green-300'></div>
                            <p className='text-xs md:text-sm'>ニュース</p>
                        </div>
                    <div className='my-12'>
                        {
                            allNews.map((news: News) => {
                                return (
                                    <div key={news.id} className='bg-gray-50 shadow-md rounded-md py-1 md:py-3 px-2 md:px-5 mb-5 text-gray-500'>
                                        <div className='md:flex items-center  md:space-x-12 text-sm md:text-base'>
                                            <div className='my-2 flex items-center justify-between' >
                                                <p className='text-blue-600'>{news.createdAt.split("T")[0]}</p><p className='ml-4 border border-green-500 px-3 rounded-full font-normal text-green-500'>{news.category}</p>
                                            </div>
                                            <p className='bg-white w-full py-2 px-6'>{news.title}</p>
                                        </div>
                                        <div className='w-full flex justify-center'>
                                            <p className='w-fit text-sm md:text-base underline text-blue-500'>
                                                <Link href={`/news/${news.id}`} passHref>
                                                    <a>
                                                        詳しく見る
                                                    </a>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </motion.div>
                <Pagination totalCount={totalCount} pageIndex={id} perPage={PER_PAGE} />
            </div>
        </Container>
        </>
    )
}

export default NewsIndex