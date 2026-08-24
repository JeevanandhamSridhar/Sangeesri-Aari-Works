import { redirect } from 'next/navigation'

export default function GalleryAdminRedirect() {
  redirect('http://localhost:3001/gallery')
}
