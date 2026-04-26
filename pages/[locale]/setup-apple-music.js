export const runtime = 'experimental-edge';

import { useEffect, useState } from 'react';

export async function getServerSideProps() {
  return { props: {} };
}

export default function AppleMusicSetup() {
  const [status, setStatus] = useState('idle'); // idle | loading | ready | authorized | error
  const [userToken, setUserToken] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load MusicKit JS
    const script = document.createElement('script');
    script.src = 'https://js-cdn.music.apple.com/musickit/v1/musickit.js';
    script.async = true;
    script.onload = () => setStatus('ready');
    script.onerror = () => setStatus('error');
    document.head.appendChild(script);
  }, []);

  async function authorize() {
    setStatus('loading');
    try {
      const res = await fetch('/api/music?path=developer-token');
      const { token } = await res.json();

      window.MusicKit.configure({
        developerToken: token,
        app: { name: '1998 MEDIA', build: '1.0' },
      });
      const music = window.MusicKit.getInstance();

      const ut = await music.authorize();
      setUserToken(ut);
      setStatus('authorized');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  function copy() {
    navigator.clipboard.writeText(userToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            Apple Music Setup
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Authorize once to get your user token. Valid for 6 months.
          </p>
        </div>

        {status === 'authorized' ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-green-600">
              Authorization successful!
            </p>
            <p className="text-xs text-gray-500">
              Copy the token below and set it as{' '}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                APPLE_MUSIC_USER_TOKEN
              </code>{' '}
              in your environment.
            </p>
            <div className="relative">
              <textarea
                readOnly
                value={userToken}
                rows={4}
                className="w-full text-xs font-mono bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg p-3 resize-none border border-gray-200 dark:border-gray-700"
              />
              <button
                onClick={copy}
                className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-black dark:bg-white text-white dark:text-black font-bold transition-opacity"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={authorize}
            disabled={
              status === 'loading' || status === 'error' || status === 'idle'
            }
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-sm disabled:opacity-40 transition-all"
          >
            {status === 'loading' ? (
              <>
                <i className="fa fa-circle-notch fa-spin" /> Authorizing…
              </>
            ) : status === 'error' ? (
              'Failed — check credentials'
            ) : status === 'idle' ? (
              'Loading MusicKit…'
            ) : (
              <>
                <i className="fab fa-apple" /> Authorize with Apple Music
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
