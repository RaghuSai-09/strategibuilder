'use client'

import React, { useState, useRef, useEffect } from 'react'
import { X, Send, Minimize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const faqs = [
  {
    keywords: ['service', 'services', 'offer', 'what do you do'],
    response: 'We are a boutique insurance brokerage specializing in complex placements including Management & Professional Liability (D&O, EPLI, E&O), Transactional Insurance (R&W, Tail D&O), Restructuring & Distressed Situations, Complex Risk Placement, Risk Strategy & Advisory, Claims Advocacy, and Market Access. We work where insurance is complex or difficult to obtain. Would you like to know more about any specific service?',
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'fee'],
    response: 'Our fee structure varies based on the complexity of your placement and specific needs. We provide transparent pricing and work to deliver value through our market relationships and expertise. I recommend scheduling a consultation to discuss your insurance requirements and get personalized guidance.',
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach'],
    response: 'You can reach us at marianne@strategibuilder.com or call (555) 123-4567. We work nationwide with businesses facing complex insurance challenges. We\'d be happy to discuss your situation!',
  },
  {
    keywords: ['consultation', 'meeting', 'schedule', 'book'],
    response: 'Excellent! We offer a consultation to discuss your insurance needs with no commitment required. You can scroll down to our contact form to schedule a meeting, or email us directly at marianne@strategibuilder.com.',
  },
  {
    keywords: ['process', 'how it works', 'timeline', 'how long'],
    response: 'Our process is built on three core principles: Intention (understanding your full context), Integrity (transparent guidance and advocacy), and Intelligence (using data and modern tools for better outcomes). We work collaboratively with you, engaging the right markets thoughtfully to secure workable coverage. Timelines vary based on complexity and market conditions.',
  },
  {
    keywords: ['industry', 'industries', 'sector', 'who do you work with'],
    response: 'We work with businesses across all sectors facing complex insurance needs—from companies in restructuring or Chapter 11, to businesses with non-standard risk profiles, to those navigating transactions or lender requirements. We specialize in situations where access to insurance can be limited and market engagement is critical.',
  },
  {
    keywords: ['values', 'principles', 'approach', 'philosophy'],
    response: 'Our work is guided by three core principles: Intention (purposeful problem-solving centered on protecting what truly matters), Integrity (honest advocacy and accountability), and Intelligence (using AI and emerging tools while keeping human judgment and trusted relationships at the center). We combine modern technology with traditional relationship-driven brokerage.',
  },
  {
    keywords: ['d&o', 'directors', 'officers', 'management liability', 'epli'],
    response: 'We specialize in management and professional liability coverage including D&O, EPLI, Fiduciary Liability, and E&O. This often involves heightened scrutiny, lender/investor requirements, or evolving risk profiles that require careful market coordination. Our deep relationships help us access solutions that aren\'t always visible through standard channels.',
  },
  {
    keywords: ['transaction', 'r&w', 'reps and warranties', 'deal', 'acquisition', 'merger'],
    response: 'We support transactional insurance needs including Representations & Warranties (R&W) Insurance, Tail D&O for sellers and exiting management, and transactional risk assessments. We work closely with deal teams, legal advisors, and markets to ensure coverage aligns with transaction dynamics and timing.',
  },
  {
    keywords: ['restructuring', 'bankruptcy', 'chapter 11', 'distressed', 'financial stress'],
    response: 'We place and maintain coverage for companies navigating restructuring, financial stress, or Chapter 11 environments, where access to insurance can be limited. Our market relationships and advocacy are critical in these situations to secure and maintain necessary protection during transition.',
  },
  {
    keywords: ['complex', 'difficult', 'non-standard', 'hard to place', 'challenging'],
    response: 'We specialize in complex and non-standard risk placements—helping businesses operating outside standard underwriting frameworks obtain protection through creative structuring, persistence, and deep market relationships. When traditional channels don\'t work, we find solutions.',
  },
  {
    keywords: ['claims', 'claim support', 'advocacy'],
    response: 'We remain engaged beyond placement to support clients through claims, renewals, and changing circumstances. Our advocacy continues when coverage is tested and support matters most. We work with you through the entire lifecycle of your coverage.',
  },
  {
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon'],
    response: 'Hello! Welcome to Strategi Builder. I\'m here to help you with any questions about our insurance brokerage services and how we handle complex placements. What can I help you with today?',
  },
  {
    keywords: ['thank', 'thanks'],
    response: 'You\'re very welcome! If you have any other questions about our insurance services or how we can help with complex placements, feel free to ask. Or reach out to us at marianne@strategibuilder.com for personalized assistance.',
  },
]

const getResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase()
  
  for (const faq of faqs) {
    if (faq.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return faq.response
    }
  }
  
  return 'Thank you for your message! I\'m here to help with questions about our insurance brokerage services, complex placements, our process, or scheduling a consultation. You can also email us directly at marianne@strategibuilder.com for personalized assistance.'
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Strategi Builder assistant. I can help answer questions about our insurance brokerage services, complex placements, and how we can support your unique insurance needs. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
    }, 800)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl hover:shadow-xl hover:scale-110 transition-all duration-300 overflow-hidden group border-2 border-white"
          aria-label="Open chat"
        >
          <Image
            src="/Founder.png"
            alt="Marianne - Chat Assistant"
            width={90}
            height={90}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
          />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            'fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] bg-gold-50 rounded-2xl shadow-2xl border-2 border-gold-200 flex flex-col overflow-hidden transition-all duration-300',
            isMinimized ? 'h-16' : 'h-[600px] max-h-[calc(100vh-3rem)]'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 bg-gradient-to-r from-navy-700 to-navy-900 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                <Image
                  src="/Founder.png"
                  alt="Marianne"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Strategi Builder</h3>
                <p className="text-xs text-white/80">Online now</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: '#F8FAFC' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex',
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm',
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-navy-700 to-navy-900 text-white rounded-br-sm'
                          : 'bg-gold-50 text-navy-900 rounded-bl-sm border border-gold-200'
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <span className={cn(
                        'text-xs mt-1 block',
                        message.sender === 'user' ? 'text-white/70' : 'text-navy-500'
                      )}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gold-200 bg-gold-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2.5 rounded-lg border border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 transition-colors text-sm"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="px-4 py-2.5 bg-gradient-to-r from-navy-700 to-navy-900 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
