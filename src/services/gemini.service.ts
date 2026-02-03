
import { Injectable } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';

export interface Product {
  slug: string;
  name: string;
  imageUrl: string;
  tagline: string;
  description: string;
  features: string[];
  eligibilityCriteria: string[];
  documentsRequired: string[];
  applicationProcess: string[];
}

export interface InvestorInfo {
  slug: string;
  name:string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateProductContent(productName: string): Promise<Omit<Product, 'slug' | 'name' | 'imageUrl'>> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate detailed content for a webpage about a "${productName}" product from "Eibil Nidhi Limited", a financial company in India. The tone should be professional, trustworthy, and appealing to potential members. Provide extensive detail for each field.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tagline: {
                type: Type.STRING,
                description: 'A short, catchy tagline for the product hero section.'
              },
              description: { 
                type: Type.STRING,
                description: 'A detailed, engaging description of the product (2-3 sentences).'
              },
              features: { 
                type: Type.ARRAY,
                description: 'A list of 4-5 key features of the product.',
                items: { type: Type.STRING }
              },
              eligibilityCriteria: {
                type: Type.ARRAY,
                description: 'A list of 3-4 eligibility criteria for applicants.',
                items: { type: Type.STRING }
              },
              documentsRequired: {
                type: Type.ARRAY,
                description: 'A list of 3-4 essential documents required for the application.',
                items: { type: Type.STRING }
              },
              applicationProcess: { 
                type: Type.ARRAY,
                description: 'A list of 3-4 simple steps on how a member can apply for this product.',
                items: { type: Type.STRING }
              }
            }
          }
        }
      });
      
      const jsonStr = response.text.trim();
      return JSON.parse(jsonStr);

    } catch (error) {
      console.error(`Error generating content for ${productName}:`, error);
      throw new Error('Failed to generate product content');
    }
  }

  async generateInvestorContent(topicName: string): Promise<Omit<InvestorInfo, 'slug' | 'name'>> {
    try {
        const response = await this.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate content for an investor relations webpage for "Eibil Nidhi Limited". The topic is "${topicName}". The content should be professional, clear, and informative, suitable for shareholders and potential investors. Use HTML tags like <p>, <ul>, <li>, and <strong> for formatting. If the topic is about reports or downloads, include placeholder table structures or links. The content should be comprehensive.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        content: {
                            type: Type.STRING,
                            description: 'The full HTML content for the page body.'
                        }
                    }
                }
            }
        });
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error(`Error generating content for ${topicName}:`, error);
        throw new Error('Failed to generate investor content');
    }
  }
  
  async generateFinancialTip(): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Generate a short, insightful financial tip suitable for a general audience in India. The tip should be a single, encouraging sentence.",
      });
      return response.text;
    } catch (error) {
       console.error('Error generating financial tip:', error);
       return 'Start saving a small amount regularly; consistency is the key to building wealth.';
    }
  }
}
