import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { BlogForm } from '../../../components/blog/BlogForm'
import { showAlert } from '../../../components/common/Alert'
import {
    GetBlogByIdDocument,
    GetBlogByIdQuery,
} from '../../../generated/graphql-request'
import { fetcher } from '../../../graphql/gqlClient'
import { getErrorMsg } from '../../../helpers/getErrorMsg'
import { ServerSideTranslations } from '../../../types'

const EditBlog = () => {
    const { query } = useRouter()

    const {
        isLoading,
        data: blog,
        error,
    } = useQuery<GetBlogByIdQuery, Error, GetBlogByIdQuery['getBlogById']>({
        queryKey: ['getBlogById', query.id],
        queryFn: fetcher(GetBlogByIdDocument, { blogId: query.id as string }),
        enabled: !!(query && query.id),
        select: (res) => res.getBlogById,
    })

    const tagIds = blog?.tags?.map((t) => t._id) ?? []

    return (
        <>
            {error && showAlert(getErrorMsg(error), 'error')}
            {!isLoading && (
                <BlogForm
                    formType="edit"
                    blogId={query.id as string}
                    draftBody={blog?.body}
                    draftActive={blog?.active ?? false}
                    draftImg={blog?.imageUri ?? ''}
                    draftTitle={blog?.title}
                    draftTags={tagIds}
                />
            )}
        </>
    )
}

export default EditBlog

export const getServerSideProps: GetServerSideProps<
    ServerSideTranslations
> = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', [
                'common',
                'dashboard',
            ])),
        },
    }
}
