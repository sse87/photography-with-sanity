import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
      image: 'images.0',
    },
    prepare(selection) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { title, images, image } = selection

      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        title,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        subtitle: `Gallery block of ${Object.keys(images).length} images`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        media: image,
      }
    },
  },
})
