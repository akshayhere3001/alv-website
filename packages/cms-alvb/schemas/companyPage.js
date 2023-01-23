import { MdCorporateFare } from 'react-icons/md';
export default {
  name: 'company',
  title: 'Company Pages',
  type: 'document',
  icon: MdCorporateFare,
  fields: [
    {
      name: 'navigation',
      title: 'Show in navigation',
      type: 'boolean',
      options: {
        default: false,
      },
    },
    {
      name: 'pageTitle',
      title: 'Page Title (meta)',
      type: 'string',
      options: {
        maxLength: 60,
      },
    },
    {
      name: 'pageDescription',
      title: 'Page Description (meta)',
      type: 'text',
      rows: 2,
      options: {
        maxLength: 160,
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'heroHeading',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().warning('This field cannot be empty'),
    },
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'string',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'blockHeading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'blockText',
      title: 'Text Block',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      title: 'heroHeading',
      subtitle: 'heroDescription',
      media: 'heroImage',
    },
  },
};
