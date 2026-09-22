export const alternative = {
  name: 'alternative',
  title: 'Safe Alternative',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Alternative Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'country',
      title: 'Country of Origin',
      type: 'string',
      initialValue: 'Pakistan',
      options: {
        list: [
          { title: '🇵🇰 Pakistan', value: 'Pakistan' },
          { title: '🇹🇷 Turkey', value: 'Turkey' },
          { title: '🇵🇸 Palestine', value: 'Palestine' },
          { title: '🇸🇦 Saudi Arabia', value: 'Saudi Arabia' },
          { title: '🇦🇪 UAE', value: 'UAE' },
          { title: '🇮🇩 Indonesia', value: 'Indonesia' },
          { title: '🇪🇬 Egypt', value: 'Egypt' },
          { title: '🌐 Other Ethical/Local', value: 'Local' }
        ]
      }
    },
    {
      name: 'domain',
      title: 'Official Website Domain',
      type: 'string',
      description: 'e.g. dailydeli.pk, pakola.com.pk'
    },
    {
      name: 'image',
      title: 'Brand Logo Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'logoUrl',
      title: 'External Direct Image URL',
      type: 'url'
    },
    {
      name: 'verified',
      title: 'Verified 100% Ethical Local Choice',
      type: 'boolean',
      initialValue: true
    }
  ]
};
