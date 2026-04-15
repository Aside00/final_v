import React, { useEffect, useState, useRef } from 'react';
import {
  SendIcon,
  Loader2Icon,
  BotIcon,
  UserIcon,
  ShieldCheckIcon } from
'lucide-react';
import type { ChatMessage } from '../data/mockData';
import {
  generalChatSuggestions,
  mockGeneralChatMessages } from
'../data/mockData';
import { askGeneralQuestion } from '../services/api';
import { SuggestedQuestions } from './SuggestedQuestions';
export function GeneralChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(
    mockGeneralChatMessages
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const responseMsg = await askGeneralQuestion(text);
      setMessages((prev) => [...prev, responseMsg]);
    } catch (error) {
      console.error('Failed to get response', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[700px]">
      <div className="p-6 border-b border-gray-100 bg-primary text-white rounded-t-2xl flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
          <ShieldCheckIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">المستشار القانوني الذكي</h2>
          <p className="text-primary-light text-sm mt-1">
            اسأل عن أي موضوع يخص عقود العمل، الإيجار، أو السرية في السعودية
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
        {messages.map((msg) =>
        <div
          key={msg.id}
          className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
          
            <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-white border border-gray-200' : 'bg-primary text-white'}`}>
            
              {msg.role === 'user' ?
            <UserIcon className="w-5 h-5 text-gray-600" /> :

            <BotIcon className="w-5 h-5" />
            }
            </div>
            <div
            className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-white border border-gray-100 text-gray-800 rounded-tr-sm' : 'bg-white border border-primary/10 text-gray-800 rounded-tl-sm whitespace-pre-wrap leading-relaxed'}`}>
            
              {msg.content}
            </div>
          </div>
        )}
        {isLoading &&
        <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
              <BotIcon className="w-5 h-5" />
            </div>
            <div className="bg-white border border-primary/10 p-4 rounded-2xl rounded-tl-sm flex items-center gap-3 shadow-sm">
              <Loader2Icon className="w-5 h-5 text-primary animate-spin" />
              <span className="text-sm font-medium text-gray-500">
                جاري البحث في المراجع القانونية...
              </span>
            </div>
          </div>
        }
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-gray-100 bg-white rounded-b-2xl">
        <SuggestedQuestions
          questions={generalChatSuggestions}
          onSelect={handleSend} />
        
        <div className="relative mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="اكتب سؤالك القانوني هنا..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pr-4 pl-14 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
            disabled={isLoading} />
          
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-lg hover:bg-primary-light disabled:opacity-50 disabled:hover:bg-primary transition-colors">
            
            <SendIcon className="w-5 h-5 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </div>);

}