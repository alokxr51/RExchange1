export type CategoryId = 
  | 'books'
  | 'electronics'
  | 'notes'
  | 'tickets'
  | 'services'
  | 'free'
  | 'other';

export type ListingType = 'sell' | 'trade' | 'free' | 'rent' | 'service';
export type ItemCondition = 'brand-new' | 'like-new' | 'good' | 'fair';
export type ListingStatus = 'active' | 'reserved' | 'sold' | 'expired';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  badgeColor: string;
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  domain: string;
  city: string;
  state: string;
  logoColor: string;
  popularHubs: string[];
  studentCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  collegeId: string;
  collegeName: string;
  isStudentVerified: boolean;
  verifiedEmailDomain?: string;
  major: string;
  gradYear: string;
  dormLocation: string;
  bio: string;
  rating: number;
  reviewCount: number;
  joinedDate: string;
  phoneOrContact?: string;
  responseRate?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  type: ListingType;
  price: number; // 0 for free/trade
  originalPrice?: number;
  tradeFor?: string; // what they want in exchange
  condition: ItemCondition;
  courseCode?: string; // e.g., CS106B, ECON50, CHEM31A
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerMajor: string;
  sellerGradYear: string;
  sellerRating: number;
  sellerVerified: boolean;
  collegeId: string;
  pickupLocation: string; // e.g. "Main Library (Green Library)", "Tressider Student Union"
  status: ListingStatus;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isOffer?: boolean;
  offerAmount?: number;
  offerStatus?: 'pending' | 'accepted' | 'declined' | 'countered';
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  listingType: ListingType;
  listingImage: string;
  listingStatus: ListingStatus;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface FilterOptions {
  query: string;
  category: CategoryId | 'all';
  type: ListingType | 'all';
  condition: ItemCondition | 'all';
  minPrice: number | '';
  maxPrice: number | '';
  courseCode: string;
  pickupLocation: string;
  sortBy: 'newest' | 'price-low' | 'price-high' | 'popular' | 'condition';
  onlyVerifiedSellers: boolean;
  onlyFree: boolean;
}
