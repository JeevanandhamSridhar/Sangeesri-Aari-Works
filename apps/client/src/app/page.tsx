import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import { ShopPreview } from '@/components/sections/ShopPreview'
import { QuotationCTA } from '@/components/sections/QuotationCTA'
import { CollectionsMarquee } from '@/components/sections/CollectionsMarquee'
import { InstagramFeed } from '@/components/sections/InstagramFeed'
import { LocationMap } from '@/components/sections/LocationMap'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <CollectionsMarquee />
      <GalleryPreview />
      <ShopPreview />
      <InstagramFeed />
      <ReviewsSection />
      <LocationMap />
      <QuotationCTA />
    </>
  )
}

