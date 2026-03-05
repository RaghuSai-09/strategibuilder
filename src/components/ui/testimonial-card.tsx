import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: Readonly<TestimonialCardProps>) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-2xl border border-gold-200",
        "bg-white/80 backdrop-blur-sm",
        "p-4 text-start sm:p-6",
        "hover:shadow-lg hover:border-gold-400",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 ring-2 ring-gold-400 shadow-md flex-shrink-0">
          <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none text-navy-900">
            {author.name}
          </h3>
          <p className="text-sm text-navy-600">
            {author.handle}
          </p>
        </div>
      </div>
      {/* 5-star rating */}
      <div className="flex gap-1 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={`${author.name}-star-${i}`} className="w-4 h-4 text-gold-500 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>

      <p className="sm:text-md mt-3 text-sm text-navy-700 leading-relaxed">
        {text}
      </p>
    </Card>
  )
}
