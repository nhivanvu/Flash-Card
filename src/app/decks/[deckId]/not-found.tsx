import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Background gradient orbs */}
      <div className="absolute w-70 h-70 rounded-full blur-3xl opacity-30 z-0" 
           style={{ backgroundColor: '#8b5cf6', top: '5%', right: '10%' }} />
      <div className="absolute w-90 h-90 rounded-full blur-3xl opacity-40 z-0" 
           style={{ backgroundColor: '#3b82f6', top: '30%', left: '5%' }} />
      <div className="absolute w-50 h-50 rounded-full blur-3xl opacity-50 z-0" 
           style={{ backgroundColor: '#6366f1', bottom: '20%', right: '15%' }} />

      <div className="relative z-10 text-center space-y-8 max-w-md mx-auto px-6">
        {/* 404 Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Deck Not Found
          </h1>
          <p className="text-gray-400">
            The deck you're looking for doesn't exist or you don't have permission to view it.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              Back to Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 font-semibold px-8 py-3"
            >
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}