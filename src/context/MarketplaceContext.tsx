import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Listing, 
  User, 
  College, 
  Conversation, 
  FilterOptions, 
  CategoryId, 
  ListingStatus,
  ChatMessage 
} from '../types';
import { COLLEGES, INITIAL_LISTINGS, DEMO_USERS, INITIAL_CONVERSATIONS } from '../data/mockData';

interface MarketplaceContextType {
  // User & Auth
  currentUser: User;
  allUsers: User[];
  setCurrentUser: (user: User) => void;
  switchDemoUser: (userId: string) => void;
  verifyStudentEmail: (email: string, collegeId: string) => { success: boolean; message: string };
  updateProfile: (updatedData: Partial<User>) => void;

  // Colleges
  currentCollege: College;
  allColleges: College[];
  setCurrentCollege: (college: College) => void;
  selectCollegeById: (id: string) => void;

  // Listings
  listings: Listing[];
  filteredListings: Listing[];
  favorites: string[];
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
  createListing: (newListing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'sellerMajor' | 'sellerGradYear' | 'sellerRating' | 'sellerVerified' | 'collegeId'>) => Listing;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  updateListingStatus: (id: string, status: ListingStatus) => void;
  deleteListing: (id: string) => void;
  incrementListingViews: (id: string) => void;

  // Filters & Search
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (cat: CategoryId | 'all') => void;

  // Messaging & Negotiations
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  openChatForListing: (listing: Listing, initialMessage?: string) => string;
  sendMessage: (conversationId: string, text: string, isOffer?: boolean, offerAmount?: number) => void;
  respondToOffer: (conversationId: string, messageId: string, status: 'accepted' | 'declined') => void;
  unreadMessagesCount: number;

  // UI Modals & Active Views
  activeListingDetail: Listing | null;
  setActiveListingDetail: (listing: Listing | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  isVerifyModalOpen: boolean;
  setIsVerifyModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isMessagesModalOpen: boolean;
  setIsMessagesModalOpen: (open: boolean) => void;
  isSafetyModalOpen: boolean;
  setIsSafetyModalOpen: (open: boolean) => void;

  // Notification Banner
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const defaultFilters: FilterOptions = {
  query: '',
  category: 'all',
  type: 'all',
  condition: 'all',
  minPrice: '',
  maxPrice: '',
  courseCode: '',
  pickupLocation: '',
  sortBy: 'newest',
  onlyVerifiedSellers: false,
  onlyFree: false,
};

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or use defaults
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('rexchange_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEMO_USERS[0];
  });

