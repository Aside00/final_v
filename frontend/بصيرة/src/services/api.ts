import type { AnalysisResult, ChatMessage } from '../data/mockData';
import {
  mockAnalysisResult,
  mockContractChatResponses,
  mockGeneralChatResponses } from
'../data/mockData';

// Simulate network delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Upload a contract file to the server
 * TODO: Replace with actual API call
 */
export async function uploadContract(
file: File)
: Promise<{success: boolean;fileId: string;}> {
  console.log(
    '[API] uploadContract called with:',
    file.name,
    file.type,
    file.size
  );
  await delay(1000);

  // Mock response
  return {
    success: true,
    fileId: 'mock-file-' + Date.now()
  };
}

/**
 * Analyze an uploaded contract
 * TODO: Replace with actual API call
 */
export async function analyzeContract(fileId: string): Promise<AnalysisResult> {
  console.log('[API] analyzeContract called with fileId:', fileId);
  await delay(3000);

  // Mock response - return mock analysis result
  return { ...mockAnalysisResult };
}

/**
 * Ask a question about an uploaded contract
 * TODO: Replace with actual API call (RAG-based)
 */
export async function askAboutContract(
fileId: string,
question: string,
analysisResult: AnalysisResult)
: Promise<ChatMessage> {
  console.log('[API] askAboutContract called:', { fileId, question });
  await delay(1500);

  const response =
  mockContractChatResponses[question] || mockContractChatResponses['default'];

  return {
    id: 'msg-' + Date.now(),
    role: 'assistant',
    content: response,
    timestamp: new Date()
  };
}

/**
 * Ask a general question without uploading a contract
 * TODO: Replace with actual API call
 */
export async function askGeneralQuestion(
question: string)
: Promise<ChatMessage> {
  console.log('[API] askGeneralQuestion called:', question);
  await delay(1500);

  const response =
  mockGeneralChatResponses[question] || mockGeneralChatResponses['default'];

  return {
    id: 'msg-' + Date.now(),
    role: 'assistant',
    content: response,
    timestamp: new Date()
  };
}