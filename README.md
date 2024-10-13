## Overview
**Learn & Chuckle** is an innovative AI-powered platform designed to revolutionize tech education by combining humor with learning. Our mission is to make complex tech concepts more engaging and memorable, enhancing retention and understanding through entertaining content.

## Key Features
- **AI-Generated Content**: Create humorous educational lessons and witty memes on various tech topics, tailored to user preferences.
- **Text-to-Speech Synthesis**: Utilize ElevenLabs and Google Cloud TTS for high-quality audio output, making learning accessible and enjoyable.
- **Adaptive Learning Paths**: Personalized content recommendations based on user progress and performance.
- **User-Friendly Interface**: Intuitive design that allows users to easily select topics and consume content in audio format.

## Tech Stack
- **Application**: Next.js for providing the fullstack application runtime environment.
- **Database**: Supabase for managing user data and content storage.
- **AI Integration**:
 - OpenAI API for generating educational content infused with humor.
 - ElevenLabs API for primary text-to-speech synthesis.
 - Google Cloud Text-to-Speech as a fallback option.
- **Deployment**: Vercel for hosting the application.

## Getting Started
1. Clone the repository:
 ```bash
 git clone https://github.com/yourusername/learn-and-chuckle.git
 cd learn-and-chuckle
 ```
2. Install dependencies:
 ```bash
 npm install
 ```
3. Set up environment variables in a `.env.local` file:
 ```
 SUPABASE_URL=your_supabase_url
 SUPABASE_KEY=your_supabase_key
 OPENAI_API_KEY=your_openai_api_key
 ELEVENLABS_API_KEY=your_elevenlabs_api_key
 ```
4. Start the development server:
 ```bash
 npm run dev
 ```

Join us in making tech education a laughing matter—because learning should be as fun as it is informative!