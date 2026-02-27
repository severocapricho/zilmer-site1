import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['pt', 'en'],

  // Used when no locale matches
  defaultLocale: 'pt'

  // Removed pathnames configuration to use same folder structure for both languages
  // This ensures dynamic routes work correctly in both languages
  // Content translation is handled by the translation files, not by URL structure
  // URLs will be: /pt/sobre, /en/sobre (same structure, different content)
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)

