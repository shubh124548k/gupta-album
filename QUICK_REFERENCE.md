# Gupta Album - Quick Reference Guide

## Project Overview
- **Type**: React + TypeScript SPA with Vite
- **Styling**: Tailwind CSS with custom components
- **Routing**: React Router v6
- **State Management**: React Context API
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui + Custom 3D components

## Key Features
✅ Wedding photographer marketplace
✅ User authentication (local storage)
✅ Search and filter photographers
✅ Blog with articles
✅ Photo gallery with 3D effects
✅ Review system
✅ Contact forms
✅ 100% responsive design

## Installation & Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
src/
├── App.tsx                 # Main app with routes
├── App.css                 # Global styles (minimal)
├── index.css               # Tailwind + custom utilities
├── main.tsx                # React entry point
├── components/
│   ├── Header.tsx          # Top navigation
│   ├── Footer.tsx          # Bottom navigation
│   ├── Room3D.tsx          # 3D background effects
│   ├── GlassPanel.tsx      # Reusable glass effect card
│   ├── FloatingCard3D.tsx  # 3D animated card
│   └── ui/                 # shadcn/ui components
├── pages/
│   ├── Index.tsx           # Homepage
│   ├── Photographers.tsx   # Photographers listing
│   ├── PhotographerDetail.tsx  # Single photographer
│   ├── Auth.tsx            # Sign in/up
│   ├── Blog.tsx            # Blog listing
│   ├── BlogDetail.tsx      # Single blog
│   ├── About.tsx           # About page
│   └── NotFound.tsx        # 404 page
├── contexts/
│   ├── AuthContext.tsx     # Auth state
│   └── ReviewsContext.tsx  # Reviews state
├── hooks/
│   ├── use-mobile.tsx      # Mobile detection
│   ├── use-toast.ts        # Toast notifications
│   └── useScrollToTop.ts   # Scroll to top hook
├── data/
│   ├── photographers.ts    # Photographer data
│   ├── cities.ts           # City data
│   ├── blogs.ts            # Blog data
│   └── reviews.ts          # Review data
└── lib/
    └── utils.ts            # Utility functions
```

## Important Notes

### Responsive Design
All components use Tailwind's responsive prefixes:
- `sm:` for 640px+
- `md:` for 768px+
- `lg:` for 1024px+
- `xl:` for 1280px+

### Mobile Safety
- Always add `px` padding to avoid horizontal scroll
- Use `overflow-x-hidden` on containers
- Test with mobile viewport in DevTools
- Ensure touch targets are 44px+ minimum

### Color System
Custom colors defined in `index.css` and `tailwind.config.ts`:
- Primary: Champagne Gold (#D4A574)
- Secondary: Blush (#F3E5D9)
- Accent: Rose Gold
- Text: Dark Brown with proper contrast

### Common Tasks

#### Add New Page
1. Create `src/pages/NewPage.tsx`
2. Add route in `App.tsx`
3. Import and use components
4. Add scroll-to-top: `useEffect(() => { window.scrollTo(0, 0); }, [])`

#### Update Colors
1. Edit CSS variables in `src/index.css`
2. Update Tailwind config in `tailwind.config.ts`
3. Rebuild: `npm run build`

#### Add New Component
1. Create in `src/components/`
2. Use TypeScript interfaces for props
3. Export as default
4. Import in needed pages

#### Deploy to Production
```bash
npm run build
# Upload contents of 'dist' folder to hosting service
```

## Common Issues & Solutions

### Issue: Horizontal Scroll on Mobile
**Solution**: Add `overflow-x-hidden` to parent container and `px` padding

### Issue: Layout Shift on Resize
**Solution**: Use Tailwind responsive classes instead of JS media queries

### Issue: Buttons Too Small on Mobile
**Solution**: Use Tailwind sizing: `py-2.5 md:py-4` for touch-friendly sizes

### Issue: Images Not Responsive
**Solution**: Use `w-full h-auto` classes with aspect ratio containers

### Issue: Text Too Small on Mobile
**Solution**: Use Tailwind text sizing: `text-sm md:text-base lg:text-lg`

## Performance Tips

1. **Lazy Loading**: Use React.lazy() for route components
2. **Code Splitting**: Enable Vite's automatic chunking
3. **Image Optimization**: Use next-gen formats (WebP)
4. **Memoization**: Use React.memo() for expensive components
5. **Debouncing**: Debounce search inputs for API calls

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Environment Variables

None required for development. Production may need:
- `VITE_API_URL` - Backend API endpoint
- `VITE_ANALYTICS_ID` - Analytics ID

## Debugging

### Check Console
Always check browser console for errors:
- DevTools: F12
- Mobile: Use remote debugging

### Check Network
Monitor API calls and asset loading:
- DevTools Network tab
- Look for failed requests (red items)

### Check Performance
Use Lighthouse in DevTools:
- Performance > 90
- Accessibility > 90
- Best Practices > 90
- SEO > 90

## Maintenance Checklist

- [ ] Run `npm run lint` regularly
- [ ] Update dependencies monthly: `npm update`
- [ ] Test on real devices
- [ ] Check lighthouse scores
- [ ] Monitor error tracking
- [ ] Backup database/user data
- [ ] Review analytics

## Contact & Support

For issues or questions:
1. Check FIX_REPORT.md for known fixes
2. Review component documentation
3. Check component usage in other pages
4. Test locally before deployment

---

**Last Updated**: December 22, 2025
**Status**: Production Ready ✅
