# Media Management Guide

This guide explains how to manage media files in your portfolio website.

## Folder Structure

The portfolio uses the following folder structure for media files:

\`\`\`
public/
├── images/
│   ├── portfolio/  # Images for hero and portfolio sections
│   │   ├── 0.png
│   │   ├── 5.png
│   │   └── 6.jpg
│   ├── about/      # Images for the about section
│   └── clients/    # Client logos
├── videos/         # Video files
│   ├── 1.mp4
│   ├── 3.mp4
│   ├── 4.mov
│   ├── 7.mp4
│   ├── 8.mp4
│   └── 9.mp4
└── documents/      # Documents like resume
    └── resume.pdf
\`\`\`

## Adding New Media

### Images

1. Place your image files in the appropriate folder (e.g., `/public/images/portfolio/`)
2. Use a consistent naming convention (e.g., numbered files like `7.png`)
3. Update the reference in the corresponding component:

\`\`\`typescript
// For hero section, update in components/hero.tsx
const portfolioWorks = [
  {
    title: "New Image Title",
    image: "/images/portfolio/your-new-image.png",
    type: "image",
  },
  // ...
];
\`\`\`

### Videos

1. Place your video files in the `/public/videos/` folder
2. Use a consistent naming convention (e.g., numbered files like `10.mp4`)
3. Update the reference in the corresponding component:

\`\`\`typescript
// For hero section, update in components/hero.tsx
const portfolioWorks = [
  {
    title: "New Video Title",
    video: "/videos/your-new-video.mp4",
    type: "video",
  },
  // ...
];
\`\`\`

## Supported File Types

- Images: PNG, JPG, JPEG, GIF, SVG
- Videos: MP4, MOV, WEBM
- Documents: PDF

## Best Practices

1. **Optimize your media files** before uploading:
   - Compress images using tools like TinyPNG
   - Compress videos to reduce file size

2. **Use consistent dimensions** for similar types of media:
   - Hero images/videos: 1920x1080px (16:9 ratio)
   - Portfolio thumbnails: 800x600px
   - Client logos: 200x200px

3. **Use descriptive filenames** that indicate the content

4. **Back up your media files** regularly

## Troubleshooting

If your media files aren't displaying correctly:

1. Check the file path is correct
2. Verify the file exists in the specified location
3. Ensure the file format is supported
4. Check for case sensitivity in filenames
5. Clear your browser cache and reload
