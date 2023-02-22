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

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link
              as={`/posts/${slug}`}
              href="/posts/[slug]"
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <div
            className="text-lg leading-relaxed mb-4"
            dangerouslySetInnerHTML={createMarkup(excerpt)}
          />
          <Avatar name={author} />
        </div>
      </div>
    </section>
  )
}

export default HeroPost
