export const product = {
  name: 'product',
  title: 'Boycott Target (Brand / Product / Celebrity)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Target Name',
      type: 'string',
      description: 'Brand name or Celebrity personality (e.g. McDonald\'s, Pepsi, Babar Azam)',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Primary Category',
      type: 'string',
      options: {
        list: [
          { title: 'Food & Beverages', value: 'Food & Beverages' },
          { title: 'Fast Food & Restaurants', value: 'Restaurants & Places' },
          { title: 'Celebrities & Endorsers', value: 'Celebrities & Endorsers' },
          { title: 'Household & Cleaning', value: 'Household & Cleaning' },
          { title: 'Personal Care & Beauty', value: 'Personal Care & Beauty' },
          { title: 'Fashion & Apparel', value: 'Fashion & Apparel' },
          { title: 'Tech & Electronics', value: 'Tech & Electronics' },
          { title: 'Finance & Banking', value: 'Finance & Banking' },
          { title: 'General & Other', value: 'General' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      description: 'e.g. Carbonated Drinks, Cricketers & Sports Stars, Cosmetics, Fast Food'
    },
    {
      name: 'parentCompany',
      title: 'Parent Multinational / Conglomerate',
      type: 'string',
      description: 'e.g. PepsiCo, The Coca-Cola Company, Unilever, L\'Oréal',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Direct High-Resolution Logo / Portrait Photo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'logoUrl',
      title: 'External Fallback Image/Logo URL',
      type: 'url'
    },
    {
      name: 'domain',
      title: 'Official Domain',
      type: 'string',
      description: 'e.g. mcdonalds.com, pepsi.com'
    },
    {
      name: 'severity',
      title: 'Boycott Severity',
      type: 'string',
      initialValue: 'Critical',
      options: {
        list: [
          { title: '🚨 Critical Priority', value: 'Critical' },
          { title: '⚠️ High Priority', value: 'High' },
          { title: 'ℹ️ Medium Priority', value: 'Medium' }
        ]
      }
    },
    {
      name: 'israelBarcode',
      title: 'Has 729 Israel Barcode Prefix',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'boycottReason',
      title: 'Documented Boycott Reason & Complicity Evidence',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'endorsedBrands',
      title: 'Promoted Brands (For Complicit Celebrities)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Brands this celebrity endorsed (e.g. Pepsi, L\'Oréal, McDonald\'s)'
    },
    {
      name: 'behaviorNotes',
      title: 'Corporate Behavior Notes',
      type: 'text',
      rows: 3
    },
    {
      name: 'behaviorTimeline',
      title: 'Incident & Behavior Timeline Log',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'date', title: 'Date / Period', type: 'string' },
            { name: 'action', title: 'Documented Action / Incident', type: 'text' }
          ]
        }
      ]
    },
    {
      name: 'alternatives',
      title: 'Verified Safe Pakistani & Ethical Alternatives',
      type: 'array',
      of: [{ type: 'alternative' }],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'tags',
      title: 'Search Keywords & Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'parentCompany',
      media: 'image'
    }
  }
};
