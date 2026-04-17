import { auth } from '@clerk/nextjs/server';
import { SignUpButton, SignInButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  // Redirect signed-in users to dashboard
  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Master anything with{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  flashcards
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-lg mx-auto lg:mx-0">
                Create decks, study smarter, remember more
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <SignUpButton mode="modal">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </SignUpButton>
              
              <SignInButton mode="modal">
                <button className="px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-500 hover:text-white transition-all duration-200 transform hover:scale-105">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>

          {/* Right side - Animated Flashcard */}
          <div className="flex justify-center lg:justify-end">
            <div className="perspective-1000">
              <div className="flashcard-container group cursor-pointer">
                <div className="flashcard-inner relative w-80 h-48 transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front of card */}
                  <div className="flashcard-face absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-2xl flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-3xl font-bold text-white">Ciao</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">Front</div>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div className="flashcard-face absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-blue-800 to-purple-900 rounded-xl border border-blue-600 shadow-2xl flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-2xl font-bold text-white">Hello in Italian</div>
                      <div className="text-sm text-blue-300 uppercase tracking-wider">Back</div>
                    </div>
                  </div>
                </div>
                
                {/* Hover hint */}
                <div className="mt-4 text-center">
                  <p className="text-gray-500 text-sm">Hover to flip</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
