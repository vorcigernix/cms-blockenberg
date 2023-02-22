import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import sanitizeHtml from 'sanitize-html'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: string
  slug: string
}

function createMarkup(markup) {
  //console.log(markup)
  const sanitized = sanitizeHtml(markup, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p'],
    allowedAttributes: {},
  })
  const excerpt = sanitizeHtml(sanitized.split(/\s+/).slice(0, 40).join(' '))
  return {
    __html: excerpt,
  }
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <div
        className="text-lg leading-relaxed mb-4"
        dangerouslySetInnerHTML={createMarkup(excerpt)}
      />
      <Avatar name={author} />
    </div>
  )
}

export default PostPreview
