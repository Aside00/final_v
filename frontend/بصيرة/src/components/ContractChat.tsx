import React, { useEffect, useState, useRef } from 'react';
import { SendIcon, Loader2Icon, BotIcon, UserIcon } from 'lucide-react';
import type { ChatMessage, AnalysisResult } from '../data/mockData';
import { contractChatSuggestions } from '../data/mockData';
import { askAboutContract } from '../services/api';
import { SuggestedQuestions } from './SuggestedQuestions';
interface ContractChatProps {
  fileId: string;
  analysisResult: AnalysisResult;
  initialMessages: ChatMessage[];
}
export function ContractChat({
  fileId,
  analysisResult,
  initialMessages
}: ContractChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
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
      const responseMsg = await askAboutContract(fileId, text, analysisResult);
      setMessages((prev) => [...prev, responseMsg]);
    } catch (error) {
      console.error('Failed to get response', error);
      // Handle error state if needed
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <BotIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">اسأل عن هذا العقد</h3>
          <p className="text-xs text-gray-500">
            مساعدك القانوني جاهز للإجابة بناءً على التحليل
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) =>
        <div
          key={msg.id}
          className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
          
            <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-gray-200' : 'bg-primary text-white'}`}>
            
              {msg.role === 'user' ?
            <UserIcon className="w-4 h-4 text-gray-600" /> :

            <BotIcon className="w-4 h-4" />
            }
            </div>
            <div
            className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-gray-100 text-gray-800 rounded-tr-sm' : 'bg-primary/5 border border-primary/10 text-gray-800 rounded-tl-sm whitespace-pre-wrap'}`}>
            
              {msg.content}
            </div>
          </div>
        )}
        {isLoading &&
        <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              <BotIcon className="w-4 h-4" />
            </div>
            <div className="bg-primary/5 border border-primary/10 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
              <Loader2Icon className="w-4 h-4 text-primary animate-spin" />
              <span className="text-sm text-gray-500">جاري التفكير...</span>
            </div>
          </div>
        }
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50/30 rounded-b-2xl">
        <SuggestedQuestions
          questions={contractChatSuggestions}
          onSelect={handleSend} />
        
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="اكتب سؤالك هنا..."
            className="w-full bg-white border border-gray-300 rounded-xl py-3 pr-4 pl-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow"
            disabled={isLoading} />
          
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary-light disabled:opacity-50 disabled:hover:bg-primary transition-colors">
            
            <SendIcon className="w-4 h-4 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </div>);

}