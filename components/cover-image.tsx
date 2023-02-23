import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  title: string
  src: string
  slug?: string
}

export default function CoverImage({ title, src, slug }: Props) {
  const image = (
    <div style={{ position: 'relative', height: '500px' }}>
      <Image
        fill
        sizes="100vw"
        alt={`Cover Image for ${title}`}
        src={src}
        className={cn('shadow-small object-cover', {
          'hover:shadow-medium transition-shadow duration-200 object-cover object-top': slug,
        })}
      />
    </div>
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