  const [currentCollege, setCurrentCollege] = useState<College>(() => {
    const saved = localStorage.getItem('rexchange_college');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return COLLEGES[0];
  });

  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('rexchange_listings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_LISTINGS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('rexchange_favorites');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['list_1', 'list_4'];
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('rexchange_conversations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CONVERSATIONS;
  });

  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Modals
  const [activeListingDetail, setActiveListingDetail] = useState<Listing | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('rexchange_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('rexchange_college', JSON.stringify(currentCollege));
  }, [currentCollege]);

  useEffect(() => {
    localStorage.setItem('rexchange_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('rexchange_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('rexchange_conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Demo user switcher
  const switchDemoUser = (userId: string) => {
    const target = DEMO_USERS.find((u) => u.id === userId);
    if (target) {
      setCurrentUser(target);
      showToast(`Switched account to ${target.name} (${target.major})`);
    }
  };

  const selectCollegeById = (id: string) => {
    const col = COLLEGES.find((c) => c.id === id);
    if (col) {
      setCurrentCollege(col);
      showToast(`Switched campus community to ${col.name}`);
    }
  };

  const verifyStudentEmail = (email: string, collegeId: string) => {
    const targetCollege = COLLEGES.find((c) => c.id === collegeId) || currentCollege;
    const domain = targetCollege.domain.toLowerCase();
    
    // Check if email ends with university domain or .edu
    const isEdu = email.toLowerCase().endsWith('.edu') || email.toLowerCase().endsWith(domain);
    
    if (!isEdu && !email.includes('@')) {
      return { success: false, message: `Please enter a valid student email ending in @${domain} or .edu` };
    }

    const updated: User = {
      ...currentUser,
      email,
      collegeId: targetCollege.id,
      collegeName: targetCollege.name,
      isStudentVerified: true,
      verifiedEmailDomain: domain,
    };
    setCurrentUser(updated);
    showToast(`🎉 Student Identity Verified for ${targetCollege.name}!`);
    return { success: true, message: 'Verification successful!' };
  };

  const updateProfile = (updatedData: Partial<User>) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
    showToast('Profile updated successfully!');
  };

  // Favorites
  const toggleFavorite = (listingId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(listingId);
      const next = exists ? prev.filter((id) => id !== listingId) : [...prev, listingId];
      showToast(exists ? 'Removed from saved items' : 'Saved to your wishlist ❤️');
      return next;
    });
  };

  const isFavorite = (listingId: string) => favorites.includes(listingId);

  // Listing CRUD
  const createListing = (newListingData: Omit<Listing, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'sellerMajor' | 'sellerGradYear' | 'sellerRating' | 'sellerVerified' | 'collegeId'>): Listing => {
    const newListing: Listing = {
      ...newListingData,
      id: `list_${Date.now()}`,
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerAvatar: currentUser.avatar,
      sellerMajor: currentUser.major,
      sellerGradYear: currentUser.gradYear,
      sellerRating: currentUser.rating,
      sellerVerified: currentUser.isStudentVerified,
      collegeId: currentCollege.id,
      views: 1,
      likes: 0,
      createdAt: 'Just now',
      updatedAt: 'Just now',
    };

    setListings((prev) => [newListing, ...prev]);
    showToast(`🚀 "${newListing.title}" is now live on ${currentCollege.shortName} Exchange!`);
    return newListing;
  };

  const updateListing = (id: string, updates: Partial<Listing>) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates, updatedAt: 'Just now' } : l))
    );
    showToast('Listing updated!');
  };

  const updateListingStatus = (id: string, status: ListingStatus) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, updatedAt: 'Just now' } : l))
    );
    showToast(`Listing marked as ${status.toUpperCase()}`);
  };

  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    showToast('Listing deleted');
  };

  const incrementListingViews = (id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, views: l.views + 1 } : l))
    );
  };

  // Filters
  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const setSearchQuery = (q: string) => {
    setFilters((prev) => ({ ...prev, query: q }));
  };

  const setSelectedCategory = (cat: CategoryId | 'all') => {
    setFilters((prev) => ({ ...prev, category: cat }));
  };

  // Filtered Listings
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // College matching
      if (item.collegeId && item.collegeId !== currentCollege.id) {
        return false;
      }

      // Query Search: title, description, courseCode, tags, sellerName
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCourse = item.courseCode?.toLowerCase().includes(q);
        const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        const matchSeller = item.sellerName.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCourse && !matchTags && !matchSeller) {
          return false;
        }
      }

      // Category
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }

      // Type (Sell, Trade, Free, Service, etc.)
      if (filters.type !== 'all' && item.type !== filters.type) {
        return false;
      }

      // Free Only
      if (filters.onlyFree && item.type !== 'free' && item.price > 0) {
        return false;
      }

      // Condition
      if (filters.condition !== 'all' && item.condition !== filters.condition) {
        return false;
      }

      // Price Range
      if (filters.minPrice !== '' && item.price < Number(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice !== '' && item.price > Number(filters.maxPrice)) {
        return false;
      }

      // Course code filter
      if (filters.courseCode && item.courseCode) {
        if (!item.courseCode.toLowerCase().includes(filters.courseCode.toLowerCase())) {
          return false;
        }
      }

      // Verified sellers only
      if (filters.onlyVerifiedSellers && !item.sellerVerified) {
        return false;
      }

      // Location match
      if (filters.pickupLocation && !item.pickupLocation.toLowerCase().includes(filters.pickupLocation.toLowerCase())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'popular') {
        return b.views + b.likes * 2 - (a.views + a.likes * 2);
      }
      // default: newest
      return 0;
    });
  }, [listings, currentCollege.id, filters]);

  // Messages & Conversations
  const openChatForListing = (listing: Listing, initialMessage?: string): string => {
    // Check if a conversation between currentUser and seller for this listing already exists
    const existing = conversations.find(
      (c) =>
        c.listingId === listing.id &&
        ((c.buyerId === currentUser.id && c.sellerId === listing.sellerId) ||
         (c.sellerId === currentUser.id && c.buyerId === listing.sellerId))
    );

    if (existing) {
      setActiveConversationId(existing.id);
      setIsMessagesModalOpen(true);
      return existing.id;
    }

    // Create new conversation
    const newConvId = `conv_${Date.now()}`;
    const firstMsgText = initialMessage || `Hi ${listing.sellerName}, is this ${listing.title} still available for pickup at ${listing.pickupLocation}?`;

    const newConv: Conversation = {
      id: newConvId,
      listingId: listing.id,
      listingTitle: listing.title,
      listingPrice: listing.price,
      listingType: listing.type,
      listingImage: listing.images[0] || '',
      listingStatus: listing.status,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerAvatar: currentUser.avatar,
      sellerId: listing.sellerId,
      sellerName: listing.sellerName,
      sellerAvatar: listing.sellerAvatar,
      lastMessage: firstMsgText,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: [
        {
          id: `msg_${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          text: firstMsgText,
          timestamp: 'Just now',
        },
      ],
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConvId);
    setIsMessagesModalOpen(true);
    return newConvId;
  };

  const sendMessage = (conversationId: string, text: string, isOffer = false, offerAmount?: number) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;

        const newMsg: ChatMessage = {
          id: `msg_${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          text: isOffer && offerAmount !== undefined 
            ? `Made an offer of $${offerAmount}. ${text}`
            : text,
          timestamp: 'Just now',
          isOffer,
          offerAmount,
          offerStatus: isOffer ? 'pending' : undefined,
        };

        return {
          ...c,
          lastMessage: newMsg.text,
          lastMessageTime: 'Just now',
          messages: [...c.messages, newMsg],
        };
      })
    );
  };

  const respondToOffer = (conversationId: string, messageId: string, status: 'accepted' | 'declined') => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;

        const updatedMessages = c.messages.map((m) =>
          m.id === messageId ? { ...m, offerStatus: status } : m
        );

        const statusText = status === 'accepted' ? '🎉 Offer accepted! Arrange a safe pickup spot below.' : 'Offer declined.';

        const responseMsg: ChatMessage = {
          id: `msg_${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          text: statusText,
          timestamp: 'Just now',
        };

        return {
          ...c,
          lastMessage: statusText,
          lastMessageTime: 'Just now',
          messages: [...updatedMessages, responseMsg],
        };
      })
    );

    showToast(status === 'accepted' ? 'Accepted offer! Chat to coordinate campus meetup.' : 'Declined offer.');
  };

  const unreadMessagesCount = useMemo(() => {
    return conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  }, [conversations]);

  return (
    <MarketplaceContext.Provider
      value={{
        currentUser,
        allUsers: DEMO_USERS,
        setCurrentUser,
        switchDemoUser,
        verifyStudentEmail,
        updateProfile,

        currentCollege,
        allColleges: COLLEGES,
        setCurrentCollege,
        selectCollegeById,

        listings,
        filteredListings,
        favorites,
        toggleFavorite,
        isFavorite,
        createListing,
        updateListing,
        updateListingStatus,
        deleteListing,
        incrementListingViews,

        filters,
        setFilters,
        resetFilters,
        setSearchQuery,
        setSelectedCategory,

        conversations,
        activeConversationId,
        setActiveConversationId,
        openChatForListing,
        sendMessage,
        respondToOffer,
        unreadMessagesCount,

        activeListingDetail,
        setActiveListingDetail,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isVerifyModalOpen,
        setIsVerifyModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isMessagesModalOpen,
        setIsMessagesModalOpen,
        isSafetyModalOpen,
        setIsSafetyModalOpen,

        toastMessage,
        showToast,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
