/* eslint-disable @next/next/no-img-element */
type Props = {
  name: string
}

const Avatar = ({ name }: Props) => {
  return (
    <div className="flex items-center">
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}

export default Avatar
