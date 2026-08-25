import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  ShieldCheck, 
  MapPin, 
  DollarSign, 
  Check, 
  XCircle, 
  MessageCircle, 
  Sparkles, 
  Tag, 
  AlertTriangle,
  Clock
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const ChatModal: React.FC = () => {
  const { 
    isMessagesModalOpen, 
    setIsMessagesModalOpen, 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage, 
    respondToOffer, 
    currentUser,
    currentCollege,
    setActiveListingDetail,
    listings
  } = useMarketplace();

  const [messageInput, setMessageInput] = useState('');
  const [offerInput, setOfferInput] = useState('');
  const [showOfferBox, setShowOfferBox] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto select first conversation if none selected
  useEffect(() => {
    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [activeConversationId, conversations, setActiveConversationId]);

  // Scroll to bottom on message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, activeConversationId]);

  if (!isMessagesModalOpen) return null;

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim() || !activeConv) return;
    sendMessage(activeConv.id, messageInput.trim());
    setMessageInput('');
  };

  const handleMakeOffer = () => {
    const num = Number(offerInput);
    if (!num || num <= 0 || !activeConv) return;
    sendMessage(activeConv.id, `Proposed price offer: $${num}`, true, num);
    setOfferInput('');
    setShowOfferBox(false);
  };

  const handleSuggestLocation = (spot: string) => {
    if (!activeConv) return;
    sendMessage(activeConv.id, `📍 How about we meet at ${spot} for the handover?`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div 
        id="chat-modal-container"
        className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full h-[85vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Campus Student Messenger
              </h2>
              <p className="text-[10px] text-slate-500">
                Direct verified student communications • {currentCollege.shortName}
              </p>
            </div>
          </div>

          <button
            id="close-chat-modal-btn"
            onClick={() => setIsMessagesModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Container: 2-columns (threads on left, active chat on right) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Threads List Sidebar */}
          <div className="w-64 sm:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/30 shrink-0">
            <div className="p-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Conversations ({conversations.length})
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
              {conversations.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No active messages yet. Click "Message" on any listing to start a conversation!
                </div>
              ) : (
                conversations.map((conv) => {
                  const isSelected = activeConv?.id === conv.id;
                  const otherPartyName = conv.buyerId === currentUser.id ? conv.sellerName : conv.buyerName;
                  const otherPartyAvatar = conv.buyerId === currentUser.id ? conv.sellerAvatar : conv.buyerAvatar;

                  return (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConversationId(conv.id)}
                      className={`w-full p-3 text-left flex items-start gap-3 transition-colors ${
                        isSelected
                          ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-l-4 border-emerald-600'
                          : 'hover:bg-slate-100/70 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <img
                        src={otherPartyAvatar}
                        alt={otherPartyName}
                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-emerald-500/50"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {otherPartyName}
                          </span>
                          <span className="text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                        </div>
                        <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 truncate mt-0.5">
                          {conv.listingTitle}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Active Chat Conversation Pane */}
          {activeConv ? (
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 min-w-0">
              
              {/* Chat Item Context Bar */}
              <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={activeConv.listingImage}
                    alt={activeConv.listingTitle}
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {activeConv.listingTitle}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {activeConv.listingPrice === 0 ? 'Free' : `$${activeConv.listingPrice}`}
                      </span>
                      <span>•</span>
                      <span>Chatting with <strong>{activeConv.sellerName === currentUser.name ? activeConv.buyerName : activeConv.sellerName}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Offer Trigger Button */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setShowOfferBox(!showOfferBox)}
                    className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                  >
                    Make Offer ($)
                  </button>
                </div>
              </div>

              {/* Offer Drawer Box if active */}
              {showOfferBox && (
                <div className="p-3 bg-emerald-50/90 dark:bg-emerald-950/80 border-b border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3 animate-in slide-in-from-top-2">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Propose Offer:
                    </span>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-xs font-bold text-slate-400">$</span>
                      <input
                        type="number"
                        value={offerInput}
                        onChange={(e) => setOfferInput(e.target.value)}
                        placeholder="Offer amount"
                        className="w-32 pl-6 pr-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handleMakeOffer}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm"
                    >
                      Send Offer
                    </button>
                  </div>
                  <button
                    onClick={() => setShowOfferBox(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Messages Flow */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/30 dark:bg-slate-950/20">
                
                {/* Safety banner reminder */}
                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-2.5 text-center text-[11px] text-amber-800 dark:text-amber-300">
                  🛡️ <strong>Safety Reminder:</strong> Meet in popular, well-lit campus spots (e.g. Green Library, Student Union) and inspect items before transferring payment.
                </div>

                {activeConv.messages.map((msg) => {
                  const isMine = msg.senderId === currentUser.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5 text-[10px] text-slate-400">
                        <span>{msg.senderName}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      {/* Offer Message Card */}
                      {msg.isOffer ? (
                        <div className={`p-3 rounded-2xl max-w-sm border shadow-sm ${
                          isMine 
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-white' 
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white'
                        }`}>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                            <Tag className="w-3.5 h-3.5" />
                            <span>Price Offer: ${msg.offerAmount}</span>
                          </div>
                          <p className="text-xs">{msg.text}</p>

                          {/* Respond actions if pending and not my own offer */}
                          {msg.offerStatus === 'pending' && !isMine && (
                            <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700">
                              <button
                                onClick={() => respondToOffer(activeConv.id, msg.id, 'accepted')}
                                className="flex-1 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 shadow-sm"
                              >
                                <Check className="w-3 h-3" />
                                Accept ${msg.offerAmount}
                              </button>
                              <button
                                onClick={() => respondToOffer(activeConv.id, msg.id, 'declined')}
                                className="px-3 py-1 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg"
                              >
                                Decline
                              </button>
                            </div>
                          )}

                          {msg.offerStatus === 'accepted' && (
                            <div className="mt-2 text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              Offer Accepted
                            </div>
                          )}
                          {msg.offerStatus === 'declined' && (
                            <div className="mt-2 text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" />
                              Offer Declined
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Regular text message bubble */
                        <div
                          className={`px-3.5 py-2.5 rounded-2xl max-w-sm sm:max-w-md text-xs leading-relaxed shadow-sm ${
                            isMine
                              ? 'bg-emerald-600 text-white rounded-br-none'
                              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {msg.text}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Campus Meetup Spot Suggestions */}
              <div className="px-3 py-1.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex items-center gap-1.5 overflow-x-auto text-[11px]">
                <span className="text-slate-400 font-semibold shrink-0">Campus Meetups:</span>
                {currentCollege.popularHubs.slice(0, 3).map((hub) => (
                  <button
                    key={hub}
                    onClick={() => handleSuggestLocation(hub)}
                    className="px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    📍 {hub}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <input
                  id="chat-message-input"
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message to coordinate pickup or ask questions..."
                  className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  id="send-chat-btn"
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-full transition-colors active:scale-95 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
              Select a conversation to start chatting.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
