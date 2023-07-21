import PostList from "@/components/PostList";
import PostPagination from "@/components/PostPagination";
import { getPagination } from "@/utils/pagination";
import { allPosts,Post } from "contentlayer/generated"

import { notFound } from "next/navigation"

const posts: Post[] = allPosts.sort((a, b) => b.date.localeCompare(a.date));

interface Props {
  params: {
    number: string;
  }
}

export const generateStaticParams = () => {
  return Array.from({ length: posts.length }).map((_, index) => ({
    number: `${index} +1`,
  }))
}

const LayoutPages = ({ params }: Props) => {
  let arraCurrentPosts;
  let totalPagesNumber;
  try {
    const {currentPosts,totalPages} = getPagination(posts,2,params.number);
    arraCurrentPosts=currentPosts;
    totalPagesNumber=totalPages;
  } catch (error) {
    notFound()
  }


  return (
    <div>

      <div className="grid gap-4">
        <PostList posts={arraCurrentPosts} />
        {
          totalPagesNumber > 1 && (<PostPagination totalPages={totalPagesNumber} currentPage={parseInt(params.number)} />)
        }
      </div>
    </div>
  )
}

export default LayoutPages