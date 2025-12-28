import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

interface SectionHeaderProps {
  title: string
  description?: string
  showMoreButton?: boolean
  moreLink?: string
}

export default function SectionHeader({ 
  title, 
  description, 
  showMoreButton = true, 
  moreLink = "#" 
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
      
      {showMoreButton && (
        <Link
          to={moreLink}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}