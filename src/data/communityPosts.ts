import { CommunityPost, PostComment } from '../types';

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'How our family switched 100% of our monthly groceries to Pakistani alternatives',
    content: `When the boycott call gained urgency, our 6-member household in Karachi made a firm commitment: zero complicit products in our monthly grocery trolley.

Initially, we were worried about quality differences for laundry detergents, tea, and personal care. But the transition turned out to be remarkably smooth and cost-effective!

Here is what we replaced:
• Lipton / Yellow Label ➔ **Tapal Danedar & Mezban Tea** (Honestly richer taste and supports local tea blending).
• Ariel / Surf Excel ➔ **Brite Maximum Power & Sufi Soap Flakes** (Equally effective on tough stains at 25% lower cost).
• Sunsilk / Pantene ➔ **Saeed Ghani Herbal Shampoos & Bio Amla**.
• Colgate / Sensodyne ➔ **Shield Herbal & English Toothpaste**.
• Lays / Kurkure ➔ **Kolson, Super Crisp, & Kurleez**.

Our monthly grocery bill dropped by around 18%, and we feel immense peace of mind knowing none of our hard-earned money fuels oppression. Stand steadfast!`,
    authorName: 'Ayesha Tariq',
    authorLocation: 'Karachi, Pakistan',
    category: 'Story',
    tags: ['GrocerySwitch', 'LocalBrands', 'BudgetFriendly', 'PakistaniMade'],
    upvotes: 248,
    commentsCount: 14,
    createdAt: '2025-01-15T09:30:00.000Z',
    status: 'published',
    pinned: true,
    readTime: '3 min read'
  },
  {
    id: 'post-2',
    title: 'Campaign Victory: Puma officially ends sponsorship of Israel Football Association',
    content: `A massive global victory for the BDS movement! 

After years of relentless worldwide grassroots campaigning, athlete protests, and consumer boycotts across dozens of countries, sports apparel giant Puma has officially ended its multi-million dollar sponsorship contract with the Israel Football Association (IFA).

The IFA governs teams in illegal settlement colonies in the occupied West Bank. This victory proves beyond doubt that coordinated consumer pressure, letters to management, and public boycotts work directly on corporate balance sheets.

Next focus: HP, Siemens, and Carrefour. Keep pushing!`,
    authorName: 'Zayd Al-Ansari',
    authorLocation: 'Global Activism Desk',
    category: 'Campaign',
    tags: ['Victory', 'Puma', 'BDSMovement', 'GlobalImpact', 'SportsBoycott'],
    upvotes: 412,
    commentsCount: 29,
    createdAt: '2025-01-20T14:15:00.000Z',
    status: 'published',
    pinned: true,
    readTime: '2 min read'
  },
  {
    id: 'post-3',
    title: 'Detailed Review: Top Pakistani Laundry Detergents (Brite, Sufi, BreeO vs Multinational Brands)',
    content: `Many people ask if Pakistani laundry detergents perform as well as Procter & Gamble (Ariel) and Unilever (Surf Excel). Over the past 3 months, our household tested all three major local detergents across white cottons, colored fabrics, and machine washes:

1. **Brite (Colgate-Palmolive Pakistan / Lakson Group)**:
   - Stain Removal: 9/10
   - Fragrance: Clean, mild
   - Price: ~PKR 540/kg (vs PKR 780 for Ariel)
   - Verdict: Best direct alternative for automatic washing machines.

2. **Sufi Detergent Powder**:
   - Stain Removal: 8.5/10
   - Gentle on hands: 10/10 (rich vegetable oil base)
   - Verdict: Outstanding for delicate fabrics and bucket washing.

3. **BreeO (Local Pakistani Manufacturer)**:
   - Value for money: 10/10
   - Heavy duty cleansing: 8.5/10
   - Verdict: Highly economical for large family batches.

Conclusion: You sacrifice zero cleansing power while directly empowering local industry.`,
    authorName: 'Hamza Farooq',
    authorLocation: 'Lahore, Pakistan',
    category: 'AlternativeReview',
    tags: ['Detergents', 'Brite', 'Sufi', 'ProductReview', 'PakistaniAlternatives'],
    upvotes: 189,
    commentsCount: 9,
    createdAt: '2025-02-02T11:45:00.000Z',
    status: 'published',
    pinned: false,
    readTime: '4 min read'
  },
  {
    id: 'post-4',
    title: 'Fast Food Boycott Impact: Multinational chains report historic revenue declines across MEA & South Asia',
    content: `Quarterly earnings reports from major franchise operators (Americana Restaurants, McDonald's Corp, Starbucks) show persistent double-digit drops in same-store sales across Muslim-majority nations.

Key Highlights:
• McDonald's acknowledged boycotts meaningfully impacted international franchised markets.
• Local Pakistani burger chains (Cheezious, Daily Deli, Ranchers, OPTP) saw a 40-70% surge in customer footfall.
• Local beverage suppliers (Next Cola, Gourmet, Pakola) expanded bottling lines to meet unprecedented demand.

Every meal chosen locally is a statement of solidarity and economic self-determination.`,
    authorName: 'Maryam Siddiqui',
    authorLocation: 'Islamabad, Pakistan',
    category: 'News',
    tags: ['FastFood', 'EconomicImpact', 'NextCola', 'Cheezious', 'BoycottNews'],
    upvotes: 326,
    commentsCount: 18,
    createdAt: '2025-02-10T16:20:00.000Z',
    status: 'published',
    pinned: false,
    readTime: '3 min read'
  },
  {
    id: 'post-5',
    title: 'Next Cola, Pakola, & Gourmet vs Coca-Cola & Pepsi: Blind Taste Test Results',
    content: `We hosted a blind taste test with 15 participants in Faisalabad comparing boycott sodas with local Pakistani replacements:

• **Next Cola (Mezan Beverages)**: 11 out of 15 rated it identical or superior in crispness to Coca-Cola with less artificial aftertaste.
• **Pakola Ice Cream Soda & Lychee**: Ranked #1 unique flavor profile that no foreign brand can match.
• **Gourmet Cola & Malt**: Excellent carbonation and very refreshing with local desi street food.

Supporting our own beverage manufacturers keeps billions of rupees circulating within our national economy.`,
    authorName: 'Bilal Khan',
    authorLocation: 'Faisalabad, Pakistan',
    category: 'AlternativeReview',
    tags: ['Beverages', 'NextCola', 'Pakola', 'Gourmet', 'SodaSwap'],
    upvotes: 195,
    commentsCount: 12,
    createdAt: '2025-02-18T13:00:00.000Z',
    status: 'published',
    pinned: false,
    readTime: '3 min read'
  },
  {
    id: 'post-6',
    title: 'How can small tech agencies transition away from HP hardware and Wix hosting?',
    content: `As a boutique software agency owner in Rawalpindi, we are auditing our software stack:
1. **Hosting / Website Builders**: We moved all client demo pages from Wix to self-hosted WordPress, Ghost, and Cloudflare Pages.
2. **Office Hardware**: Replacing HP printers & laptops with Lenovo, Asus, and Brother printers.
3. **Cloud Infrastructure**: Utilizing independent VPS providers and regional cloud datacenters.

What other digital tools have you successfully audited and swapped in your workplace?`,
    authorName: 'Usman Ali',
    authorLocation: 'Rawalpindi, Pakistan',
    category: 'Question',
    tags: ['TechBoycott', 'SaaS', 'WebHosting', 'WorkplaceAudit'],
    upvotes: 142,
    commentsCount: 8,
    createdAt: '2025-02-22T08:15:00.000Z',
    status: 'published',
    pinned: false,
    readTime: '2 min read'
  }
];

