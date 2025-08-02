import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_PROXY_URL = process.env.OPENAI_PROXY_URL

export async function POST(request: NextRequest) {
  try {
    // 检查必要的环境变量
    if (!OPENAI_API_KEY) {
      console.error('Missing OPENAI_API_KEY environment variable')
      return NextResponse.json(
        { error: 'AI service configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    if (!OPENAI_PROXY_URL) {
      console.error('Missing OPENAI_PROXY_URL environment variable')
      return NextResponse.json(
        { error: 'AI service configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const body = await request.json();
    const { 
      elfType, 
      gender, 
      nameCount, 
      nameStyle, 
      includeBackground,
      customRequirements 
    } = body;

    // 构建AI提示词
    let prompt = `Generate ${nameCount} authentic fantasy elf names`;
    
    if (elfType && elfType !== "any") {
      prompt += ` for ${elfType}`;
    }
    
    if (gender && gender !== "any") {
      prompt += ` (${gender})`;
    }
    
    prompt += `. The names should be ${nameStyle} and suitable for fantasy settings like D&D, Tolkien-style fantasy, or similar RPG games.`;

    if (includeBackground) {
      prompt += ` For each name, also provide a brief background story or characteristic that fits the elf's nature and type.`;
    }

    if (customRequirements) {
      prompt += ` Additional requirements: ${customRequirements}`;
    }

    prompt += `

Please format the response as a JSON array with objects containing:
- name: the elf name
- pronunciation: phonetic pronunciation guide
- meaning: meaning or etymology of the name
${includeBackground ? '- background: a brief background story or characteristic' : ''}
- elfType: the type of elf this name suits best

Example format:
[
  {
    "name": "Aelindra",
    "pronunciation": "AY-lin-dra", 
    "meaning": "Moonlight dancer",
    ${includeBackground ? '"background": "A graceful wood elf who dances under the moonlight, known for her connection to nature spirits",' : ''}
    "elfType": "Wood Elf"
  }
]`;

    // 调用OpenAI API (添加超时和重试机制)
    console.log(`Making request to: ${OPENAI_PROXY_URL}/chat/completions`);
    console.log(`Using model: gpt-4.1-mini`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45秒超时
    
    let response;
    try {
      response = await fetch(`${OPENAI_PROXY_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a fantasy name generator expert specializing in creating authentic, lore-friendly elf names for various fantasy settings. Generate names that sound elvish and fit the requested characteristics.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.8,
        }),
        signal: controller.signal
      });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      console.error('OpenAI API fetch error:', fetchError);
      
      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout. The AI service is taking too long to respond. Please try again.' },
          { status: 408 }
        );
      }
      
      return NextResponse.json(
        { error: 'Unable to connect to AI service. Please check your internet connection and try again.' },
        { status: 503 }
      );
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Elf name generation failed, please try again later' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { error: 'Invalid response format from OpenAI' },
        { status: 500 }
      );
    }

    const responseContent = data.choices[0].message.content;
    
    if (!responseContent) {
      throw new Error("No response from AI");
    }

    // 尝试解析JSON
    let parsedResponse;
    try {
      // 清理响应文本，移除可能的markdown标记
      const cleanResponse = responseContent.replace(/```json\n?|\n?```/g, '').trim();
      parsedResponse = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      // 如果解析失败，返回原始文本
      parsedResponse = {
        rawText: responseContent,
        error: "Failed to parse structured response"
      };
    }

    return NextResponse.json({
      success: true,
      data: parsedResponse,
      usage: data.usage
    });

  } catch (error) {
    console.error("Error generating elf names:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: "An unexpected error occurred" 
      },
      { status: 500 }
    );
  }
}