export const INITIAL_POST_COMMENTS: PostComment[] = [
  {
    id: 'c-1',
    postId: 'post-1',
    authorName: 'Kashif Mehmood',
    authorLocation: 'Rawalpindi',
    content: 'We switched to Tapal and Brite as well, never going back! The quality is amazing.',
    createdAt: '2025-01-15T10:45:00.000Z'
  },
  {
    id: 'c-2',
    postId: 'post-1',
    authorName: 'Fatima Noor',
    authorLocation: 'Lahore',
    content: 'Saeed Ghani herbal range is really great for hair care. Truly an underappreciated gem in Pakistan.',
    createdAt: '2025-01-15T12:20:00.000Z'
  },
  {
    id: 'c-3',
    postId: 'post-2',
    authorName: 'Dr. Tariq Jamil',
    authorLocation: 'Karachi',
    content: 'Alhamdulillah! Proof that sustained, focused pressure yields concrete results.',
    createdAt: '2025-01-20T15:00:00.000Z'
  },
  {
    id: 'c-4',
    postId: 'post-3',
    authorName: 'Nadia Akram',
    authorLocation: 'Multan',
    content: 'Sufi washing powder is so gentle on clothes and smells so fresh. Highly recommended!',
    createdAt: '2025-02-02T13:10:00.000Z'
  },
  {
    id: 'c-5',
    postId: 'post-5',
    authorName: 'Saad Rafique',
    authorLocation: 'Lahore',
    content: 'Next Cola is genuinely better than Coke! It has a cleaner taste without that syrupy heaviness.',
    createdAt: '2025-02-18T14:30:00.000Z'
  }
];
